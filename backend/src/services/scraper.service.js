import axios from "axios";

export const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });

    const emails = (
      data.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []
    ).filter(email => {
      return !(
        email.endsWith(".jpg") ||
        email.endsWith(".jpeg") ||
        email.endsWith(".png") ||
        email.endsWith(".svg") ||
        email.endsWith(".gif") ||
        email.endsWith(".webp")
      );
    });
    // Remove duplicates
    const uniqueEmails = [...new Set(
      emails.map(email => email.toLowerCase())
    )];
    
    return uniqueEmails;

  } catch (error) {
    console.error("Scraping failed:", error.message);
    return [];
  }
};
