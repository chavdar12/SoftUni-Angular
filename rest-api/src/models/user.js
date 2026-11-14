import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { config } from '../config.js';

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    tel: { type: String },
    email: { type: String, required: true, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, 'Username should be at least 5 characters'],
      match: [/^[A-Za-z0-9]+$/, 'Username should consist only of English letters and digits'],
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Password should be at least 5 characters'],
      match: [/^[A-Za-z0-9]+$/, 'Password should consist only of English letters and digits'],
    },
    themes: [{ type: ObjectId, ref: 'Theme' }],
    posts: [{ type: ObjectId, ref: 'Post' }],
  },
  { timestamps: { createdAt: 'created_at' } },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model('User', userSchema);
