import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBox({
  placeholder = "搜尋...",
  buttonText = "搜尋",
  buttonClass = "btn btn-dark rounded-0",
  inputClass = "form-control rounded-0",
  containerClass = "input-group",
  showClearButton = false,
  onSearch,
  redirectToProducts = true,
  initialValue = "",
}) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 從 URL 參數獲取搜尋關鍵字
  useEffect(() => {
    const urlSearchTerm = searchParams.get("search") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (onSearch) {
      // 如果有傳入 onSearch callback，則執行自定義搜尋邏輯
      onSearch(trimmedSearchTerm);
    } else if (redirectToProducts) {
      // 預設行為：導航到產品頁面
      if (trimmedSearchTerm) {
        navigate(`/products?search=${encodeURIComponent(trimmedSearchTerm)}`);
      } else {
        navigate("/products");
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 如果有傳入 onSearch 且不需要重導向，即時搜尋
    if (onSearch && !redirectToProducts) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSearch} className={containerClass}>
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {/* 清除按鈕 */}
      {showClearButton && searchTerm && (
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary rounded-0"
            type="button"
            onClick={clearSearch}
          >
            清除
          </button>
        </div>
      )}

      {/* 搜尋按鈕 */}
      <div className="input-group-append">
        <button className={buttonClass} type="submit">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
