import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-400">
              10HEADSMARKETING is your trusted partner for digital growth. We help businesses
              transform their online presence and achieve their marketing goals.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link to="/work" className="text-gray-400 hover:text-white">
                  Work
                </Link>
              </li> */}
              <li>
                <Link to="/fractional-cmo" className="text-gray-400 hover:text-white">
                  Fractional CMO
                </Link>
              </li>
              <li>
                <Link to="/verticals" className="text-gray-400 hover:text-white">
                  Verticals
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Digital Marketing</li>
              <li className="text-gray-400">Content Strategy</li>
              <li className="text-gray-400">SEO Optimization</li>
              <li className="text-gray-400">Social Media Management</li>
              <li className="text-gray-400">Analytics & Reporting</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-medium">Email:</span>{' '}
                <a
                  href="mailto:contact@sitesync.com"
                  className="hover:text-white"
                >
                info.10heads@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="font-medium">Phone:</span>{' '}
                <a href="tel:+1234567890" className="hover:text-white">
                 +91 94423 84156
                </a>
              </li>
              <li className="text-gray-400">
                <span className="font-medium">Address:</span>
                <br />
               Thovalai
                <br />
                Kanyakumari District
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} 10HEADSMARKETING. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 