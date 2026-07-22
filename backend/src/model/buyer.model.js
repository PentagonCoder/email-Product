import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BuyerSchema = new mongoose.Schema({
  buyerName: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  website : {
    type: String,
  },
  
}, { timestamps: true });

const Buyer = mongoose.model('Buyer', BuyerSchema);

export default Buyer;

