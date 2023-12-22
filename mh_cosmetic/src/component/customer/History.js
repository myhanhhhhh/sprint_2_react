import React, {useEffect, useState} from "react";
import * as userService from "../../service/UserService";
import * as customerService from "../../service/CustomerService";
import {Header} from "../header/Header";
import moment from "moment";

export function History() {
    const [customers, setCustomers] = useState(null);
    const [histories, setHistories] = useState([]);
    const vnd = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})

    useEffect(() => {
        document.title = 'MH Cosmetic - Khach hang';
        // getCustomer();
        getHistory();
    }, []);

    const formatDate = (input) => {
        const formattedTime = moment(input, "HH:mm:ss.SSSSSS").format("HH:mm:ss");
        return formattedTime;
    };

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
        console.log(res.data)
        setHistories(res.data);
    }

    return (
        <div>
            <Header/>
            <div className="container mt-5">
                <div className="col-12 d-flex justify-content-center">
                    <h2 className="sub-title"
                        style={{textAlign: "center", marginTop: "90px", fontFamily: "Nunito",}}> LỊCH SỬ MUA HÀNG</h2>
                </div>
                {histories.length !== 0 ? (
                    <div style={{minHeight: "250px"}}>
                        <table className="border border-dark table table-hover table-layout">
                            <thead>
                            <tr>
                                <th style={{width: "10%"}}>#</th>
                                <th style={{width: "15%"}}>Ngày mua</th>
                                <th style={{width: "10%"}}>Giờ mua</th>
                                <th style={{width: "35%"}}>Sản phẩm mua</th>
                                <th style={{width: "10%"}}>Số lượng</th>
                                <th style={{width: "20%"}}>Số tiền(vnđ/sp)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {histories.map((history, index) => (
                                <tr key={index}>
                                    <td>{(index + 1)}</td>
                                    <td>{new Date(history.dateOfOrder).toLocaleDateString('en-GB')}</td>
                                    <td>{history && formatDate(history.timeOfOrder)}</td>
                                    <td>{history.nameProduct}</td>
                                    <td>{history.quantityOrder}</td>
                                    <td>{vnd.format(history.priceOfOrder)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="col-12 d-flex justify-content-center mt-5">
                        <h4 style={{fontStyle:"italic"}}>Bạn vẫn chưa có lịch sử mua hàng nào ^^</h4>
                    </div>
                )}
            </div>
        </div>

    )

}