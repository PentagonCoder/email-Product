// import axios from "axios";
// import * as cheerio from "cheerio";
// export const scrapeWebsite = async (url) => {
//   const response = await axios.get(url);
//   const $ = cheerio.load(response.data);
//   const text = $.text();
//   const html = response.data;

// const emails = html.match(
//     /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
// );

// console.log(emails);
//   // console.log(text);
// }


import axios from "axios";

export const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });

    // Regex to find emails in the HTML
    // const emails = data.match(
    //   /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
    // ) || [];
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
