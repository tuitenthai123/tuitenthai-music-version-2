import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-stone-200/65 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Tuitenthaimp3</h2>
            <p className="text-sm">Chill time with the best music.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-md font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-sky-500">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-sky-500">Playlists</a></li>
              <li className="mb-2"><a href="#" className="hover:text-sky-500">Top 100</a></li>
              <li className="mb-2"><a href="#" className="hover:text-sky-500">About Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-md font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-2">Email: info@tuitenthaimp3.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-md font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-sky-500"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-sky-500"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-sky-500"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-sky-500"><FaYoutube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 Tuitenthaimp3. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer