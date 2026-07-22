import axios from "axios";

export const searchBuyers = async (keyword) => {
  const response = await axios.get("https://serpapi.com/search", {
    params: {
      q: keyword,
      api_key: process.env.SERP_API_KEY,
      engine: "google",
      num: 10,
    },
  });

  const results = response.data.organic_results || [];

  return results.map((result) => ({
    title: result.title,
    website: result.link,
  }));
};