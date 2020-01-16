import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    synopsis: { type: String, required: true },
    seasons: { type: Number, required: true },
}, { timestamps: true });

schema.plugin(mongoosePaginate);
const model = mongoose.model('Serie', schema);
export const SerieSchema = model.schema;
export default model;