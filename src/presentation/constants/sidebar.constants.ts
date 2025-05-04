import { 
  faChartLine, 
  faShoppingBag, 
  faShoppingCart 
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines, faUser } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavigationItem {
  title: string;
  path: string;
  icon: IconDefinition;
  subcategories?: NavigationItem[];
}

export const DASHBOARD_ROUTES = {
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  CART: '/dashboard/carts',
  ORDERS: '/dashboard/orders',
  PROFILE: '/dashboard/profile',
};

export const SIDEBAR_NAV_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: DASHBOARD_ROUTES.DASHBOARD,
    icon: faChartLine,
  },
  {
    title: 'Products',
    path: DASHBOARD_ROUTES.PRODUCTS,
    icon: faShoppingBag,
  },
  {
    title: 'Cart',
    path: DASHBOARD_ROUTES.CART,
    icon: faShoppingCart,
  },
  {
    title: 'My Orders',
    path: DASHBOARD_ROUTES.ORDERS,
    icon: faFileLines,
  },
  {
    title: 'Profile',
    path: DASHBOARD_ROUTES.PROFILE,
    icon: faUser,
  },
];
