import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as productService from "../../service/ProductService";
import {Header} from "../header/Header";
import {Link} from "react-router-dom";

export function Search() {
    const newSearchName = useParams().searchName;
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState("");
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState();
    const [totalPage, setTotalPage] = useState();

    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    function truncateString(str) {
        return str.length > 23 ? str.slice(0, 23) + '...' : str;
    }

    const getProductList = async () => {
        try {
            const array = await productService.getAllListProduct(limit, page, newSearchName, "", "", "");
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
        getProductList();
    }, [page]);

    const previousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }
    return(
    <>
        <Header/>
        <div className="container">
            <h2>AA</h2>
            <h3 className="mt-5">Kết quả tìm kiếm:</h3>
            <div className="trending-hanh">
                {
                    products.length !== 0 ? (
                        products.map((product) => {
                            return (
                                <Link key={product.idProduct} to={`/detail/${product.idProduct}`}
                                      className="text-decoration-none"
                                      style={{display: "flex", flexDirection: "column", flex: "1"}}>
                                    <div style={{width: "235px", height: "235px"}}>
                                        <img style={{objectFit: "cover", width: "100%", height: "100%"}}
                                             src={product.firstImage}/>
                                    </div>
                                    <div style={{
                                        flexGrow: "1", padding: "10px 5px",
                                        color: "black",
                                        textAlign: "left"
                                    }}>{product.nameProduct}</div>
                                    <div style={{
                                        marginTop: "auto",
                                        lineHeight: "1.5",
                                        textAlign: "center",
                                        color: "#a39857"
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
                                    <li className="page-item">
                                        <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                                           onClick={() => setPage(0)} tabIndex="-1" href="#"
                                           aria-disabled="true">《</a>
                                    </li>
                                    <li className="page-item ">
                                        <a onClick={() => previousPage()}
                                           className={`page-link ${page <= 0 ? "disabled" : ""}`} href="#" tabIndex="-1"
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
                                    <li className="page-item">
                                        <a className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`} href="#"
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