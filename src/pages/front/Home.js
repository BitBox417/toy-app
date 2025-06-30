import SearchBox from "../../components/SearchBox";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1605192704979-2bb15327c206?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRveXxlbnwwfHwwfHx8MA%3D%3D"
              className="img-fluid"
              alt="玩具展示"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">童心玩具屋</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              陪你長大的，不只是玩具，是一段段童年的故事。
              我們相信，每一個玩具，都是孩子想像力的延伸。
              這裡不只有療癒的布偶、精緻的模型、還有你我都捨不得長大的回憶。 🌟
              一起進入玩具的奇幻世界吧！
            </h5>

            {/* 使用 SearchBox 組件 */}
            <div className="mt-4">
              <SearchBox
                placeholder="搜尋您喜愛的玩具..."
                buttonText="搜尋"
                buttonClass="btn btn-dark rounded-0"
                containerClass="input-group mb-0"
                redirectToProducts={true}
              />
            </div>
          </div>
        </div>

        {/* 其他內容保持不變 */}
        <div className="row mt-5">
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRveXxlbnwwfHwwfHx8MA%3D%3D"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">經典公仔系列</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    嚴選電影經典角色，多款姿勢隨機出貨，每一隻都充滿呆萌個性。高品質
                    PVC
                    材質打造，是收藏與送禮首選，陪你一起耍廢放鬆、守護工作桌！
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 其他卡片內容... */}
        </div>
      </div>

      {/* 其他內容保持不變 */}
      <div className="bg-light mt-7">{/* carousel 內容... */}</div>

      <div className="container my-7">
        <div className="row"></div>
      </div>

      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
