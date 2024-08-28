import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { USER_ROLE, UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
    {
        userName: {
            type: String,
            required: [true, 'User name is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: 0,
        },
        profileImage: {
            type: String,
            validate: {
                validator: function (url: string) {
                    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                    return urlRegex.test(url);
                },
                message: 'A valid image URL is required',
            },
        },
        bio: { type: String },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        passwordChangedAt: { type: Date, select: 0 },
        status: {
            type: String,
            enum: { values: UserStatus },
            default: 'in-progress',
        },
        role: {
            type: String,
            enum: { values: Object.values(USER_ROLE) },
            default: 'user',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Hash password while saving to database
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt),
    );
    next();
});

//  Set password "" while get user
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Check if the user exist in database
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password +passwordChangedAt');
};

//  Check Password is correct
userSchema.statics.isPasswordMatched = async function (
    passwordFromReq: string,
    passwordInDB: string,
) {
    return await bcrypt.compare(passwordFromReq, passwordInDB);
};

// Check if JWT Token issued before before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimeStamp;
};

// Create Model
export const User = model<TUser, UserModel>('User', userSchema);
