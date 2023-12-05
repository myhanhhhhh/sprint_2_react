import axios from "axios";

export const getAllCart = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/api/cart/listCart?idUser=${idUser}`);
    return res;
};


export const addToCart = async (idProduct, idUser, quantity) => {
    const res = await axios.post(`http://localhost:8080/api/cart/addToCart?idProduct=${idProduct}&idUser=${idUser}&quantity=${quantity}`);
    return res;
};

export const deleteCart = async (idUser, idProduct) => {
    const res = await axios.delete(`http://localhost:8080/api/cart/delete?idUser=${idUser}&idProduct=${idProduct}`);
    return res;
};

export const increaseQuantity = async (idUser, idProduct) => {
    const res = await axios.post(`http://localhost:8080/api/cart/increase?idUser=${idUser}&idProduct=${idProduct}`);
    console.log(res)
    return res;
};
export const decreaseQuantity = async (idUser, idProduct) => {
    const res = await axios.post(`http://localhost:8080/api/cart/decrease?idUser=${idUser}&idProduct=${idProduct}`);
    console.log(res)
    return res;
};