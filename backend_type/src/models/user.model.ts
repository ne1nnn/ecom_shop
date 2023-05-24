import { Schema, model } from "mongoose";

export interface IUserBase {
  _id?: string;
  email: string;
  name: string;
}

export interface IUser extends IUserBase, Document {
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IUser>("Users", userSchema);
