import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as mainService from "../../service/MainService";
import {Header} from "../header/Header";
import "./main.css"

export function Main() {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const vnd = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})

    useEffect(() => {
        getProductList();

    }, [])
    const getProductList = async () => {
        const arr = await mainService.getListProduct();
        setProducts(arr.data);
    }

    const handleRegister = async () => {
        navigate('/login');
    }

    const handleLogout = async () => {
        setLogin(false);
        localStorage.removeItem("JWT");
        setUsername("");
        navigate("/")
    }

    return (
        <div>
            <div className="header">
                <Header/>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        {/*<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"*/}
                        {/*        aria-label="Slide 3"></button>*/}
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img style={{marginTop: "75px"}} src="/image/IMG_0750 3.jpg"
                                 className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block"
                                 style={{marginLeft: "40%", color: "black"}}>
                                <h6 style={{marginTop: "-75%", marginLeft: "30%"}}>MỸ PHẨM CHIẾT XUẤT TỪ THIÊN
                                    NHIÊN</h6>
                                <h2 style={{
                                    marginLeft: "50px",
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: "50px"
                                }}>Sắc đẹp tinh khiết</h2>

                                <Link to={`/list`}>
                                    <button className="btn btn-dark "
                                            type="button"
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                marginLeft: "70%",
                                                marginTop: "10px"
                                            }}>
                                        XEM CHI TIẾT
                                    </button>

                                </Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img style={{marginTop: "75px"}} src="/image/IMG_0754.JPG"
                                 className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                {/*<h4>Mỹ phẩm chính hãng</h4>*/}
                                {/*<p>Cam kết mỹ phẩm nhập khẩu chính hãng.</p>*/}
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="row row-divided " id="row-299623123" style={{marginLeft: "10%", marginTop: "40px"}}>

                    <div id="col-33895845" className="col medium-4 large-4">
                        <div className="col-inner">
                            <div className="icon-box featured-box icon-box-left text-left is-small"
                                 style={{margin: "0px 0px 0px 0px"}}>
                                <div className="icon-box-img" style={{width: "120px"}}>
                                    <div className="icon">
                                        <div style={{fontSize: "40px", color: "#a39857"}}>
                                            <ion-icon name="logo-usd"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="icon-box-text last-reset">
                                    <h5 className="uppercase">MỨC GIÁ RẺ NHẤT</h5>
                                    <p style={{textAlign: "justify"}}><span style={{color: "#000000"}}>Bình ổn giá, với mức cạnh tranh nhất trên thị trường, mang tới cho người dùng những trải nghiệm trọn vẹn nhất.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="col-1065226016" className="col medium-4 large-4">
                        <div className="col-inner">
                            <div className="icon-box featured-box icon-box-left text-left is-small"
                                 style={{margin: "0px 0px 0px 0px"}}>
                                <div className="icon-box-img" style={{width: "120px"}}>
                                    <div className="icon">
                                        <div style={{fontSize: "40px", color: "#a39857"}}>
                                            <ion-icon name="checkbox-sharp"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="icon-box-text last-reset">
                                    <h5 className="uppercase">CAM KẾT CHẤT LƯỢNG</h5>
                                    <p><span style={{color: "#000000"}}>Cam kết các sản phẩm đều là hàng chính hãng, cam kết 1 đền 10 nếu phát hiện hàng giả, hàng nhái, hàng kém chất lượng.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="col-2146834445" className="col medium-4 large-4">
                        <div className="col-inner">


                            <div className="icon-box featured-box icon-box-left text-left is-small"
                                 style={{margin: "0px 0px 0px 0px"}}>
                                <div className="icon-box-img" style={{width: "120px"}}>
                                    <div className="icon">
                                        <div style={{fontSize: "40px", color: "#a39857"}}>
                                            <ion-icon name="bag-check-sharp"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="icon-box-text last-reset">
                                    <h5 className="uppercase">GIAO HÀNG TOÀN QUỐC</h5>
                                    <p style={{textAlign: "justify"}}><span style={{color: "#000000"}}>Giao hàng toàn quốc, nhập hàng trước &#8211; thanh toán sau. Chỉ với thao tác đặt hàng nhanh chóng qua Website.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="col-2146834445" className="col medium-4 large-4">
                        <div className="col-inner">


                            <div className="icon-box featured-box icon-box-left text-left is-small"
                                 style={{margin: "0px 0px 0px 0px"}}>
                                <div className="icon-box-img" style={{width: "120px"}}>
                                    <div className="icon">
                                        <div style={{fontSize: "40px", color: "#a39857"}}>
                                            <ion-icon name="aperture"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="icon-box-text last-reset">
                                    <h5 className="uppercase">HỔ TRỢ 24/7</h5>
                                    <p style={{textAlign: "justify"}}><span style={{color: "#000000"}}> Hãy liên lạc với chúng tôi 24 giờ một ngày, 7 ngày một tuần.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container" style={{marginTop: "90px"}}>
                    <p className="main-page" style={{marginTop: "20px"}}>Gần đây đã thêm cửa hàng chúng tôi </p>
                    <h2 className="sub-title" style={{textAlign: "center", marginTop: "-10px"}}>SẢN PHẨM NỔI BẬT</h2>
                    <div className="exclusives">
                        {

                            products.length !== 0 ? (
                                products.map((product) => {
                                    return (
                                        <div key={product.idProduct}>
                                            <Link to={`/detail/${product.idProduct}`} className="text-decoration-none">
                                                <div className="card" style={{width: "18rem"}}>
                                                    <img src={product.firstImage} className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                        <h6>{product.nameProduct}</h6>
                                                        <p>{vnd.format(product.priceProduct)}</p>
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    );
                                })
                        ) : (<p>Không tìm thấy!</p>)
                        }

                    </div>
                    <div>
                        <h2 className="sub-title" style={{textAlign: "center", marginTop: "90px"}}>CÁC LOẠI SẢN
                            PHẨM</h2>
                    </div>
                    <div className="trending" style={{marginTop: "10px"}}>
                        <div className="text-center">
                            <Link to={"/category/1"} className="text-decoration-none text-dark">
                                <img
                                    src="https://i.pinimg.com/564x/d3/80/c7/d380c7fd39b4d984a3c9ba38a15f4863.jpg"/>
                                <h5 className="mt-3">SON</h5>
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link to={"/category/2"} className="text-decoration-none text-dark">
                                <img
                                    src="https://i.pinimg.com/564x/50/60/1a/50601a69b963bd4964fedd168bd8b3e4.jpg"/>
                                <h5 className="mt-3">NƯỚC HOA</h5>
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link to={"/category/3"} className="text-decoration-none text-dark">
                                <img
                                    src="https://i.pinimg.com/564x/7c/2c/af/7c2caf4f0bd0485e119ae24aa0159a2b.jpg"/>
                                <h5 className="mt-3">MAKE-UP</h5>
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link to={"/category/4"} className="text-decoration-none text-dark">
                                <img
                                    src="https://i.pinimg.com/564x/d8/8e/22/d88e2255011cfbccc81cc616ba9a4bfe.jpg"/>
                                <h5 className="mt-3">SKINCARE</h5>
                            </Link>
                        </div>
                    </div>
                    <div className="cta">
                        <h3>MH <br/>Cosmetic</h3>

                    </div>
                </div>
            </div>
        </div>
    )

}