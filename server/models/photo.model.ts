import * as mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    created: {
      type: Date,
      default: Date.now
    }
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
