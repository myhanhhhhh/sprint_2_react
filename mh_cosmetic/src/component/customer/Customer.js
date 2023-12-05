import React, {useEffect, useState} from "react";
import * as userService from "../../service/UserService";
import * as customerService from "../../service/CustomerService";
import {Header} from "../header/Header";
export function Customer() {
    const [customers, setCustomers] = useState(null);
    const [histories, setHistories] = useState([]);
    const vnd = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})

    useEffect(() => {
        document.title = 'MH Cosmetic - Khach hang';
        getCustomer();
        getHistory();
    }, []);

    const getCustomer = async () => {
        try {
            const jwtToken = await userService.getJwtToken();
            const user = await userService.getUser(jwtToken.sub);
            const result = await customerService.getCustomer(user.id);
            setCustomers(result.data);
        } catch (e) {

        }
    }
    const getHistory = async () => {
        const jwtToken = await userService.getJwtToken();
        const user = await userService.getUser(jwtToken.sub);
        const res = await customerService.getHistory(user.id);
        setHistories(res.data);
    }

    return(
        <div>
            <Header/>
            <div className="pt-5 mx-auto mt-5">
                <fieldset className="form-input shadow mx-auto" style={{
                    borderRadius: "20px",
                    border: "1px solid black",
                    height: "auto",
                    width: "40%",
                    padding: "20px"
                }}>
                    <legend className="float-none w-auto px-3" style={{textAlign: "center"}}><h3>Thông tin khách
                        hàng</h3></legend>
                    <table className="info-HanhNTM">
                        <tr>
                            <td>Tên khách hàng:</td>
                            <td style={{paddingLeft: "30%", width: "70%"}}>{customers.name}</td>
                        </tr>
                        <tr>
                            <td>Giới tính:</td>
                            <td style={{paddingLeft: "30%"}}>{customers.gender ? "Nam" : "Nữ"}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại:</td>
                            <td style={{paddingLeft: "30%"}}>{customers.phone}</td>
                        </tr>
                        <tr>

                            <>
                                <td>Ngày sinh:</td>
                                <td style={{paddingLeft: "30%"}}>{new Date(customers.birthday).toLocaleDateString('en-GB')}</td>
                            </>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td style={{paddingLeft: "30%"}}>{customers.email}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td style={{paddingLeft: "30%"}}>{customers.address}</td>
                        </tr>
                    </table>
                </fieldset>
            </div>

            <div className="container mt-5">
                <div className="col-12 d-flex justify-content-center">
                    <h2 className="mb-3">Chi tiết lịch sử mua hàng</h2>
                </div>

                <div style={{minHeight: "250px"}}>
                    <table className="border border-dark table table-hover table-layout">
                        <thead>
                        <tr>
                            <th style={{ width: "10%"}}>#</th>
                            <th style={{ width: "20%"}}>Ngày mua</th>
                            <th style={{ width: "10%"}}>Giờ mua</th>
                            <th style={{ width: "30%"}}>Sản phẩm mua</th>
                            <th style={{ width: "10%"}}>Số lượng</th>
                            <th style={{ width: "20%"}}>Số tiền(vnđ/sp)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {histories.length !== 0 ? (
                            histories.map((history, index) => {
                                return (
                                    <tr>
                                        <td>{(index + 1)}</td>
                                        <td>{new Date(history.dateOfOrder).toLocaleDateString('en-GB')}</td>
                                        <td>{history.timeOfOrder}</td>
                                        <td>{history.nameProduct}</td>
                                        <td>{history.quantity}</td>
                                        <td>{vnd.format(history.priceOfOrder)}</td>
                                    </tr>
                                )
                            })) : (<tr>
                            <td colSpan={6} style={{textAlign: "center"}}>Không tìm thấy!</td>
                        </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}