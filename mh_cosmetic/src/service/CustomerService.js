import axios from "axios";
export const getCustomer = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/customer/info?idUser=${idUser}`);
    return res;
};
export const getHistory = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/customer/history?idUser=${idUser}`);
    return res;
};
