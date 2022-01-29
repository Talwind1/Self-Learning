import axios from "axios";

let url;
if (process.env.NODE_ENV === "development") {
  console.log("im here");
  url = "http://localhost:5000/api";
}

if (process.env.NODE_ENV === "production") {
  //herokuuu!
  console.log("im here too");
  console.log(process.env.PORT);
  url = "api";
}

const api = axios.create({
  baseURL: url,
});
export default api;
