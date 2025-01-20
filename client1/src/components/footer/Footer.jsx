import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLinks">
        <div className="footerLinkGroup">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div className="footerLinkGroup">
          <h3>Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footerLinkGroup">
          <h3>Follow Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="footerCopyright">
        <p>&copy; 2025 YourCompany. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
