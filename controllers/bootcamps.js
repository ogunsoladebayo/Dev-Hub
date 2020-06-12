exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: 'The bootcamps were fetched...' });
};

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `The bootcamp with id ${req.params.id} was fetched...`,
  });
};
