import React from "react";
import "./_styles/productOptions.css";

interface IProductOptionsProps {
    showOverview: boolean;
    setShowOverview: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductOptions = ({
    showOverview,
    setShowOverview,
}: IProductOptionsProps) => {
    return (
        <section className="product-options">
            <span
                className={showOverview ? "selected" : ""}
                onClick={() => setShowOverview(true)}
            >
                Overview
            </span>
            <span
                className={!showOverview ? "selected" : ""}
                onClick={() => setShowOverview(false)}
            >
                Reviews
            </span>
        </section>
    );
};

export default ProductOptions;
