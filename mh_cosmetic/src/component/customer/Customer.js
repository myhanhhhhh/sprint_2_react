import React, {useEffect, useState} from "react";
import * as userService from "../../service/UserService";
import * as customerService from "../../service/CustomerService";
import {Header} from "../header/Header";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import "./customer.css"

export function Customer() {
    const [customers, setCustomers] = useState(null);
    const [histories, setHistories] = useState([]);
    const vnd = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})

    useEffect(() => {
        document.title = 'MT Cosmetic - Khach hang';
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
    const formatDate = (timeString) => {
        const momentTime = moment(timeString, "HH:mm:ss.SSSSSS");
        const formattedTime = momentTime.format("HH:mm:ss");
        return formattedTime;
    };

    if (!customers) {
        return null;
    }

    return (
        <>
            <Header/>
            <div id="information" className="container-fluid" style={{marginTop:"8%",width:"90%"}} >
                <h2 className="sub-title"
                    style={{textAlign: "center", marginTop: "90px", fontFamily: "Nunito",}}>THÔNG TIN KHÁCH HÀNG</h2>
                <div className="row my-2" >
                    <div className="col-lg-12">
                        <div className="content">

                            <Formik
                            >
                                <Form>
                                    <div className="row" >
                                        <div className="col-lg-6 col-sm-12 box-avatar">
                                            <div className="avatar" >
                                                <img
                                                    src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
                                                    alt="Avatar User"
                                                    style={{borderRadius: "50%", width: "50%"}}/>
                                                {/*<h3> Khách hàng</h3>*/}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12">
                                            <div className="content-information">
                                                <div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">Tên nhân
                                                            viên</label>
                                                        <Field type="text" className="form-control"
                                                               value={customers.name} readonly={true}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">Giới tính</label>
                                                        <Field type="text" className="form-control"
                                                               value={customers.gender ? "Nam" : "Nữ"} readonly={true}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="birthday" className="form-label">Ngày
                                                            sinh</label>
                                                        <Field type="date" className="form-control"
                                                               value={customers.birthday}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="birthday" className="form-label">Số CCCD</label>
                                                        <Field type="date" className="form-control"
                                                               value={customers.identity}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Địa
                                                            chỉ</label>
                                                        <Field type="text" className="form-control"
                                                               value={customers.address}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Số điện
                                                            thoại</label>
                                                        <Field type="text" className="form-control"
                                                               value={customers.phone}/>

                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Địa chỉ
                                                            email</label>
                                                        <Field type="email" className="form-control"
                                                               value={customers.email}/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}