import mongoose from 'mongoose';
import toJSON from './plugins/index';

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    expires: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

tokenSchema.plugin(toJSON);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
