import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductModal from "../components/ProductModal";
import Modal from "bootstrap/js/dist/modal";
import DeleteModal from "../components/DeleteModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const productModal = useRef(null);
  const deleteModalRef = useRef(null);
  //type:決定modal展開的用途
  const [type, setType] = useState("create");
  const [tempProduct, setTempProduct] = useState({});
  const [deleteProductData, setDeleteProductData] = useState({}); // 重新命名避免與函數衝突

  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    deleteModalRef.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`
      );
      console.log(productRes);
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination);
    } catch (error) {
      console.error("獲取產品失敗:", error);
    }
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };

  const closeProductModal = () => {
    productModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setDeleteProductData(product); // 使用正確的狀態設定函數
    deleteModalRef.current.show();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProducts();
        deleteModalRef.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <ProductModal
        closeProductModal={closeProductModal}
        getProduct={getProducts}
        type={type}
        tempProduct={tempProduct}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={deleteProductData.title} // 使用正確的狀態
        handleDelete={() => deleteProduct(deleteProductData.id)} // 傳遞正確的刪除函數
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal("create", {})}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal("edit", product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link disabled" href="/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...new Array(5)].map((_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <a className={`page-link ${i + 1 === 1 && "active"}`} href="/">
                {i + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="/" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminProducts;
