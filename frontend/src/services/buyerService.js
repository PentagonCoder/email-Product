import api from "../api/axios";

export const keywordSearch = (data) => {
  return api.post("/api/buyers/search", data);
}

export const sendEmail = (formData) => {
  return api.post("/api/buyers/emails", formData,
        { headers: { "Content-Type": "multipart/form-data" }});
}