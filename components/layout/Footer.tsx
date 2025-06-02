const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Business Pa Campus</span>
        <p>
          Connecting campus entrepreneurs and buyers.<br />
          A marketplace for students to buy and sell goods within the school community.
        </p>
      </div>
      <div>
        <span className="footer-title">Quick Links</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Terms of service</a>
      </div>
      <div>
        <span className="footer-title">Contact</span>
        <p>Email: contact@businesspacampus.edu</p>
        <p>Phone: (123) 456-7890</p>
        <p>Campus Address: Student Center, Room 205</p>
      </div>
    </footer>
  );
};

export default Footer;