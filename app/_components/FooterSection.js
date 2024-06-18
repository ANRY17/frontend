import Link from 'next/link';
import Image from 'next/image';
import logoLight from '@/public/logoLight.png'; // Update with the correct path to your light logo
import logoDark from '@/public/logoDark.png'; // Update with the correct path to your dark logo

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 flex items-center">
            <Image
              src={logoLight} // Use logoDark if you have a dark mode footer
              width={100}
              objectFit="cover"
              placeholder="blur"
              quality={80}
              alt="logo"
            />
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:underline">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:underline">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold">Follow Us</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} | Jejak Wisata</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              GitHub
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
