import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as productService from "../../service/ProductService";
import * as loginService from "../../service/UserService";
import * as cartService from "../../service/CartService";
import {toast} from "react-toastify";
import {Header} from "../header/Header";
import "./list_product.css"

export function ListProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState([]);
    const [limit, setLimit] = useState("");
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [sort, setSort] = useState("");
    const [quantity, setQuantity] = useState(1);
    const pattern = /[!@#$%^&*()_+=|{}<>?]/;

    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    console.log("oke" + "---------")

    function truncateString(str) {
        return str.length > 20 ? str.slice(0, 20) + '...' : str;
    }

    const getProductList = async () => {
        try {
            const array = await productService.getAllListProduct(limit, page, searchName, searchCategory, sort);
            setProducts(array.data.content);
            setRecords(array.data.totalElements);
            setTotalPage(array.data.totalPages);
        } catch (e) {
            setProducts([]);
            setRecords(0);
            setPage(0);
        }
    }
    const getCategoryList = async () => {
        const array = await productService.getAllType();
        setCategory(array.data);
    }


    useEffect(() => {
        document.title = "MH Cosmetic - Sản phẩm ";
        getProductList();
        getCategoryList();
    }, [page, refresh, sort]);

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

    if (!products) {
        return null
    }
    return (
        <>
            <Header/>
            <div className="container">
                <h2>AA</h2>
                <h3 className="mt-5">DANH SÁCH SẢN PHẨM</h3>
                <div className="col-12 d-flex justify-content-end mt-3 mb-3">

                    <div className="col-auto mx-1">
                        <select className="form-select customer-select" onChange={(sort) => setSort(sort.target.value)}>
                            <option value="0">Mặc định</option>
                            <option value="1">Giá thấp đến cao</option>
                            <option value="2">Giá cao đến thấp</option>
                        </select>
                    </div>
                    <div className="col-auto mx-1">
                        <select id="type" name="type" className="form-select"
                                style={{width: "100%"}} onChange={(type) => setSearchCategory(type.target.value)}>
                            <option value="">Chọn loại sản phẩm</option>
                            {category.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*<div className="col-auto mx-1">*/}
                    {/*    <input*/}
                    {/*        className="form-control"*/}
                    {/*        type="search"*/}
                    {/*        placeholder="Tìm mùi hương"*/}
                    {/*        aria-label="Search"*/}
                    {/*        style={{width: '150px'}}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            const value = event.target.value;*/}
                    {/*            // setSearchName(value);*/}
                    {/*        }}*/}
                    {/*        onKeyDown={handleKeyDown}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="col-auto mx-1">
                        <input
                            className="form-control" type="search" placeholder="Tìm theo tên" aria-label="Search"
                            style={{width: '150px'}} onChange={(event) => {
                            const value = event.target.value;
                            setSearchName(value);
                        }}
                            onKeyDown={handleKeyDown}
                        />

                    </div>
                    <div className="col-auto mx-1">
                        <button className="btn btn-outline-primary text-center brown-button"
                                type="button"
                                onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
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
                                        <div style={{width: "235px", height: "235px"}}>
                                            <img style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                                marginLeft: "29px"
                                            }}
                                                 src={product.firstImage}/>
                                        </div>
                                        <div style={{
                                            flexGrow: "1", padding: "10px 5px",
                                            color: "black",
                                            textAlign: "left",
                                            fontFamily: "Nunito",
                                            fontSize: "19px"
                                        }}>{product.nameProduct}</div>
                                        <div style={{
                                            marginTop: "auto",
                                            lineHeight: "1.5",
                                            textAlign: "center",
                                            color: "#a39857",
                                            fontFamily: "Nunito",
                                            fontSize: "19px",
                                            fontWeight: "bold"
                                        }}>{vnd.format(product.priceProduct)}</div>
                                    </Link>
                                );
                            })
                        ) : (<p>Không tìm thấy!</p>)
                    }

                </div>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="my-2">
                        <div className="row text-center">
                            <div className="ms-auto">
                                <nav className="bottom" aria-label="Page navigation">
                                    <ul className="pagination mb-0 ">
                                        {/*<li className="page-item">*/}
                                        {/*    <a className={`page-link ${page === 0 ? "disabled" : ""}`}*/}
                                        {/*       onClick={() => setPage(0)} tabIndex="-1" href="#"*/}
                                        {/*       aria-disabled="true">《</a>*/}
                                        {/*</li>*/}
                                        <li className="page-item ">
                                            <a onClick={() => previousPage()}
                                               className={`page-link ${page <= 0 ? "disabled" : ""}`}
                                               href="#"
                                               tabIndex="-1"
                                               aria-disabled="true">〈 </a>
                                        </li>
                                        <li className="page-item" aria-current="page">
                                            <a className="page-link" href="#">{1 + page}/{totalPage}</a>
                                        </li>
                                        <li className="page-item">
                                            <a onClick={() => nextPage()}
                                               className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                               href="#"> 〉 </a>
                                        </li>
                                        {/*<li className="page-item">*/}
                                        {/*    <a className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}*/}
                                        {/*       href="#"*/}
                                        {/*       onClick={() => setPage(totalPage - 1)}> 》 </a>*/}
                                        {/*</li>*/}
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