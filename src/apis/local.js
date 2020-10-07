import axios from "axios";

const instance = axios.create({
  baseURL: "../local.json"
});

export default instance;
