import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom"; // 新增這行
import axios from "axios";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItem] = useState([]);

  const removeCart = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      console.log(res);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItem([...loadingItems, item.id]);
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      console.log(res);
      setLoadingItem(loadingItems.filter((id) => id !== item.id));
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">您的購物車</h2>
          </div>
          {cartData?.carts?.map((item) => (
            <div className="d-flex mt-4 bg-light" key={item.id}>
              <img
                src={item.product.imageUrl}
                alt=""
                className="object-cover"
                style={{ width: "120px" }}
              />
              <div className="w-100 p-3 position-relative">
                <button
                  type="button"
                  className="btn btn-outline-danger position-absolute"
                  onClick={() => removeCart(item.id)}
                  style={{ top: "10px", right: "10px" }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
                <p className="mb-0 fw-bold">{item.product.title}</p>
                <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                  {item.product.content}
                </p>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <span className="me-2">數量：</span>
                    <select
                      className="form-select"
                      value={item.qty}
                      disabled={loadingItems.includes(item.id)}
                      onChange={(e) =>
                        updateCartItem(item, parseInt(e.target.value, 10))
                      }
                    >
                      {[...Array(20)].map((_, index) => (
                        <option value={index + 1} key={index}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mb-0 ms-auto">NT${item.final_total}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartData?.final_total}</p>
          </div>
          {/* 修正：使用 Link 而不是 href */}
          <Link
            to="/checkout"
            className="btn btn-dark w-100 mt-4 rounded-0 py-3"
          >
            確認
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
