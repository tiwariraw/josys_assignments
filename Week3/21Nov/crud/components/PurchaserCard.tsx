import React from "react";
import "./PurchaserCard.css";

interface PurchaserCardProps {
    name: string;
    city: string;
    photo: string;
}

const PurchaserCard: React.FC<PurchaserCardProps> = ({ name, city, photo }) => {
    return (
        <div className="purchaser-card">
            <img
                src={photo}
                alt={`${name}'s photo`}
                className="purchaser-photo"
            />
            <div className="purchaser-details">
                <h3 className="purchaser-name">{name}</h3>
                <p className="purchaser-city">City: {city}</p>
            </div>
        </div>
    );
};

export default PurchaserCard;
