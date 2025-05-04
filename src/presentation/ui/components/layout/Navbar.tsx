import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import { useGetCartById } from '@/core/application/cart/cart.hooks';
import { useAppSelector } from '@/core/application/state/hooks';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';

const Navbar = () => {
  /**
   * STATE VARIABLES
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useAppSelector((state) => state.cart);

  /**
   * HANDLERS
   */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  /**
   * REACT HOOK FORM
   */
  const { control, handleSubmit } = useForm();

  /**
   * NAVIGATION
   */
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // GET CART COUNT
  const { getCartById } = useGetCartById();

  // FETCH CART COUNT
  useEffect(() => {
    if (!cart && localStorageAdapter.getItem('auth_token')) {
      getCartById(1);
    }
  }, [getCartById, cart]);

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <header className="sticky h-[9vh] top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <section className="container mx-auto px-4">
        <section className="flex h-16 items-center justify-between">
          <figure className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ShopSmart</span>
            </Link>
          </figure>

          {!['auth', 'dashboard'].some((path) => pathname.includes(path)) && (
            <search className="hidden md:flex relative w-4/7 mx-4">
              <form onSubmit={onSubmit} className="w-full">
                <fieldset className="relative">
                  <Controller
                    name="searchKey"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          placeholder="Search products..."
                          className="w-full pr-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      );
                    }}
                  />
                  <Link
                    to="#"
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  >
                    <Search size={18} />
                  </Link>
                </fieldset>
              </form>
            </search>
          )}

          <aside className="flex items-center space-x-4">
            <Link to="/dashboard/profile" aria-label="User account">
              <User size={20} />
            </Link>
            <Link
              to={`/cart?fromUrl=${pathname}`}
              aria-label="Shopping cart"
              className="relative"
            >
              <ShoppingCart size={20} />
              {cart && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-[10px]"
                >
                  {cart?.products?.length}
                </Badge>
              )}
            </Link>
            <Link
              to="#"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Link>
          </aside>
        </section>

        <search className="md:hidden pb-2">
          {!['auth', 'dashboard'].some((path) => !pathname.includes(path)) && (
            <form onSubmit={onSubmit} className="w-full">
              <fieldset className="relative">
                <Controller
                  name="searchKey"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="search"
                        placeholder="Search products..."
                        className="w-full pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    );
                  }}
                />
                <Link
                  to="#"
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  <Search size={18} />
                </Link>
              </fieldset>
            </form>
          )}
        </search>
      </section>

      <nav
        className={cn(
          'fixed w-full top-16 z-[5000] bg-white md:hidden',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <section className="container h-full px-4 py-6">
          <menu className="flex flex-col space-y-6">
            <li className="flex justify-between py-3 border-t border-border mt-4">
              <Link
                to="/account"
                className="flex items-center text-base font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard/profile');
                  setIsMenuOpen(false);
                }}
              >
                <User size={20} className="mr-3" />
                My Account
              </Link>
            </li>
            <li className="flex justify-between py-3 border-b border-border">
              <Link
                to={`/cart?fromUrl=${pathname}`}
                className="flex items-center text-base font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/cart?fromUrl=${pathname}`);
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingCart size={20} className="mr-3 text-foreground" />
                Cart
                {cart && (
                  <Badge variant="destructive" className="ml-2 -mt-1">
                    {cart?.products?.length}
                  </Badge>
                )}
              </Link>
            </li>
          </menu>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
