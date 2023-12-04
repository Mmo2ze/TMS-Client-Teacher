import axios from 'axios';
import { cookies } from 'next/headers';

// Next we make an 'instance' of it

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default instance;