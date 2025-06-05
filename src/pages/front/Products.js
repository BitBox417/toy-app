import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getProducts = async (page = 1) => {
    setLoading(true);
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
      );
      console.log(productRes);
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination);
    } catch (error) {
      console.error("獲取產品失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />

        <div className="row">
          {products.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="card border-0 mb-4 position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-fit-cover"
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-2">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <p className="text-muted mt-1">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="d-flex justify-content-center">
          <Pagination
            pagination={pagination}
            getProducts={getProducts}
            key={pagination.current_page} // 強制重新渲染
          />
        </nav>
      </div>
    </>
  );
}

export default Products;
