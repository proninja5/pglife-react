import axios from "axios";

// Backend API ka base URL
const API_BASE_URL = "http://localhost/pglife/api"; 

export const getPGListings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get_pg_listings.php`);
        return response.data;
    } catch (error) {
        console.error("Error fetching PG Listings", error);
        return [];
    }
};
