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
            <div className="exclusives mt-5">
                {
                    products.length !== 0 ? (
                        products.map((product) => {
                            return (
                                <div key={product.idProduct}>
                                    <Link to={"/detail"} className="text-decoration-none">
                                        <img
                                            src={product.firstImage}/>
                                        <span>
                                    <h6>{truncateString(product.nameProduct)}</h6>
                                    <p>{vnd.format(product.priceProduct)}</p>
                                </span>
                                    </Link>
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
                                    <li className="page-item">
                                        <a className={`page-link ${page === 0 ? "disabled" : ""}`}
                                           onClick={() => setPage(0)} tabIndex="-1" href="src/component#"
                                           aria-disabled="true">《</a>
                                    </li>
                                    <li className="page-item ">
                                        <a onClick={() => previousPage()}
                                           className={`page-link ${page <= 0 ? "disabled" : ""}`} href="src/component#" tabIndex="-1"
                                           aria-disabled="true">〈 </a>
                                    </li>
                                    <li className="page-item" aria-current="page">
                                        <a className="page-link" href="src/component#">{1 + page}/{totalPage}</a>
                                    </li>
                                    <li className="page-item">
                                        <a onClick={() => nextPage()}
                                           className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`}
                                           href="src/component#"> 〉 </a>
                                    </li>
                                    <li className="page-item">
                                        <a className={`page-link ${page >= totalPage - 1 ? "disabled" : ""}`} href="src/component#"
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