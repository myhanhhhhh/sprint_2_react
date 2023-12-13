import {Header} from "../header/Header";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as productService from "../../service/ProductService";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import * as loginService from "../../service/UserService";
import * as cartService from "../../service/CartService";
import "./list_category.css"

export function ListCategory() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState("");
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState(`${id}`);
    const [searchFragrant, setSearchFragrant] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const pattern = /[!@#$%^&*()_+=|{}<>?]/;

    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    function truncateString(str) {
        return str.length > 20 ? str.slice(0, 20) + '...' : str;
    }

    const getIntoCart = async (idProduct) => {
        try {
            const jwtToken = await loginService.getJwtToken();
            if (!jwtToken) {
                navigate("/login")
                toast("Vui lòng đăng nhập!")
            }
            const getUser = await loginService.getUser(jwtToken.sub);
            const res = await cartService.addToCart(idProduct, getUser.id, quantity);
            if (res.status === 200) {
                toast("Thêm vào giỏ hàng thành công!");
            }
        } catch (e) {

        }

    }
    const getProductListByCategory = async (id) => {
        try {
            setSearchCategory(id);
            const array = await productService.getAllListProduct(limit, page, searchName, searchCategory, searchFragrant);
            setProducts(array.data.content);
            setRecords(array.data.totalElements);
            setTotalPage(array.data.totalPages);
        } catch (e) {
            setProducts([]);
            setRecords(0);
            setPage(0);
        }
    }

    useEffect(() => {
        // getProductList();
        getProductListByCategory(id);
    }, [page, refresh, id, searchCategory]);

    const handleSearch = () => {
        if (pattern.test(searchName)) {
            toast("Không nhập ký tự đặc biệt");
        } else {
            setPage(0);
            setRefresh(!refresh)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    let content;

    switch (id) {
        case '1':
            content = <h3 className="mt-5">SON</h3>;
            break;
        case '2':
            content = <h3 className="mt-5">NƯỚC HOA</h3>;
            break;
        case '3':
            content = <h3 className="mt-5">MAKE-UP</h3>;
            break;
        case '4':
            content = <h3 className="mt-5">SKINCARE</h3>;
            break;
        default:
    }
    return (
        <>
            <Header/>
            <div className="container">
                <h2>AA</h2>
                {content}
                <div className="col-12 d-flex justify-content-end mt-3 mb-3">
                </div>
                <div className="trending-hanh">
                    {
                        products.length !== 0 ? (
                            products.map((product) => {
                                return (
                                    <Link key={product.idProduct} to={`/detail/${product.idProduct}`}
                                          className="text-decoration-none"
                                          style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              flex: "1"
                                          }}>
                                        <div className="image-product" style={{width: "235px", height: "235px"}}>
                                            <div className="image-container">
                                                <img style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                    marginLeft: "29px"
                                                }}
                                                     src={product.firstImage}/>
                                                <span className="hover-text"
                                                      onClick={() => getIntoCart(product.idProduct)}><ion-icon
                                                    name="cart-outline"></ion-icon></span>
                                            </div>
                                        </div>
                                        <div style={{
                                            flexGrow: "1", padding: "10px 5px",
                                            color: "black",
                                            textAlign: "left",
                                            fontFamily: "Nunito",
                                            fontSize: "19px"
                                        }}>{product.nameProduct}</div>
                                        <div style={{display: "flex"}}>
                                            <div style={{
                                                marginTop: "auto",
                                                lineHeight: "1.5",
                                                textAlign: "center",
                                                color: "#a39857",
                                                fontFamily: "Nunito",
                                                fontSize: "19px",
                                                fontWeight: "bold"
                                            }}>{vnd.format(product.priceProduct)}</div>
                                            {/*<div style={{color:"black", marginLeft:"160px", fontSize:"30px", marginTop}}>*/}
                                            {/*    <ion-icon name="cart-outline"></ion-icon>*/}
                                            {/*</div>*/}
                                        </div>

                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100"
                                               onClick={() => getIntoCart(product.idProduct)}
                                            >Thêm vào giỏ hàng</a>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (<p style={{textAlign:"center"}}>Không tìm thấy!</p>)
                    }

                </div>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="my-2">
                        <div className="row text-center">
                            <div className="ms-auto">
                                <nav className="bottom" aria-label="Page navigation">
                                    <ul className="pagination mb-0 ">
                                        <li className="page-item">
                                            <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                                               onClick={() => setPage(0)} tabIndex="-1" href="#"
                                               aria-disabled="true">《</a>
                                        </li>
                                        <li className="page-item ">
                                            <a onClick={() => previousPage()}
                                               className={`page-link ${page <= 0 ? "disabled" : ""}`} href="#"
                                               tabIndex="-1"
                                               aria-disabled="true">〈 </a>
                                        </li>
                                        <li className="page-item" aria-current="page">
                                            <a className="page-link" href="#">{page + 1}/{totalPage}</a>
                                        </li>
                                        <li className="page-item">
                                            <a onClick={() => nextPage()}
                                               className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                               href="#"> 〉 </a>
                                        </li>
                                        <li className="page-item">
                                            <a className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                               href="#"
                                               onClick={() => setPage(totalPage - 1)}> 》 </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}