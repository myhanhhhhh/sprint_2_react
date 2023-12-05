import * as userService from "../../service/UserService";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "../header/Header";
import "./login.css"
export function Login() {
    const [form, setForm] = useState({userName: "", password: ""});
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const result = await userService.loginUser(form);
            userService.addJwtTokenToLocalStorage(result.data.jwtToken);
            const {userName, password} = form;
            setForm({userName: "", password: ""});
            toast.success("dang nhap thanh cong");
            navigate("/");
        } catch (error) {
            toast.error("Thong tin khong chinh xac");
            navigate("/login");
        }
    }

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }
    return (
        <div>
            <Header/>
            <form onSubmit={handleSave}>
                <div className="vid-container" style={{backgroundColor:"#ebeae8"}}>
                    {/*<img src="/image/IMG_0746.JPG" />*/}
                    <div className="inner-container">
                        <div className="box">
                            <h1>ĐĂNG NHẬP</h1>
                            <input type="text" name="userName" value={form.userName} onChange={handleChange} placeholder="Tên đăng nhập"/>
                            <input type="password" name="pass" value={form.password} onChange={handleChange} placeholder="Mật khẩu"/>
                            <button type="submit">Đăng nhập</button>
                            <p>Quên mật khẩu? <span className="signup">Đăng kí.</span></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}