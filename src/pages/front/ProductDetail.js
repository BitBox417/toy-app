import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useOutletContext } from "react-router-dom";

function ProductDetail() {
  const [cartQuantity, setCartQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      console.log(productRes);
      setProduct(productRes.data.product);
    } catch (error) {
      console.error("獲取產品資料時發生錯誤:", error);
    }
  };

  const addToCart = async () => {
    const requestData = {
      data: {
        product_id: id,
        qty: cartQuantity,
      },
    };

    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("成功加入購物車:", res);
      // 加入購物車成功後，更新購物車資料
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.error("加入購物車時發生錯誤:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  // 防止數量小於 1
  const handleQuantityDecrease = () => {
    setCartQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setCartQuantity((prev) => prev + 1);
  };

  return (
    <div className="container">
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">NT$ {product.price?.toLocaleString()}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img
              src={product.imageUrl}
              alt={product.title || "產品圖片"}
              className="img-fluid mt-4"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={handleQuantityDecrease}
                disabled={cartQuantity <= 1 || isLoading}
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="商品數量"
              aria-describedby="button-addon1"
              readOnly
              value={cartQuantity}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={handleQuantityIncrease}
                disabled={isLoading}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-0 py-3"
            onClick={addToCart}
            disabled={isLoading}
          >
            {isLoading ? "加入中..." : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
