
import {  toast } from "react-toastify";

export function sendToast(msg, status) {
    toast[status](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  export  function loadingToast() {
    const id = toast.loading("الرجاء الانتظار", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return id;
  }

  export function endLodingToast(id, msg, status) {
    toast.update(id, {
      render: msg,
      type: status,
      isLoading: false,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      rtl: false,
      progress: 0,
      theme: "dark",
    });
  }
