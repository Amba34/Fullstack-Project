import "./mailList.css";
import { useState } from "react";

const MailList = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true); // Update state to show the thank you message
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      {!isSubscribed ? (
        <div className="mailInputContainer">
          <input type="text" placeholder="Your Email" />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      ) : (
        <div className="thankYouMessage">
          <h2>Thank you for subscribing!</h2>
        </div>
      )}
    </div>
  );
};

export default MailList;
