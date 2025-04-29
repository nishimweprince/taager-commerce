import { Route, Routes } from 'react-router-dom';
import Home from '../ui/pages/Home';
import ProductsList from '../ui/pages/ProductsList';
import NotFound from '../ui/pages/NotFound';
import ProductDetails from '../ui/pages/ProductDetails';

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
