import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//pages
import Home from './pages/home/Home'
import Nopage from './pages/nopage/Nopage'
import ProductInfo from './pages/productinfo/ProductInfo'
import ScrollTop from './componets/scrollTop/ScrollTop'
import CartProduct from './pages/cartoroduct/CartProduct'
import AllProduct from './pages/allproduct/AllProduct'
import Signup from './pages/ragistration/Signup'
import Login from './pages/ragistration/Login'
import UserDashbord from './pages/user/UserDashbord'
import AdminDashbord from './pages/admin/AdminDashbord'
import AddProduct from './pages/admin/AddProduct'
import UpdetProduct from './pages/admin/UpdetProduct'
import MyState from './contex/myState'
import { Toaster } from 'react-hot-toast'
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser'
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin'
import CategoryPage from './pages/category/CategoryPage'

function App() {
  return (
    <MyState>
      <BrowserRouter>
      <ScrollTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/*' element={<Nopage/>}/> */}
        <Route path='/productinfo/:id' element={<ProductInfo/>}/>
        <Route path='/cartProduct' element={<CartProduct/>}/>
        <Route path='/allProduct' element={<AllProduct/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/category/:categoryname' element={<CategoryPage/>}/>
        <Route path='/user-Dashbord' element={
          <ProtectedRouteForUser>
            <UserDashbord/>
          </ProtectedRouteForUser>
        }/>
        <Route path='/admin-Dashbord' element={
          <ProtectedRouteForAdmin>
            <AdminDashbord/>
          </ProtectedRouteForAdmin>
        }/>  
        <Route path='/addproduct' element={
          <ProtectedRouteForAdmin>
            <AddProduct/>
          </ProtectedRouteForAdmin>
        }/>  
        <Route path='/updetproduct/:id' element={
          <ProtectedRouteForAdmin>
            <UpdetProduct/>
          </ProtectedRouteForAdmin>
        }/> 
        
      </Routes>
      <Toaster/> 
      </BrowserRouter>
    </MyState>
  )
}

export default App