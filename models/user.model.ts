import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface UserI extends Document {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
}

const userSchema = new Schema<UserI>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre<UserI>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  if (!this.password) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const Client = mongoose.models.User || mongoose.model("Client", userSchema);
export default Client;
