import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-base-content py-10 px-6 shadow-inner shadow-neutral-300s">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-y-8 gap-x-10">
        {/* Column 1 */}
        <div className="flex flex-col">
          <h3 className="footer-title text-white">Library System</h3>
          <a className="link link-hover text-gray-300" href="/books">
            All Books
          </a>
          <a className="link link-hover text-gray-300" href="/create-book">
            Add Book
          </a>
          <a className="link link-hover text-gray-300" href="/borrow-summary">
            Borrow Summary
          </a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col">
          <h3 className="footer-title text-white">Resources</h3>
          <a className="link link-hover text-gray-300">About</a>
          <a className="link link-hover text-gray-300">Privacy Policy</a>
          <a className="link link-hover text-gray-300">Terms of Service</a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col">
          <h3 className="footer-title text-white">Follow Us</h3>
          <div className="grid grid-flow-col gap-4 mt-2 text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
