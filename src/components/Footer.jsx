import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import MyLogo from "../assets/MyLogo.png"; // Adjust the path as necessary
const Footer = () => {
  return (
    <footer className="bg-white text-black">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info - Column 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo placeholder - replace with actual logo */}
             <img
          src={MyLogo}
          alt="horse"
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
              <span className="font-bold text-xl">Speed Fitness</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Transform your body and mind with our comprehensive fitness programs. 
              Join thousands who've achieved their fitness goals with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Column 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-red-600 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Our Coaches</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Membership Plans</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Classes & Programs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support - Column 3 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-red-600 pb-2 inline-block">
              Support
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors">Contact Support</a></li>
          
            
            </ul>
          </div>

          {/* Contact Info - Column 4 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-red-600 pb-2 inline-block">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div className="text-gray-600">
                  <p>Gurjudhara petrol pump</p>
                  <p>Kathmandu, Nepal 44600</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+9779810119909" className="text-gray-600 hover:text-black transition-colors">
                  +977 9910119909
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:info@speedfitness.com" className="text-gray-600 hover:text-black transition-colors">
                  info@speedfitness.com
                </a>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:border-red-500 text-sm"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Refund Policy</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Accessibility</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600 flex items-center space-x-1">
              <span>&copy; 2025 Speed Fitness. All rights reserved.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Nepal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;