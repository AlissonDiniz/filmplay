import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    synopsis: { type: String, required: true },
    minutes: { type: Number, required: true },
}, { timestamps: true });

schema.plugin(mongoosePaginate);
const model = mongoose.model('Movie', schema);
export const MovieSchema = model.schema;
export default model;