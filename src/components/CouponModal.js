import axios from "axios";
import { useEffect, useState } from "react";

function CouponModal({ closeCouponModal, getCoupons, type, tempCoupon }) {
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: "",
    code: "testCode",
  });

  useEffect(() => {
    if (type === "create") {
      // 建立模式：設定預設值，due_date 為今天的日期字串
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: todayString,
        code: "testCode",
      });
    } else if (type === "edit") {
      // 編輯模式：將時間戳轉換為日期字串
      const dateString = new Date(tempCoupon.due_date * 1000)
        .toISOString()
        .split("T")[0];

      setTempData({
        ...tempCoupon,
        due_date: dateString,
      });
    }
  }, [type, tempCoupon]);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;

    setTempData((prevData) => {
      if (name === "percent") {
        return {
          ...prevData,
          [name]: Number(value),
        };
      } else if (name === "is_enabled") {
        return {
          ...prevData,
          [name]: checked ? 1 : 0,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const submit = async () => {
    try {
      // 將日期字串轉換為時間戳（使用 UTC 時間以避免時區問題）
      const dueDateTimestamp =
        new Date(tempData.due_date + "T00:00:00.000Z").getTime() / 1000;

      const submitData = {
        ...tempData,
        due_date: dueDateTimestamp,
      };

      // 除錯訊息
      console.log("Original due_date string:", tempData.due_date);
      console.log("Converted timestamp:", dueDateTimestamp);
      console.log("Submit data:", submitData);

      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = "post";
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = "put";
      }

      const res = await axios[method](api, {
        data: submitData,
      });

      console.log("API Response:", res);
      closeCouponModal();
      getCoupons();
    } catch (error) {
      console.error("Error submitting coupon:", error);
    }
  };

  return (
    <div
      id="couponModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === "create"
                ? "建立新優惠券"
                : `編輯優惠券 ${tempCoupon.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeCouponModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="number"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    value={tempData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    className="form-control mt-1"
                    value={tempData.due_date}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={!!tempData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeCouponModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
