import Buyer from "../models/buyer.model.js";

export const saveBuyer = async (buyerData) => {

  const existingBuyer = await Buyer.findOne({
    email: buyerData.email
  });

  if (existingBuyer) {
    return existingBuyer;
  }

  return await Buyer.create(buyerData);
};