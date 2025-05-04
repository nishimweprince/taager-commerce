import { Link } from 'react-router-dom';
import Button from '../inputs/Button';
import Input from '../inputs/Input';
import { useState } from 'react';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faMailBulk, faMap, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    // Add your newsletter subscription logic here
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <section>
            <h2 className="font-bold text-lg mb-4">ShopSmart</h2>
            <p className="text-muted-foreground text-[13px] mb-4">
              Quality products at competitive prices. Your one-stop shop for all
              your needs.
            </p>
            <address className="not-italic text-muted-foreground text-[13px]">
              <p className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faMap} size="lg" />
                <span>123 Commerce St, Market City</span>
              </p>
              <p className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faPhone} size="lg" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMailBulk} size="lg" />
                <span>support@shopsmart.com</span>
              </p>
            </address>
          </section>

          <nav className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Shop</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Account</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/account"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="text-muted-foreground text-[13px] hover:text-foreground transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
            </ul>
          </nav>

          <section>
            <h2 className="font-bold text-lg mb-4">Newsletter</h2>
            <p className="text-muted-foreground text-[13px] mb-4">
              Subscribe to our newsletter for updates on new products and
              special offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button className="w-full text-sm py-1">Subscribe</Button>
            </form>
          </section>
        </div>

        <footer className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-border/40 text-sm text-muted-foreground text-[13px]">
          <p>© {year} ShopSmart. All rights reserved.</p>

          <nav className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>

            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </Link>

            <button
              onClick={scrollToTop}
              className="p-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Scroll to top"
            >
              <FontAwesomeIcon
                icon={faChevronUp}
                className="text-muted-foreground cursor-pointer"
                size="lg"
              />
            </button>
          </nav>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
