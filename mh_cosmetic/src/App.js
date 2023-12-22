import logo from './logo.svg';
import './App.css';
import React from ".";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {Cart} from "./component/cart/Cart";
import {Route, Routes} from "react-router-dom";
import {Customer} from "./component/customer/Customer";
import {Main} from "./component/main/Main";
import {Login} from "./component/login/Login";
import {ListProduct} from "./component/list_product/ListProduct";
import {Detail} from "./component/detail/Detail";
import {Search} from "./component/search/Search";
import {ListCategory} from "./component/list_category/ListCategory";
import {Introduce} from "./component/introduce/Introduce";
import {History} from "./component/customer/History";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/introduce" element={<Introduce/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/list" element={<ListProduct/>}/>
                <Route path="/detail/:id" element={<Detail/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/customer" element={<Customer/>}/>
                <Route path="/history" element={<History/>}/>
                <Route path="/search/:searchName" element={<Search/>}/>
                <Route path="/category/:id" element={<ListCategory/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
