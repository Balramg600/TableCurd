import mongoose from 'mongoose';
const columnSchema = new mongoose.Schema({
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  name: { type: String, required: true },
  dataType: { type: String, required: true },
  isNullable: { type: Boolean, required: true },
  defaultValue: { type: String },
}, { timestamps: true });

export default mongoose.model('Column', columnSchema);
