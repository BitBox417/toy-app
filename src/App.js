import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 根路徑重定向到登入頁面 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 巢狀路由：/admin 作為父路由 */}
        <Route path="/admin" element={<Dashboard />}>
          {/* 子路由會渲染在 Dashboard 的 <Outlet /> 中 */}
          <Route path="products" element={<AdminProducts />} />
          {/* 可以添加其他子路由 */}
          <Route path="coupons" element={<div>優惠券頁面</div>} />
          <Route path="orders" element={<div>訂單頁面</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
