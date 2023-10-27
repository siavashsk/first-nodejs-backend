const mongoose = require("mongoose");
const { MONGO_HOST, MONGO_DBNAME, MONGO_PORT } = process.env;

const startMongoDB = () => {
  try {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${MONGO_HOST}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
};

module.exports = startMongoDB;
