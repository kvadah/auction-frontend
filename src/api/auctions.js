import axios from "axios";

const API = "https://auction-system-django-backend.onrender.com/api/auctions/";

export const getAuctions = async () => {
   

    const response = await axios.get(API, {
       
    });

    return response.data;
};
