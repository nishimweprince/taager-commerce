import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../inputs/Input';
import { useSearchProducts } from '@/core/application/products/product.hooks';

interface SearchProductsProps {
  placeholder?: string;
  className?: string;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ placeholder = 'Search products...', className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { productsList, searchProducts, productsIsFetching } = useSearchProducts();
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProducts(query);
    setShowDropdown(!!query);
  };

  const handleProductClick = (productId: number | string) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (searchQuery) setShowDropdown(true);
  };

  return (
    <section
      className={`hidden md:flex relative w-6/7 mx-4 ${className || ''}`}
      style={{ minWidth: 220, maxWidth: 420 }}
    >
      <form onSubmit={e => e.preventDefault()} className="w-full">
        <fieldset className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            className="w-full pr-10 text-sm py-2 h-10 rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </button>
        </fieldset>
      </form>
      {showDropdown && searchQuery && (
        <article
          ref={dropdownRef}
          className="absolute left-0 mt-[15px] top-8 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto"
        >
          {productsIsFetching ? (
            <figure className="flex justify-center py-4">
              <figure className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></figure>
            </figure>
          ) : productsList.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {productsList.slice(0, 8).map(product => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-primary/10 transition text-sm"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-6 w-6 object-contain rounded"
                  />
                  <section className="flex-1 min-w-0">
                    <h3 className="truncate font-medium text-sm text-gray-900">{product.title}</h3>
                    <p className="truncate text-xs text-gray-500">{product.category}</p>
                  </section>
                  <section className="flex flex-col items-end ml-2">
                    <span className="font-semibold text-xs text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400">★ {product.rating?.rate || 'N/A'}</span>
                  </section>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4 text-sm">
              No products found matching "{searchQuery}"
            </p>
          )}
        </article>
      )}
    </section>
  );
};

export default SearchProducts;
