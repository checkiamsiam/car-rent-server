import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

export const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (email: string): Promise<IUser | null> {
  return await User.findOne({ email }, { id: 1, password: 1, email: 1 });
};

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
