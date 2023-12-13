import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import { hash, verify } from 'argon2';
import toJSON from './plugins/index';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
  },
  {
    timestamps: true
  }
);

userSchema.plugin(toJSON);

userSchema.index({ name: 1, email: 1 }, { unique: true });

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return await verify(this.password, password);
};

userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();

  const salt = crypto.randomBytes(32);
  this.password = await hash(this.password, { salt });

  this.passwordConfirmation = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
