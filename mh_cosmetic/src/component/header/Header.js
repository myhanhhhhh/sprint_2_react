import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartFlatbed, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";
import * as loginService from "../../service/UserService";
import {toast} from "react-toastify";
import * as CartService from "../../service/CartService";

export function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [searchName, setSearchName] = useState("");
    const [products, setProducts] = useState([]);
    const [sumCart, setSumCart] = useState(0);
    const [check , setCheck ] = useState(0);
    const checkCart = async (userName) => {
        try {
            const response = await CartService.sumCart(userName);
            const sum = response.data;
            setSumCart(sum);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    // useEffect(()=>{
    //     setCheck(Math.random)
    // },[check])


    useEffect(() => {
        if (localStorage.getItem("JWT")) {
            setIsLoggedIn(true);
            setUsername(jwtDecode(localStorage.getItem("JWT")).sub);
            const userName = jwtDecode(localStorage.getItem("JWT")).sub;
            checkCart(userName);
        }
    }, [isLoggedIn, username, searchName,sumCart,check]);



    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("JWT");
        setUsername("");
        navigate("/");
        toast("Đăng xuất thành công")
    };

    const getIntoCart = async (idProduct) => {
        try {
            const jwtToken = await loginService.getJwtToken();
            if (!jwtToken) {
                navigate("/login")
                toast("Vui lòng đăng nhập!")
            }
            const getUser = await loginService.getUser(jwtToken.sub);
            // const res = await cartService.addToCart(idProduct, getUser.id, quantity);
            // if (res.status === 200) {
            //     toast("Thêm vào giỏ hàng thành công!");
            // }
        } catch (e) {

        }

    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchName.trim() !== '') {
            searchName && navigate(`/search/${searchName.trim()}`)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-5">
                <div className="container-fluid">
                    <img style={{width: "6rem", marginLeft: "5.5rem"}} src="/image/image-removebg-preview (3).png"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="text-decoration-none">
                                    <a className="nav-link active" aria-current="page" href="src/component#"
                                       style={{fontWeight: "bold"}}>TRANG CHỦ</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/list"} className="text-decoration-none">
                                    <a className="nav-link" href="src/component#"
                                       style={{fontWeight: "bold", color: "black", marginLeft: "30px"}}>DANH SÁCH SẢN
                                        PHẨM</a>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="src/component#"
                                   id="navbarDropdownMenuLink"
                                   role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false"
                                   style={{fontWeight: "bold", color: "black", marginLeft: "30px"}}>
                                    SẢN PHẨM
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link to={"/category/1"} className="text-decoration-none text-dark">
                                        <a className="dropdown-item" href="src/component#">Son</a></Link></li>
                                    <li><Link to={"/category/2"} className="text-decoration-none text-dark">
                                        <a className="dropdown-item" href="src/component#">Nước Hoa</a></Link></li>
                                    <li><Link to={"/category/3"} className="text-decoration-none text-dark">
                                        <a className="dropdown-item" href="src/component#">Make-Up</a></Link></li>
                                    <li><Link to={"/category/4"} className="text-decoration-none text-dark">
                                        <a className="dropdown-item" href="src/component#">Skincare</a></Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={"/introduce"} className="text-decoration-none">
                                    <a className="nav-link" href="src/component#"
                                       style={{fontWeight: "bold", color: "black", marginLeft: "30px"}}>GIỚI THIỆU</a>
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input style={{marginRight: "100px"}} className="form-control me-2" type="search"
                                   placeholder="Nhập tên sản phẩm"
                                   aria-label="Search"
                                   onChange={(event) => {
                                       const value = event.target.value;
                                       setSearchName(value);
                                   }}
                                   onKeyDown={handleKeyDown}
                            />
                            {/*{!isLoggedIn ?*/}
                            <div>
                                <Link to="/cart" className="text-decoration-none m-auto"
                                      style={{fontSize: "1.8rem", color: "black", width: "80px"}}
                                      onClick={() => getIntoCart(products.idProduct)}>
                                    <ion-icon name="cart-outline"></ion-icon>
                                </Link>
                                <span className="position-absolute top-0 start-1 badge badge-pill bg-danger" style={{marginTop:"8px"   }}>{sumCart}</span>
                            </div>
                        </form>
                        <div className="login-section mx-2">
                            {isLoggedIn ? (
                                <div className="float-lg-end info" style={{marginRight: "6rem"}}>
                                    <div className="position-relative">
                                        <div className="dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button"
                                               data-bs-toggle="dropdown" aria-expanded="false">
                                                Hi, {username}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link to={"/customer"} className="dropdown-item">Thông tin cá
                                                        nhân</Link>
                                                </li>
                                                <hr/>
                                                <li>
                                                    <Link to={"/history"} className="dropdown-item">Lịch sử mua hàng</Link>
                                                </li>
                                                <hr/>
                                                <li onClick={() => handleLogout()}>
                                                    <p style={{fontFamily: "Nunito Sans, sans-serif"}}
                                                       className="dropdown-item">Đăng xuất</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="user-info" style={{marginRight: "5rem"}}>
                                    <a href="#" className="logout-btn mx-2 text-dark text-decoration-none"
                                       onClick={handleLogin} style={{fontSize: "1.8rem"}}>
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </nav>

        </>
    );
}