import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import buyer from "../model/Buyer.model.js";
import { scrapeWebsite } from "../services/scraper.service.js";
import { searchBuyers } from "../services/search.service.js";

const getScrapedData = asyncHandler( async (req, res, ) => {
  const { keyword } = req.params;

  const url = "https://ampuesto.in/private-limited-company/";

  const scrapedData = await scrapeWebsite(url);

  res
  .status(200)
  .json(
    new ApiResponse(200, scrapedData, "Scraped data retrieved successfully")
  );
  }
)

const searchController = async (req, res) => {
  const { keyword } = req.body;

  const buyers = await searchBuyers(keyword);

  for (const buyer of buyers) {
    const emails = await scrapeWebsite(buyer.website);
    
    for (const email of emails) {
      await saveBuyer({
        buyer: "",
        company: buyer.title,
        email,
        website: buyer.website,
        country: ""
      });
    }
    
  }
  res.json(buyers);
};

export { getScrapedData, searchController };