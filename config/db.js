import { connect } from 'mongoose';
import { get } from 'keys';

let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { autoIndex: false});
mongoose.Promise = global.Promise;
let client = mongoose.connection;
client.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default client;