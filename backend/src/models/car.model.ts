import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  status: { type: String, required: true }
});

const Car = mongoose.model('Car', CarSchema);

export default Car;
