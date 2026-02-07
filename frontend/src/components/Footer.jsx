import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="bg-black text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white">MiddleKart</h3>
            <p className="mt-2 text-sm">
              Your trusted ecommerce partner.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1 text-sm">
              <li>Products</li>
              <li>Orders</li>
              <li>Cart</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Contact
            </h4>
            <p className="text-sm">support@middlekart.com</p>
            <p className="text-sm">+91 8085575767</p>
          </div>
        </div>

        <p className="text-center text-sm mt-8 text-gray-500">
          © {new Date().getFullYear()} MiddleKart. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
