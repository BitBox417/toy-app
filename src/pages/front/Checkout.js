import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";
import axios from "axios";
import { useState } from "react";

function Checkout() {
  const { cartData } = useOutletContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const { name, email, tel, address } = data;
      const form = {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
        },
      };

      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );

      console.log("訂單創建成功:", res);

      // 檢查回應狀態
      if (res.data.success) {
        setSubmitMessage(`訂單創建成功！訂單編號：${res.data.orderId}`);
        reset(); // 清空表單

        // 修正：正確的路由跳轉語法
        navigate(`/success/${res.data.orderId}`);
      } else {
        setSubmitError(res.data.message || "訂單創建失敗");
      }
    } catch (error) {
      console.error("訂單提交錯誤:", error);

      // 處理不同類型的錯誤
      if (error.response) {
        // 伺服器回應了錯誤狀態碼
        const status = error.response.status;
        const message = error.response.data?.message || "伺服器錯誤";

        switch (status) {
          case 404:
            setSubmitError("API 路徑不存在，請檢查設定");
            break;
          case 400:
            setSubmitError("請求資料格式錯誤");
            break;
          case 500:
            setSubmitError("伺服器內部錯誤，請稍後再試");
            break;
          default:
            setSubmitError(`錯誤 ${status}: ${message}`);
        }
      } else if (error.request) {
        // 請求已發送但沒有收到回應
        setSubmitError("網路連接錯誤，請檢查網路連線");
      } else {
        // 其他錯誤
        setSubmitError("發生未知錯誤，請稍後再試");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4">
              <h4 className="fw-bold">外送資料</h4>

              {/* 顯示提交狀態訊息 */}
              {submitMessage && (
                <div className="alert alert-success" role="alert">
                  {submitMessage}
                </div>
              )}

              {submitError && (
                <div className="alert alert-danger" role="alert">
                  {submitError}
                </div>
              )}

              <div className="mb-2">
                <Input
                  id="email"
                  labelText="Email"
                  type="email"
                  className="form-control rounded-0"
                  placeholder="example@gmail.com"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "Email 為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  }}
                />
              </div>

              <div className="mb-2">
                <Input
                  id="name"
                  labelText="使用者名稱"
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Carmen A. Rose"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "使用者名稱為必填",
                    maxLength: {
                      value: 10,
                      message: "使用者名稱長度不超過 10",
                    },
                  }}
                />
              </div>

              <div className="mb-2">
                <Input
                  id="tel"
                  labelText="電話"
                  type="tel"
                  className="form-control rounded-0"
                  placeholder="0933-123-123"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "電話為必填",
                    minLength: {
                      value: 6,
                      message: "電話不少於 6 碼",
                    },
                    maxLength: {
                      value: 12,
                      message: "電話不超過 12 碼",
                    },
                  }}
                />
              </div>

              <div className="mb-2">
                <Input
                  id="address"
                  labelText="地址"
                  type="text"
                  className="form-control rounded-0 mt-1"
                  placeholder="Address"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "地址為必填",
                  }}
                />
              </div>
            </div>

            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/cart" className="btn btn-outline-secondary me-2">
                返回購物車
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !cartData?.carts?.length}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    處理中...
                  </>
                ) : (
                  "提交訂單"
                )}
              </button>
            </div>
          </form>

          <div className="col-md-4">
            <div className="bg-white p-4 mb-4">
              <h4 className="mb-4">選購餐點</h4>
              {cartData?.carts?.length > 0 ? (
                <>
                  {cartData.carts.map((item) => (
                    <div className="d-flex mb-3" key={item.id}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="me-2"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between fw-bold">
                          <p className="mb-0">{item.product.title}</p>
                          <p className="mb-0">x {item.qty}</p>
                        </div>
                        <div className="d-flex justify-content-between text-muted">
                          <small>單價: NT$ {item.product.price}</small>
                          <small>小計: NT$ {item.final_total}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">Total</p>
                    <p className="mb-0 h4 fw-bold">
                      NT$ {cartData.final_total}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">購物車是空的</p>
                  <Link to="/products" className="btn btn-primary">
                    去購物
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
