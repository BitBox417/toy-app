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
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://images.unsplash.com/photo-1558594155-f66a31feb3c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg4fHx0b3l8ZW58MHx8MHx8fDA%3D"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">原木動物積木</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    每一隻小動物都是原木手工製成，使用無毒水性漆彩繪，讓孩子在遊戲中學習動物名稱與空間概念。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://images.unsplash.com/photo-1716226694795-dd68877f7848?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHRveXxlbnwwfHwwfHx8MA%3D%3D"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">櫸木玩具車</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    以天然櫸木打造，圓角設計不傷手，適合1歲以上寶寶抓握推行。無毒塗層安全無虞，是寶寶最棒的第一台玩具車。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://images.unsplash.com/photo-1591449235870-2d8491bf51ff?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc2fHx0b3l8ZW58MHx8MHx8fDA%3D"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">復古積木玩具</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    一組復古積木玩具充滿童趣與色彩層次，讓人聯想到童年的無限創造力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1694747993167-efb40717b869?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcxfHx0b3l8ZW58MHx8MHx8fDA%3D"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        「每一個玩具，都是孩子夢想的起點，
                        陪伴他們長大，也喚醒我們心中的童年記憶。」
                      </p>
                      <p className="mt-auto text-muted">
                        精選玩具，讓成長充滿想像與溫度。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        "Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat."
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        "Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat."
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
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
