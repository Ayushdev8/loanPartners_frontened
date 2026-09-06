import axios from "axios";

export const api = axios.create({
    baseURL: "https://loan-partners.onrender.com/api/v2",
    headers:{
        "Content-Type":"application/json"
    }
}
);

export const api2 = axios.create({
    baseURL: "https://samarthai-aosz.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }
}
);