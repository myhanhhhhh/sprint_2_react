import React from "react";
import './about_us.css';
import {Header} from "../header/Header";

export function Introduce() {
    return (
        <div>
            <Header/>
            <div className="about-hanh">
                <img src="/image/IMG_0723.JPG"/>
            </div>
            <div>
                <p style={{textAlign: "center",marginTop: "30px"}}>MH RA ĐỜI</p>
                <p className="about-hanh-2">
                    MH ra đời là thương hiệu mỹ phẩm Việt Nam, được thành lập vào năm 2018 bởi Makeup Artist Quách Ánh
                    với mục
                    tiêu mang đến giải pháp trang điểm dễ dàng cho phụ nữ Việt.
                    Vào thời điểm 2018, khi là 1 MUA chuyên nghiệp Quách Ánh có cơ hội được tiếp xúc với rất nhiều
                    người,
                    trang điểm cho rất nhiều khuôn mặt khác nhau và chị nhận ra rằng: Phụ nữ Việt Nam chúng mình rất
                    đẹp.
                </p>
                <p className="about-hanh-2">
                    Điều này còn được công nhận qua nhiều cuộc thi hoa hậu quốc tế, các thí sinh đến từ Việt Nam đã
                    đạt được
                    nhiều ngôi vị cao, chứng tỏ là nét đẹp riêng này đã được thế giới công nhận.

                    Vậy nhưng hình như đa phần phụ nữ Việt Nam vẫn chưa nhận thấy được điều đó. Khi trang điểm cho
                    các cô gái,
                    MUA Quách Ánh nhận thấy nhiều bạn dù nét rất đẹp rồi nhưng không biết mình đẹp, thậm chí còn có
                    phần tự ti
                    nữa. Ngoài ra thì mỗi khi khen 1 bạn nữ nào xinh, thường mọi người sẽ gắn ngay với 1 tiêu chuẩn
                    của nước
                    ngoài. Ví dụ như trông nét Tây thế hoặc trông như Hàn Quốc ghê.
                </p>
                <div className="hanh-1" style={{backgroundColor: "#f9f9f9", height: "1000px", marginTop: "30px"}}>
                    <div style={{padding: "30px",textAlign:"center"}}>
                        <b>$[MH COSMETIC]</b>
                    </div>
                    <img style={{padding: "10px"}} src="/image/img_11.jpeg"/>
                </div>
                <div style={{marginTop: "40px"}}>
                    <img src="/image/img_12.jpeg" style={{width: "15%",height: "560px"}}/>
                        <img src="/image/img_13.jpeg" style={{width: "24%",height: "500px",marginLeft: "20px"}}/>
                        <img src="/image/img_14.jpeg" style={{width:"21%",height: "560px",marginLeft: "20px"}}/>
                        <img src="/image/img_15.jpeg" style={{width:"21%",height: "500px",marginLeft: "20px"}}/>
                        <img src="/image/img_17.jpeg" style={{width:"13%",height: "500px",marginLeft: "20px"}}/>
                </div>
                <div>
                    <p style={{marginTop: "70px",textAlign:"center"}}>[SẢN PHẨM CỦA MH]</p>
                </div>
                <div className="hanh-2">
                    <img src="/image/imh_19.jpeg"/>
                </div>

            </div>
        </div>
)

}