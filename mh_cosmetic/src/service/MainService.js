import axios from "axios";
export const getListProduct = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/user/main");
        return result;
        console.log(result.data + "-------------")
    }catch (e) {
        alert(e);
    }
}