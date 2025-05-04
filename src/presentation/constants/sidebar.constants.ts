import { 
  faShoppingBag, 
  faShoppingCart, 
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavigationItem {
  title: string;
  path: string;
  icon: IconDefinition;
  subcategories?: NavigationItem[];
}

export const DASHBOARD_ROUTES = {
  PRODUCTS: '/dashboard/products',
  CART: '/dashboard/carts',
  ORDERS: '/dashboard/orders',
  PROFILE: '/dashboard/profile',
  USERS: '/dashboard/users',
};

export const SIDEBAR_NAV_ITEMS: NavigationItem[] = [
  {
    title: 'Products',
    path: DASHBOARD_ROUTES.PRODUCTS,
    icon: faShoppingBag,
  },
  {
    title: 'Carts',
    path: DASHBOARD_ROUTES.CART,
    icon: faShoppingCart,
  },
  {
    title: 'Users',
    path: DASHBOARD_ROUTES.USERS,
    icon: faUserGroup,
  },
  {
    title: 'Profile',
    path: DASHBOARD_ROUTES.PROFILE,
    icon: faUser,
  },
];
