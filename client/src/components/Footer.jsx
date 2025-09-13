import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border-t-8 border-red-800 bg-gray-50 dark:bg-gray-900 mt-8">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo + Tagline */}
          <div>
            <Link to="/" className="flex flex-col items-start">
              <img
                src="https://i.postimg.cc/G2wn9kKH/dark.png"
                alt="Trinetra Post Logo"
                className="h-14 w-auto object-contain"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your trusted source for latest news.
              </p>
            </Link>
          </div>

          {/* About */}
          <div>
            <h3 className="uppercase text-sm font-bold tracking-wider mb-3 text-gray-700 dark:text-gray-200">
              About
            </h3>
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="hover:text-red-800">
                Latest News
              </Footer.Link>
              <Footer.Link href="/about" className="hover:text-red-800">
                TriNetra Post
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="uppercase text-sm font-bold tracking-wider mb-3 text-gray-700 dark:text-gray-200">
              Follow Us
            </h3>
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="hover:text-red-800">
                Github
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-red-800">
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Legal */}
          <div>
            <h3 className="uppercase text-sm font-bold tracking-wider mb-3 text-gray-700 dark:text-gray-200">
              Legal
            </h3>
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="hover:text-red-800">
                Privacy Policy
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-red-800">
                Terms &amp; Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        <Footer.Divider className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Footer.Copyright
            href="#"
            by="TriNetra Post"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-4">
            {[BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-800 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </Footer>
  );
}
