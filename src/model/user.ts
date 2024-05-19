import mongoose,{ Schema,Document}from "mongoose";


export interface Message extends Document{
    Content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    Content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: Boolean
    isAcceptingMessage: Boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true,
    },

    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/.+\@.+\..+/,'Please use a vali9d email address']
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code Expiry is required"],
    },
   isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
})

const UseModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UseModel
