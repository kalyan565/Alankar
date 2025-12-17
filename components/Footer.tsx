import Link from 'next/link'
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Alankar Cosmetics</h3>
            <p className="text-gray-400">
              Your trusted source for professional salon supplies and beauty products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Address</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Opposite Liberty Theater,<br />
              Beside Mahalakshmi Temple,<br />
              Besta vari Veedhi,<br />
              Station Road,<br />
              Guntur
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Alankar Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

