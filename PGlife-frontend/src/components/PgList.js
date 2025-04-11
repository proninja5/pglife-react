import React, { useEffect, useState } from "react";
import { getPGListings } from "../services/api";

const PgList = () => {
    const [pgList, setPgList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPGListings();
            setPgList(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>PG Listings</h2>
            <ul>
                {pgList.map((pg, index) => (
                    <li key={index}>{pg.name} - {pg.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default PgList;
