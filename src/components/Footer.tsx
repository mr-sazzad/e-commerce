// components/Footer.tsx

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-800 py-12 border-t border-gray-300 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">E-Commerce</h2>
        <div className="flex space-x-4 mb-8">
          <Link
            href="/"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/watches"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Watches
          </Link>
          <Link
            href="/wishlist"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Wishlists
          </Link>
          <Link
            href="orders"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Orders
          </Link>
        </div>
        <div className="flex space-x-4 mb-4">
          <Link
            href="https://web.facebook.com/profile.php?id=100077653895732&sk"
            target="blank"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Facebook
          </Link>
          <Link
            href="https://github.com/mr-sazzad"
            target="blank"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Github
          </Link>
          <Link
            href="https://discord.com/users/996832235296657510"
            target="blank"
            className="text-gray-600 font-semibold hover:text-black hover:font-bold overflow-hidden transition duration-300"
          >
            Discord
          </Link>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} E-Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
