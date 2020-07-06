const mongoose = require('mongoose');

const dbconn = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected ${connect.connection.host}`.cyan.underline.bold);
};

module.exports = dbconn;
