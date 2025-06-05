import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminCoupons from "./admin/AdminCoupons";
import AdminOrders from "./admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success/:orderId" element={<Success />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />

        {/* 巢狀路由：/admin 作為父路由 */}
        <Route path="/admin" element={<Dashboard />}>
          {/* 子路由會渲染在 Dashboard 的 <Outlet /> 中 */}
          <Route path="products" element={<AdminProducts />} />
          {/* 可以添加其他子路由 */}
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
