import axios from "axios";

const API = "http://127.0.0.1:8000/api/auctions/";

export const getAuctions = async () => {
    const token = localStorage.getItem("access");

    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
