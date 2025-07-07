import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  validityMinutes: { type: Number }, 
});

urlSchema.virtual('isExpired').get(function () {
  if (!this.validityMinutes) return false;
  const expiresAt = new Date(this.createdAt.getTime() + this.validityMinutes * 60000);
  return Date.now() > expiresAt;
});

export default mongoose.model('Url', urlSchema);
