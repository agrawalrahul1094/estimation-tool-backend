const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);

// export interface IUser extends mongoose.Document {
//     _id: string;
//     user: string;
//     responses: string;
//     analytics: string;
//     startDate: string;
//     endDate: string;
// }

// export const UserSchema: mongoose.Schema = new mongoose.Schema({
//  user: { type: String , required: true },
// });

// export const UserModel = mongoose.model<IUser>("User", UserSchema);