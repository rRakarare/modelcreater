import axios from "axios";

export default axios.create({
  baseURL: "https://autocomplete.clearbit.com/v1/companies/",
  headers: {
    "Content-Type": "application/json",
  },
});
