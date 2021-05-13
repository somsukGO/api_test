const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://root:12345@samplecluster.434sg.mongodb.net/sample_database?retryWrites=true&w=majority';

function dbConnect() {
  mongoose
    .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;
