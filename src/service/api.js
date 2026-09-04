import axios from "axios";

export const api = axios.create({
    baseURL: "https://loan-partners.onrender.com/api/v2",
    headers:{
        "Content-Type":"application/json"
    }
}
);