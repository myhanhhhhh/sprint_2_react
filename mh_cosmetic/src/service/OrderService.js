import axios from "axios";
export const createOrder = async (idUser) => {
    const res = await axios.post(`http://localhost:8080/api/order/payment?idUser=${idUser}`);
    return res;
};
