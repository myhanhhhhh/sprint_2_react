import {Header} from "../header/Header";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as productService from "../../service/ProductService";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import * as loginService from "../../service/UserService";
import * as cartService from "../../service/CartService";

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
            if (res.status === 200){
                toast("Thêm vào giỏ hàng thành công!");
            }
        }catch (e) {

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
                    {/*<div className="col-auto mx-1">*/}
                    {/*    <input*/}
                    {/*        className="form-control"*/}
                    {/*        type="search"*/}
                    {/*        placeholder="Tìm mùi hương"*/}
                    {/*        aria-label="Search"*/}
                    {/*        style={{ width: '150px' }}*/}
                    {/*        onChange={(event) => {*/}
                    {/*            const value = event.target.value;*/}
                    {/*            // setSearchName(value);*/}
                    {/*            setSearchFragrant(value);*/}
                    {/*        }}*/}
                    {/*        onKeyDown={handleKeyDown}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="col-auto mx-1">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Tìm theo tên"
                            aria-label="Search"
                            style={{width: '200px'}}
                            onChange={(event) => {
                                const value = event.target.value;
                                setSearchName(value);
                                // setSearchFragrant(value);
                            }}
                            onKeyDown={handleKeyDown}
                        />

                    </div>
                    <div className="col-auto mx-1">
                        <button className="btn btn-outline-primary text-center" type="button"
                                onClick={handleSearch}>Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className="exclusives mt-5">
                    {
                        products.length !== 0 ? (
                            products.map((product) => {
                                return (
                                    <div key={product.idProduct}>
                                        <Link to={`/detail/${product.idProduct}`} className="text-decoration-none">
                                            <img
                                                src={product.firstImage}/>
                                            <span>
                                    <h6>{truncateString(product.nameProduct)}</h6>
                                    <p>{vnd.format(product.priceProduct)}</p>
                                </span>
                                        </Link>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="src/component#" className="btn btn-outline-primary w-100"
                                               onClick={() => getIntoCart(product.idProduct)}
                                            >Thêm vào giỏ hàng</a>
                                        </div>
                                    </div>
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
                                               className={`page-link ${page <= 0 ? "disabled" : ""}`} href="src/component#"
                                               tabIndex="-1"
                                               aria-disabled="true">〈 </a>
                                        </li>
                                        <li className="page-item" aria-current="page">
                                            <a className="page-link" href="src/component#">{page + 1}/{totalPage}</a>
                                        </li>
                                        <li className="page-item">
                                            <a onClick={() => nextPage()}
                                               className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                               href="src/component#"> 〉 </a>
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