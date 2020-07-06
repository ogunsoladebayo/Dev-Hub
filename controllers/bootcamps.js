const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  query = Bootcamp.find(JSON.parse(queryStr));
  const bootcamps = await query;
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    message: bootcamps,
  });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(201).json({
    success: true,
    message: bootcamp,
  });
  if (!bootcamp) {
    return next(
      new errorResponse(
        `Bootcamp with the id of ${req.params.id} not found`,
        404
      )
    );
  }
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    message: `New bootcamp created successfully...`,
    bootcamp,
  });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new errorResponse(
        `Bootcamp with the id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    message: `Bootcamp updated successfully...`,
    bootcamp,
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  await Bootcamp.deleteOne(req.params.id);
  res.status(201).json({
    success: true,
    message: `Bootcamp deleted successfully...`,
  });
});

exports.getBootcampsWithin = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat and long from geocoder with zipcode
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calculate radius using radians
  // Divide distance by radius of earth
  // Radius of earth = 6,378 km or 3963 miles

  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
