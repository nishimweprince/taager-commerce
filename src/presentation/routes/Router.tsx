import { Route, Routes } from 'react-router-dom';
import Home from '../ui/pages/home/Home';
import ProductsList from '../ui/pages/product/ProductsList';
import NotFound from '../ui/pages/non-functional/NotFound';
import ProductDetails from '../ui/pages/product/ProductDetails';
import UserProfile from '../ui/pages/user/UserProfile';
import AuthenticatedRoutes from '../outlets/AuthenticatedRoutes';
import Login from '../ui/pages/auth/Login';
import Signup from '../ui/pages/auth/Signup';

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
        <Route path="/account" element={<UserProfile />} />
      </Route>

      {/**
       * NOT FOUND ROUTE
       */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router;
