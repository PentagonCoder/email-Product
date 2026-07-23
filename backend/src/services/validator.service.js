import validator from "validator";

export const validateEmails = (emails) => {
  return emails.filter(email => validator.isEmail(email));
};