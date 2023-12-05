import axios from "axios";

export const getAllListProduct = async (limit, page, nameSearch, category, sort) => {
    try {
        const result = await axios.get(
            `http://localhost:8080/api/user/list?_limit=${limit}&_page=${page}&name_like=${nameSearch}&category=${category}&sort=${sort}`);
        return result;
    } catch (e) {

    }
}

export const getAllType = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/user/category");
        return result;
    } catch (e) {
    }
}

export const productDetail = async (idProduct) => {
    const result = await  axios.get(`http://localhost:8080/api/product/detail?idProduct=${idProduct}`);
    return result;
}
export const productImage = async (idProduct) => {
    const result = await  axios.get(`http://localhost:8080/api/product/image?idProduct=${idProduct}`);
    return result;
}
export const productSameType = async (idProduct) => {
    const result = await  axios.get(`http://localhost:8080/api/product/sameType?idProduct=${idProduct}`);
    return result;
}