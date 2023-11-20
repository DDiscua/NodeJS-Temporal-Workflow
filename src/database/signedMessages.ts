import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISignedMessage extends Document {
    referenceId: string;
    signedMessage: string;
}

const signedMessageSchema: Schema = new mongoose.Schema({
    referenceId: { type: String, required: true },
    signedMessage: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


export const SignedMessageModel: Model<ISignedMessage> = mongoose.model<ISignedMessage>('SignedMessage', signedMessageSchema);
