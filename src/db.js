// const monk = require('monk');
// const db = monk(process.env.DATABASE_URL);
// db.then(() => {
//   console.log('Connected correctly to server')
// })
const mongoose = require('mongoose');
require('dotenv').config();
const connectionParams = {
	useNewUrlParser: true,
	//useCreateIndex: true,
	useUnifiedTopology: true
};

const connection = mongoose.connect(process.env.DATABASE_URL, connectionParams).then(()=>console.log('connected')).catch((error)=>console.log(error));

module.exports = connection;