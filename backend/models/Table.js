import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);
