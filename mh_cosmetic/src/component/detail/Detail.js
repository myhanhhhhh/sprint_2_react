import {Header} from "../header/Header";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as productService from "../../service/ProductService";
import * as loginService from "../../service/UserService";
import * as cartService from "../../service/CartService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export function Detail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [productSameType, setProductSameType] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [flag, setFlag] = useState(true);

    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    const getProduct = async () => {
        const res = await productService.productDetail(id);
        console.log("-------------")
        console.log(res);
        setProduct(res.data);
    }
    const getImage = async () => {
        const res = await productService.productImage(id);
        setImages(res.data);
        setSelectedImage(res.data[0].name);
        console.log(res);
    }
    const chooseImage = (index) => {
        setSelectedImage(images[index].name)
    };
    const getProductSameType = async () => {
        const res = await productService.productSameType(id);
        console.log("======")
        console.log(res);
        setProductSameType(res.data);
    }
    const getIntoCart = async (idProduct) => {
        try {
            const jwtToken = await loginService.getJwtToken();
            if (!jwtToken) {
                navigate("/login")
                toast("Vui lòng đăng nhập!")
            }
            if (product.quantity < 1) {
                toast("Sản phẩm đã hết hàng");
            } else {
                const getUser = await loginService.getUser(jwtToken.sub);
                const res = await cartService.addToCart(idProduct, getUser.id, quantity);
                if (res.status === 200) {
                    toast("Thêm vào giỏ hàng thành công!");
                }
            }
        } catch (e) {

        }
    }

    const getIntoCartNow = async (idProduct) => {
        try {
            const jwtToken = await loginService.getJwtToken();
            if (!jwtToken) {
                navigate("/login")
                toast("Vui lòng đăng nhập!")
            }
            if (product.quantity < 1) {
                toast("Sản phẩm đã hết hàng");
            } else {
                const getUser = await loginService.getUser(jwtToken.sub);
                const res = await cartService.addToCart(idProduct, getUser.id, quantity);
                if (res.status === 200) {
                    navigate("/cart");
                }
            }

        } catch (e) {

        }
    }

    useEffect(() => {
        getProduct();
        getImage();
        getProductSameType();
    }, [flag]);
    const increase = () => {
        setQuantity(quantity + 1);
    }
    const decrease = () => {
        setQuantity(quantity - 1);
    }

    return (
        product && images &&
        <>
            <Header/>
            <section className="py-5 mt-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="rounded-4" target="_blank" datatype="image"
                                   href="#">
                                    <img style={{maxWidth: "100%", maxHeight: "60vh", margin: "auto"}}
                                         className="rounded-4 fit"
                                         src={selectedImage}
                                         alt=""/>
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                {
                                    images.map((image, index) => {
                                        return (
                                            <div>
                                                <img width="70" height="70" className="rounded-2 mx-2"
                                                     src={image.name} onClick={() => chooseImage(index)}/>
                                            </div>
                                        );
                                    })
                                }

                            </div>

                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {product.name}
                                </h4>
                                <div className="d-flex flex-row my-3">

                                </div>

                                <div className="mb-3">
                                    <span className="h5">{vnd.format(product.price)}</span>
                                    <span className="text-muted">/ sản phẩm</span>
                                </div>

                                <hr/>

                                <div className="row mb-4">
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Số lượng</label>
                                        <div className="input-group mb-3" style={{width: "170px"}}>
                                            <button className="btn btn-white border border-secondary px-3" type="button"
                                                    id="button-addon1" data-mdb-ripple-color="dark"
                                                    onClick={() => decrease()}
                                                    disabled={quantity === 1 || product.quantity === 0}>
                                                -
                                            </button>
                                            <p className="my-auto mx-3">{quantity}</p>
                                            <button className="btn btn-white border border-secondary px-3" type="button"
                                                    id="button-addon2" data-mdb-ripple-color="dark"
                                                    onClick={() => increase()}
                                                    disabled={quantity === product.quantity || product.quantity === 0}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-warning shadow-0 mx-2"
                                   onClick={() => getIntoCartNow(product.id)}> Mua ngay </a>
                                <a href="#" className="btn btn-primary shadow-0"
                                   onClick={() => getIntoCart(product.id)}> Thêm giỏ hàng </a>

                            </div>
                        </main>
                    </div>
                </div>
            </section>
            <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">
                        <div className="col-lg-8 mb-4">
                            <div className="border rounded-2 px-3 py-2 bg-white">
                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className="nav-link d-flex align-items-center justify-content-center w-100 active"
                                           id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab"
                                           aria-controls="ex1-pills-1" aria-selected="true">Thông tin</a>
                                    </li>
                                </ul>

                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel"
                                         aria-labelledby="ex1-tab-1">
                                        <p>
                                            {product.description}
                                        </p>
                                        <table className="table border mt-3 mb-2">
                                            <tr>
                                                <th className="py-2">Xuất xứ:</th>
                                                <td className="py-2">{product.origin}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Thương hiệu:</th>
                                                <td className="py-2">{product.brand}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Mùi hương:</th>
                                                <td className="py-2">{product.fragrant}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Trọng lượng:</th>
                                                <td className="py-2">{product.weight}g</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Loại sản phẩm:</th>
                                                <td className="py-2">{product.category.name}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="px-0 border rounded-2 shadow-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Sản phẩm cùng loại</h5>
                                        {
                                            productSameType.map((same) => {
                                                if (same.idProduct !== product.id) {
                                                    return (
                                                        <Link to={`/detail/${same.idProduct}`}
                                                              className="text-decoration-none"
                                                              onClick={() => setFlag(!flag)}>
                                                            <div className="d-flex mb-3" key={same.idProduct}>

                                                                <a href="#" className="me-3">
                                                                    <img
                                                                        src={same.firstImage}
                                                                        style={{minWidth: "96px", height: "96px"}}
                                                                        className="img-md img-thumbnail"/>
                                                                </a>
                                                                <div className="info">
                                                                    <a href="#" className="nav-link mb-1">
                                                                        {same.nameProduct}
                                                                    </a>
                                                                    <strong
                                                                        className="text-dark">{vnd.format(same.priceProduct)}</strong>
                                                                </div>

                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}