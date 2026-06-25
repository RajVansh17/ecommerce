import {Route, Routes} from 'react-router-dom';
import { Home } from '../pages/Home';
import { MainLayout } from '../layouts/MainLayout';
import { Cart } from '../pages/Cart';
import { Products } from '../pages/Products';
import { NotFound } from '../pages/NotFound';
import { Profile } from '../pages/Profile';
import { ProductDetails } from '../pages/ProductDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>

        <Route element={<MainLayout />}>

            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            } />


        </Route>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}
