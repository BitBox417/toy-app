import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import CouponModal from "../components/CouponModal";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const couponModal = useRef(null);
  const deleteModalRef = useRef(null);
  //type:決定modal展開的用途
  const [type, setType] = useState("create");
  const [tempCoupon, setTempCoupon] = useState({});
  const [deleteCouponData, setDeleteCouponData] = useState({}); // 重新命名避免與函數衝突

  useEffect(() => {
    couponModal.current = new Modal("#couponModal", {
      backdrop: "static",
    });
    deleteModalRef.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    try {
      const couponRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
      );
      console.log(couponRes);
      setCoupons(couponRes.data.coupons);
      setPagination(couponRes.data.pagination);
    } catch (error) {
      console.error("獲取優惠券失敗:", error);
    }
  };

  const openCouponModal = (type, coupon) => {
    setType(type);
    setTempCoupon(coupon);
    couponModal.current.show();
  };

  const closeCouponModal = () => {
    couponModal.current.hide();
  };

  const openDeleteModal = (coupon) => {
    setDeleteCouponData(coupon); // 使用正確的狀態設定函數
    deleteModalRef.current.show();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
  };

  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        getCoupons();
        deleteModalRef.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <CouponModal
        closeCouponModal={closeCouponModal}
        getCoupons={getCoupons}
        type={type}
        tempCoupon={tempCoupon}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={deleteCouponData.title} // 使用正確的狀態
        handleDelete={() => deleteCoupon(deleteCouponData.id)} // 傳遞正確的刪除函數
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠券
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠券代碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.title}</td>
              <td>{coupon.percent}%</td>
              <td>{new Date(coupon.due_date * 1000).toLocaleDateString()}</td>
              <td>{coupon.code}</td>
              <td>{coupon.is_enabled ? "啟用" : "未啟用"}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => openCouponModal("edit", coupon)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={() => openDeleteModal(coupon)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pagination={pagination}
        changePage={(page) => getCoupons(page)}
      />
    </div>
  );
}

export default AdminCoupons;
