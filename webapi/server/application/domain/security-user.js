import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const model = mongoose.model('SecurityUser', schema);
export const SecurityUserSchema = model.schema;
export default model;