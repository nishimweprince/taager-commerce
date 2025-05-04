import { Route, Routes } from 'react-router-dom';
import Home from '../ui/pages/home/Home';
import ProductsList from '../ui/pages/product/ProductsList';
import NotFound from '../ui/pages/non-functional/NotFound';
import ProductDetails from '../ui/pages/product/ProductDetails';
import AuthenticatedRoutes from '../outlets/AuthenticatedRoutes';
import Login from '../ui/pages/auth/Login';
import Signup from '../ui/pages/auth/Signup';
import ManageProducts from '../ui/pages/dashboard/ManageProducts';
import ManageCarts from '../ui/pages/dashboard/ManageCarts';
import CartDetails from '../ui/pages/cart/CartDetails';
import ManageUsers from '../ui/pages/dashboard/ManageUsers';
import UserDetails from '../ui/pages/user/UserDetails';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/**
       * PRODUCTS ROUTES
       */}
      <Route path="/products">
        <Route path="" element={<ProductsList />} />
        <Route path=":id" element={<ProductDetails />} />
      </Route>

      {/**
       * AUTH ROUTES
       */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Route>

      {/**
       * AUTHENTICATED ROUTES
       */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/dashboard">
          <Route path="profile" element={<UserDetails />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="carts">
            <Route path="" element={<ManageCarts />} />
            <Route path=":id" element={<CartDetails />} />
          </Route>
          <Route path="users">
            <Route path="" element={<ManageUsers />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>
        </Route>

        {/**
         * CART ROUTES
         */}
        <Route path="/cart">
          <Route path="" element={<CartDetails />} />
        </Route>
      </Route>

      {/**
       * NOT FOUND ROUTE
       */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
