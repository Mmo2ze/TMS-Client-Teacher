import axios from 'axios';

// Next we make an 'instance' of it

const instance = axios.create({
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default instance;