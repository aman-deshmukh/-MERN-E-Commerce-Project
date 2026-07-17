import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <img
            src={assets.logo}
            className='mb-5 w-32'
            alt="Logo"
          />

          <p className='w-full md:w-2/3 text-gray-600'>
            Forever is your one-stop destination for premium fashion and lifestyle
            products. We strive to provide the best shopping experience with
            quality products and excellent customer service.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9876543210</li>
            <li>contact@forever.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />

        <p className='py-5 text-sm text-center'>
          Copyright © 2026 forever.com - All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;