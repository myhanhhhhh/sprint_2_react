import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as userService from "../../service/UserService";
import * as cartService from "../../service/CartService";
import * as orderService from "../../service/OrderService";
// import * as productService from "../../service/ProductService";
import Swal from 'sweetalert2';
import {toast} from "react-toastify";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {Link} from "react-router-dom";
import {Header} from "../header/Header";


export function Cart() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(true);

    const [id, setId] = useState("");
    const vnd = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})


    useEffect(() => {
        document.title = "MT Cosmetic - Gio hang";
        getAllProduct();
    }, [flag]);

    const getAllProduct = async () => {
        try {
            const jwtToken = await userService.getJwtToken();
            const user = await userService.getUser(jwtToken.sub);
            const result = await cartService.getAllCart(user.id);
            setProducts(result.data);
            setId(user.id);
        } catch (e) {
        }
    }

    let sum = 0;
    let sumPayment = 0;

    try {
        sum = products.reduce((acc, current) => acc + current.price * current.quantity, 0)
        sumPayment = sum / 20000;
    } catch (e) {

    }
    const deleteCart = async (idProduct, idUser) => {
        Swal.fire({
            title: 'Bạn có muốn xóa sản phẩm không ?',
            text: 'Lưu ý hành động này không hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Vang, toi muon xoa',
            cancelButtonText: 'khong',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await cartService.deleteCart(idUser, idProduct);
                if (res.status === 200) {
                    toast.success("Xoa thanh cong");
                } else {
                    setFlag(!flag);
                }
                getAllProduct();
            }
        });
    };


    const increase = async (idProduct, idUser) => {
        await cartService.increaseQuantity(idUser, idProduct);
        setFlag(!flag);
        getAllProduct();
    }


    const decrease = async (idProduct, idUser, quantity) => {
        if (quantity === 1) {
            await cartService.decreaseQuantity(idUser, idProduct);
            getAllProduct();
        } else {
            await cartService.decreaseQuantity(idUser, idProduct);
            setFlag(!flag);
            getAllProduct();
        }
    };


    const createOrder = (data, actions) => {
        if (sumPayment <= 0) {
            console.error('Giá trị không hợp lệ cho đơn đặt hàng PayPal');
            return null;
        }
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: sumPayment.toFixed(2),
                        currency_code: 'USD',
                    },
                },
            ],
        });
    }

    const onApprove = async (data, actions) => {
        try {
            await orderService.createOrder(id);
            navigate('/')
            toast.success("thanh toán thành công");
        } catch (error) {
            console.error('Error handling payment success: ', error);
        }
    };

    const onError = (err) => {
        console.error(err);
        toast.error("fail");
    }

    return (
        <div>
            <Header/>
            <section className=" my-5" style={{backgroundColor: "#ebeae8",}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-5">
                            <div className="card border shadow-0" style={{marginTop: "50px"}}>
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Giỏ Hàng Của Bạn</h4>
                                    {
                                        products.length !== 0 ? (
                                            products.map((product) => {
                                                return (
                                                    product.quantity > 0 && <div className="row gy-3 mb-4">
                                                        {/*<div style={{margin: "0 3% 0 -12%"}}>*/}
                                                        {/*    {products.numberProduct === 0 ? null : (*/}
                                                        {/*        <input*/}
                                                        {/*            onChange={() => handleCheckboxChange(products.id, products.quantity, products.idProduct)}*/}
                                                        {/*            type="checkbox"/>*/}
                                                        {/*    )}*/}
                                                        {/*</div>*/}
                                                        <div className="col-lg-5">
                                                            <div className="me-lg-5">
                                                                <div className="d-flex">
                                                                    <img
                                                                        src={product.image}
                                                                        className="border rounded me-3"
                                                                        style={{width: "96px", height: "96px"}}/>
                                                                    <div className="">
                                                                        <p>{product.name}</p>
                                                                        <p className="text-muted">{product.brand}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap my-auto">
                                                            <div className="">
                                                                <div className="d-flex align-items-center">
                                                                    <button className="btn btn-outline-secondary mx-2"
                                                                            type="button" id="decrementBtn"
                                                                            onClick={() => decrease(product.idProduct, product.idUser, product.quantity)}>-
                                                                    </button>
                                                                    <p className="my-auto mx-auto"
                                                                       style={{width: "15px"}}>{product.quantity}</p>
                                                                    <button className="btn btn-outline-secondary mx-2"
                                                                            type="button" id="incrementBtn"
                                                                            onClick={() => increase(product.idProduct, product.idUser)}>+
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <text
                                                                    className="h6">{vnd.format(product.price * product.quantity)} </text>
                                                                <br/>
                                                                <small
                                                                    className="text-muted text-nowrap"> {vnd.format(product.price)} /
                                                                    sản phẩm </small>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2 my-4">
                                                            <div className="float-md-end">
                                                                <a href="#"
                                                                   className="btn btn-light border text-danger icon-hover-danger"
                                                                   onClick={() => deleteCart(product.idProduct, product.idUser)}>X</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                );
                                            })
                                        ) : (<p>Giỏ hàng của bạn chưa có sản phẩm nào.</p>)
                                    }

                                </div>

                                <div className="border-top pt-4 mx-4 mb-4">
                                    <p><i className="fas fa-truck text-muted fa-lg"></i> Giao hàng miễn phí toàn quốc.
                                    </p>
                                    <p className="text-muted">Dựa trên kinh nghiệm 15 năm chinh chiến trong ngành làm
                                        đẹp và hợp tác với các tập đoàn mỹ phẩm nổi tiếng trên Thế giới, Makeup Artist
                                        Quách Ánh cùng những cộng sự của mình đã tạo nên thương hiệu mỹ phẩm Lemonade.
                                        Với các dòng sản phẩm đa công năng và tiện dụng được nghiên cứu dựa trên khí hậu
                                        và làn da của phụ nữ Việt, MH giúp bạn hoàn thiện vẻ đẹp một cách nhanh chóng và
                                        dễ dàng hơn: Dễ dàng sử dụng, dễ dàng kết hợp và dễ dàng mang đi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 mt-5">
                            <div className="card mb-3 border shadow-0" style={{marginTop: "50px"}}>

                            </div>
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Tổng đơn:</p>
                                        <p className="mb-2">{vnd.format(sum)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">VAT:</p>
                                        <p className="mb-2">{vnd.format(sum * 8 / 100)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Phí giao hàng:</p>
                                        <p className="mb-2">{vnd.format(0)}</p>
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Tổng tiền:</p>
                                        <p className="mb-2 fw-bold">{vnd.format(sum + sum * 8 / 100)}</p>
                                    </div>
                                    <div className="mt-3">
                                        <PayPalScriptProvider
                                            options={{"client-id": "ATJNK5Rh5M6VAYoYRo6Iq3dnQj5UGy6DThb7qpLNfV6hG3z5jOc1azM1vD_tbzgPbUpeIo9ioc50VLz1"}}
                                        >
                                            <PayPalButtons createOrder={createOrder} onApprove={onApprove}
                                                           onError={onError}/>
                                        </PayPalScriptProvider>

                                        {/*}*/}
                                        {/*<PayPalScriptProvider*/}
                                        {/*    options={{"client-id": "ATVLu4Mi0WmojMeUtCh-wTtCBb37GExzwi18B7kLRGSX9bUvnLq92Rnm02UnBCRPu_KGIgnkFOCOP94E"}}*/}
                                        {/*>*/}
                                        {/*    <PayPalButtons createOrder={createOrder} onApprove={onApprove}*/}
                                        {/*                   onError={onError}/>*/}
                                        {/*</PayPalScriptProvider>*/}
                                        <Link to="/list">
                                            <a href="#" className="btn btn-light w-100 border mt-2"> Tiếp
                                                tục mua hàng</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
