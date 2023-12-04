import axios from 'axios';
import { cookies } from 'next/headers';
const token = cookies().get("token")?.value;
// Next we make an 'instance' of it

// console.log("ToKEN"+token)
const instance = axios.create({
  baseURL: "https://zagazig.store/",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
});

export default instance;