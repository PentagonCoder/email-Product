import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { scrapeWebsite } from "../services/scraper.service.js";
import { searchBuyers } from "../services/search.service.js";
import { saveBuyer } from "../services/buyer.service.js";
import { validateEmails } from "../services/validator.service.js";
import { sendEmail } from '../utils/sendEmail.js';
import Buyer from "../model/buyer.model.js";

const searchController = async (req, res) => {
  const { keyword } = req.body;
  let savedBuyers = [];
  const buyers = await searchBuyers(keyword);

  for (const buyer of buyers) {

    if (!buyer.website) {
      continue; // Skip if no website is found
    }

    const emails = await scrapeWebsite(buyer.website);

    const validEmails = validateEmails(emails);
    
    for (const email of validEmails) {
      savedBuyers.push(await saveBuyer({
        buyer: "",
        company: buyer.title,
        email : email,
        website: buyer.website,
        country: ""
      }));
    }
    
  }
  res
  .status(200)
  .json(new ApiResponse(200, savedBuyers , "Buyers retrieved successfully"));
};

const getBuyersEmails = asyncHandler(async (req, res) => {
  const buyers = await Buyer.find(); // Fetch all buyers

  for (const buyer of buyers) {
    await sendEmail({
      to: buyer.email,
      subject: "Singing Bowls Catalogue",
      text: "Hello,\n\nPlease find our catalogue attached.",
      attachments: [
        {
          filename: "catalogue.pdf",
          // path: "./assets/presentation.pdf"
        }
      ]
    });
  }
  res.status(200).json(new ApiResponse(200, buyers, "Buyers' emails retrieved successfully"));
})
export { searchController, getBuyersEmails };