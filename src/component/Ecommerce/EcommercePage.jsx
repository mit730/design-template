import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const EcommercePage = () => {
  return (
    <>
      <div>

        <div className="navbar">
          <div className="navbar-left-items"> {/* Changed className name */}
            <div className="navbar-items-name">
              <div>BUY T-SHIRTS</div>
              <div>WOMEN</div>
              <div>MEN</div>
              <div>ABOUT</div>
              <div>CONTACT</div>
            </div>
          </div>

          <div className="navbar-icon">
            <img
              src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/logo-regular.png"
              alt=""
            />
          </div>

          <div className="navbar-rightside-items">
            <div>
              <IoSearchOutline />
            </div>
            <div >
              <div>$0.00</div>
            </div>
            <div >
              <FaShoppingCart />
            </div>
            <div>
              <div>LOG IN</div>
            </div>
          </div>

        </div>

        <div className="body-img">
          <div className="left-side-head">
            <div className="text-small">
              Women
            </div>
            <div className="text-heading">
              <h1>Slick. Modern.</h1>
              <h1>Awesome.</h1>
            </div>
            <div className="main-btn">
              <button className="shop-btn">Shop Collection</button>
            </div>
          </div>

          <div>
            <img src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/hero.png" alt="" />
          </div>


        </div>


        {/* ============================================ content =========================================== */}

        <div className="content-heading">
          <div className="small text">Summer Collection</div>
          <div className="center-heading"><h2>Popular T-Shirts</h2></div>
        </div>
        {/* ============================================================================================== */}

        <div className="content">
          <div >
            <img width={300} height={360} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-09-a-768x936.jpg" />
            <div className="description">
              <div> <span className="small-desc">Men</span></div>
              <div><h3>T-Shirt Name 10</h3></div>
              <div><h6>$33.00 – $36.00</h6></div>
              <div className="color-options">
                <div className="color-box selected" style={{ backgroundColor: "black" }}></div>
                <div className="color-box" style={{ backgroundColor: '#f5e1da' }}></div>
                <div className="color-box" style={{ backgroundColor: "white", border: "1px solid #ddd" }}></div>
              </div>

              <div className="size-options">
                <button className="size-box">XS</button>
                <button className="size-box selected">S</button>
                <button className="size-box">M</button>
                <button className="size-box">L</button>
                <button className="size-box">XL</button>
              </div>


            </div>
          </div>

          <div>
            <img width={300} height={360} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-06-a-400x488.jpg" />
            <div className="description">
              <div ><span className="small-desc">Women</span></div>
              <div><h3>T-Shirt Name 9</h3></div>
              <div><h6>$23.00 – $28.00</h6></div>
              <div className="color-options">
                <div className="color-box selected" style={{ backgroundColor: "black" }}></div>
                <div className="color-box" style={{ backgroundColor: '#f5e1da' }}></div>
                <div className="color-box" style={{ backgroundColor: "white", border: "1px solid #ddd" }}></div>
              </div>

              <div className="size-options">
                <button className="size-box">XS</button>
                <button className="size-box selected">S</button>
                <button className="size-box">M</button>
                <button className="size-box">L</button>
                <button className="size-box">XL</button>
              </div>
            </div>
          </div>

          <div>
            <img width={300} height={360} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-10-a-400x488.jpg" />
            <div className="description">
              <div ><span className="small-desc">Men</span></div>
              <div><h3>T-Shirt Name 8</h3></div>
              <div><h6>$21.00 – $25.00</h6></div>
              <div className="color-options">
                <div className="color-box selected" style={{ backgroundColor: "black" }}></div>
                <div className="color-box" style={{ backgroundColor: '#f5e1da' }}></div>
                <div className="color-box" style={{ backgroundColor: "white", border: "1px solid #ddd" }}></div>
              </div>

              <div className="size-options">
                <button className="size-box">XS</button>
                <button className="size-box selected">S</button>
                <button className="size-box">M</button>
                <button className="size-box">L</button>
                <button className="size-box">XL</button>
              </div>
            </div>
          </div>

          <div>
            <img width={300} height={360} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-08-a-400x488.jpg" />
            <div className="description">
              <div ><span className="small-desc">Women</span></div>
              <div><h3>T-Shirt Name 7</h3></div>
              <div><h6>$36.00 – $39.00</h6></div>
              <div className="color-options">
                <div className="color-box selected" style={{ backgroundColor: "#000000" }}></div>
                <div className="color-box" style={{ backgroundColor: '#f5e1da' }}></div>
                <div className="color-box" style={{ backgroundColor: "white", border: "1px solid #ddd" }}></div>
              </div>

              <div className="size-options">
                <button className="size-box">XS</button>
                <button className="size-box selected">S</button>
                <button className="size-box">M</button>
                <button className="size-box">L</button>
                <button className="size-box">XL</button>
              </div>


            </div>
          </div>
        </div>

        {/* ============================================================================================== */}
        <div className="othercontent">

          <div className="imge-cover" >
            <img width={600} height={400} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/collection-02.jpg" alt="" />


            <div className="img-below-heading">
              <div> <span className="small-descc">Men</span></div>
              <div className="texxt">The base collection - Ideal</div>
              <div className="texxt">every day.</div>
              <div><button className="shop-btnn">Shop Now</button></div>
            </div>
          </div>

          <div className="imge-cover">
            <img width={600} height={630} src="https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/collection-01.jpg" alt="" />
          </div>
        </div>

      </div>
    </>
  );
};

export default EcommercePage;
