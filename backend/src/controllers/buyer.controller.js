import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { scrapeWebsite } from "../services/scraper.service.js";
import { searchBuyers } from "../services/search.service.js";

const searchController = async (req, res) => {
  const { keyword } = req.body;

  const buyers = await searchBuyers(keyword);

  for (const buyer of buyers) {
    const emails = await scrapeWebsite(buyer.website);
    
    for (const email of emails) {
      await saveBuyer({
        buyer: "",
        company: buyer.title,
        email : email,
        website: buyer.website,
        country: ""
      });
    }
    
  }
  res
  .status(200)
  .json(new ApiResponse(200, buyers, "Buyers retrieved successfully"));
};

export { searchController };