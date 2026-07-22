import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });

// this middleware will run before saving user to the database it will hash the password before saving it to the database
// UserSchema.pre("save", async function(){
//   if(!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10)
// })

// // this method compare password entered by user with hashed password stored in database
// UserSchema.methods.isPassawordcorrect = async function(Password){
//   return await bcrypt.compare(Password, this.password);
// }
// this method will generate access token and refresh token for the user
UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCEES_TOKEN_EXPIRES,
    }
  )
}

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    }
  )
}



const User = mongoose.model('User', UserSchema);

export default User;