import React from "react";

function OrderButton({reorderClick, btnText, ...props}){
  return (
    <button onClick={reorderClick}> 
      {btnText}
    </button>
  )
}

export default OrderButton