import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const loginUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-username`, appUser)
    return result;
}

export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT", jwtToken);
}

export const registerUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/register-by-customer`, appUser)
    return result;
}
export const getJwtToken = () => {
    const jwtToken = localStorage.getItem("JWT");
    console.log(jwtToken);
    if (jwtToken) {
        return jwtDecode(jwtToken)
    }
    return null;
};
export const getUser = async (sub) => {
    const res = await axios.get(`http://localhost:8080/api/user/getUser?user=${sub}`)
    return res.data;
};
