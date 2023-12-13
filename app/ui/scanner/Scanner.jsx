"use client"
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner({ success, scanner }) {

  window.addEventListener("blur",
    () => {
      try {
        var x = document.getElementById('html5-qrcode-button-camera-stop');
        if (x){
          x.click();
        }      }
      catch (e) {
        console.log("blure")
        window.location.reload();
            }
    }
  )

  window.addEventListener("focus",
    () => {
      try {
        
        var x = document.getElementById('html5-qrcode-button-camera-start');
        if (x){
          x.click();
        }
      }
      catch (e) {
        console.log("focus")
        window.location.reload();      }
    }
  )
  useEffect(() => {
    scanner.current = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: window.innerWidth / 1.5,
        height: window.innerWidth / 1.5,
      },
      fps: 20,
    });
    scanner.current.render(success);

    return () => {
      scanner.current.clear();
    };
  }, []); // إزالة الاعتمادات من الـ useEffect


  return (
    <div id="reader"></div>
  )
    ;
}

export default Scanner;