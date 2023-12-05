import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartFlatbed, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [searchName, setSearchName] = useState("");
    useEffect(() => {
        if (localStorage.getItem("JWT")) {
            setIsLoggedIn(true);
            setUsername(jwtDecode(localStorage.getItem("JWT")).sub);
        }
    }, []);
    const handleRegister = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("JWT");
        setUsername("");
        navigate("/");
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchName.trim() !== '') {
            searchName && navigate(`/search/${searchName.trim()}`)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand" href="src/component#">
                        <span className="d-inline-block align-top custom-text my-2">MH Cosmetic</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="text-decoration-none">
                                    <a className="nav-link active" aria-current="page" href="src/component#" style={{fontWeight:"bold", marginLeft:"100px"}}>TRANG CHỦ</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/list"} className="text-decoration-none">
                                    <a className="nav-link" href="src/component#" style={{fontWeight:"bold",color:"black",marginLeft:"30px"}}>DANH SÁCH SẢN PHẨM</a>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="src/component#" id="navbarDropdownMenuLink"
                                   role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false" style={{fontWeight:"bold",color:"black",marginLeft:"30px"}}>
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
                                    <a className="nav-link" href="src/component#" style={{fontWeight:"bold",color:"black",marginLeft:"30px"}}>GIỚI THIỆU</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                {isLoggedIn ? (
                                    <Link to={"/info"} className="text-decoration-none">
                                        <a className="nav-link active" aria-current="page" href="src/component#">Thông tin cá
                                            nhân</a>
                                    </Link>
                                ) : (
                                    <p></p>
                                )}

                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Nhập tên sản phẩm" aria-label="Search"
                                   onChange={(event) => {
                                       const value = event.target.value;
                                       setSearchName(value);
                                   }}
                                   onKeyDown={handleKeyDown}
                            />
                            <Link to={"/cart"} className="text-decoration-none m-auto" style={{fontSize:"1.8rem", color:"black", width:"80px"}}>
                                <ion-icon name="cart-outline"></ion-icon>
                            </Link>
                        </form>
                        <div className="login-section mx-2">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <span>Hello,{username}</span>
                                    <a href="src/component#" className="logout-btn mx-3 text-dark text-decoration-none"
                                       onClick={handleLogout}>
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                    </a>
                                </div>
                            ) : (
                                <div className="user-info">
                                    <a href="/login" className="logout-btn mx-2 text-dark text-decoration-none"
                                       onClick={handleRegister} style={{fontSize:"1.8rem"}}>
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