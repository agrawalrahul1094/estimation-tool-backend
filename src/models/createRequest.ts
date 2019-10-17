import * as mongoose from 'mongoose'

const createRequestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    projectID: {
        type: String
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('CreateRequest', createRequestSchema);

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