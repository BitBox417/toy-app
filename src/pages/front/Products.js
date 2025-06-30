import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // 從 URL 參數獲取搜尋關鍵字
  const urlSearchTerm = searchParams.get("search") || "";

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

  // 搜尋功能
  const filterProducts = (searchValue, productsToFilter) => {
    if (!searchValue.trim()) {
      return productsToFilter;
    }

    const filtered = productsToFilter.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const content = product.content?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      const searchLower = searchValue.toLowerCase();

      return (
        title.includes(searchLower) ||
        content.includes(searchLower) ||
        description.includes(searchLower)
      );
    });

    return filtered;
  };

  // 處理搜尋 - 給 SearchBox 組件使用
  const handleSearch = (searchValue) => {
    // 更新 URL 參數
    if (searchValue.trim()) {
      setSearchParams({ search: searchValue });
    } else {
      setSearchParams({});
    }
  };

  // 清除搜尋
  const clearSearch = () => {
    setSearchParams({});
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    // 當 URL 參數變化或產品列表變化時，更新篩選結果
    const filtered = filterProducts(urlSearchTerm, products);
    setFilteredProducts(filtered);
  }, [urlSearchTerm, products]);

  // 決定要顯示的產品列表
  const displayProducts = urlSearchTerm ? filteredProducts : products;

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />

        {/* 搜尋區塊 */}
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <SearchBox
              placeholder="搜尋產品..."
              buttonText="搜尋"
              showClearButton={true}
              onSearch={handleSearch}
              redirectToProducts={false}
              initialValue={urlSearchTerm}
            />

            {/* 搜尋結果提示 */}
            {urlSearchTerm && (
              <div className="mt-2">
                <small className="text-muted">
                  搜尋「{urlSearchTerm}」找到 {displayProducts.length} 個結果
                </small>
              </div>
            )}
          </div>
        </div>

        {/* 產品列表 */}
        <div className="row">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
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
                    style={{ height: "200px" }}
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-2">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="text-muted mt-1">${product.price}</p>
                    {product.content && (
                      <p className="text-muted small">
                        {product.content.length > 50
                          ? `${product.content.substring(0, 50)}...`
                          : product.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <h4 className="text-muted">
                  {urlSearchTerm ? "找不到符合條件的產品" : "暫無產品"}
                </h4>
                {urlSearchTerm && (
                  <button
                    className="btn btn-outline-primary mt-3"
                    onClick={clearSearch}
                  >
                    瀏覽所有產品
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 分頁 - 只有在非搜尋狀態下顯示 */}
        {!urlSearchTerm && (
          <nav className="d-flex justify-content-center">
            <Pagination
              pagination={pagination}
              getProducts={getProducts}
              key={pagination.current_page}
            />
          </nav>
        )}
      </div>
    </>
  );
}

export default Products;
