import {Route, Routes} from 'react-router-dom';
import { Home } from '../pages/Home';
import { MainLayout } from '../layouts/MainLayout';
import { Cart } from '../pages/Cart';
import { Products } from '../pages/Products';
import { NotFound } from '../pages/NotFound';
import { Profile } from '../pages/Profile';
import { ProductDetails } from '../pages/ProductDetails';
export const AppRoutes = () => {
  return (
    <Routes>

        <Route element={<MainLayout />}>

            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile/>} />


        </Route>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}
