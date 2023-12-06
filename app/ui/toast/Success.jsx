import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Success = () => {
return (
<div>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
</div>
)
}

export default Success