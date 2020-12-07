import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ThankYou(props) {
  useEffect(() => {
    localStorage.removeItem('cart');
    return () => {
    };
  }, []);
  return (
    <div className="tyPage" style={{ backgroundImage: `url('ty.jpg')` }}>
      <div className="inner">
        <h1>Thank you for your order !</h1>
        <h3>You will be called by the delivery person when it arrives</h3>
        <h5>Estimated time : 35 minutes</h5>
        <Link to="/menu">Back to the menu</Link>
      </div>
    </div>
  );
}

export default ThankYou;
