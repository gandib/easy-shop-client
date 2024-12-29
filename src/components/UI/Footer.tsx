"use client";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        {/* <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://facebook.com/gandib-gyanangkur"
            target="_blank"
            rel="noopener noreferrer"
          >
            Products
          </a>
          <a
            href="https://x.com/gandibroy11"
            target="_blank"
            rel="noopener noreferrer"
          >
            Viewed Products
          </a>
          <a
            href="https://www.linkedin.com/in/gandib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cart
          </a>
          <a
            href="https://github.com/gandib"
            target="_blank"
            rel="noopener noreferrer"
          >
            
          </a>
        </div> */}
        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/all-products" className="hover:text-gray-400">
            Products
          </a>
          <a href="/viewed-products" className="hover:text-gray-400">
            Viewed Products
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
