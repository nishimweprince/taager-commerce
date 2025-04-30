import { Route, Routes } from 'react-router-dom';
import Home from '../ui/pages/home/Home';
import ProductsList from '../ui/pages/product/ProductsList';
import NotFound from '../ui/pages/non-functional/NotFound';
import ProductDetails from '../ui/pages/product/ProductDetails';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router;
