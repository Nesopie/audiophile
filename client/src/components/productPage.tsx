import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../types";
import { Bars } from "react-loading-icons";

import Header from "./header";
import ProductOptions from "./productOptions";
import ProductOverview from "./productOverview";
import ProductCategory from "./productCategory";
import BestGear from "./bestGear";
import Footer from "./footer";
import "./_styles/productsPage.css";

import productService from "../services/products";
import ProductReviews from "./productReviews";

const Recommendations = React.lazy(() => import("./Recommendations"));

const ProductPage = (): JSX.Element => {
    const [product, setProduct] = useState<Products | undefined>(undefined);
    const [showOverview, setShowOverview] = useState<boolean>(true);

    const { category, slug } = useParams();
    useEffect(() => {
        window.scroll(0, 0);
        productService
            .getProductBySlug(category, slug)
            .then((result) => setProduct(result[0]));
    }, [window.location.pathname]);

    return (
        <div className="product-page-container">
            <Header category="plain" />
            <ProductOptions
                showOverview={showOverview}
                setShowOverview={setShowOverview}
            />
            {product !== undefined ? (
                showOverview ? (
                    <ProductOverview
                        imagePaths={product.image}
                        newProduct={product.new}
                        name={product.name}
                        description={product.description}
                        price={`${product.price}`}
                        features={product.features}
                        includes={product.includes}
                        gallery={product.gallery}
                    />
                ) : (
                    <ProductReviews productReviews={product.reviews} />
                )
            ) : null}
            {product !== undefined && (
                <React.Suspense
                    fallback={
                        <Bars
                            height={"5em"}
                            fill={"#d87c4a"}
                        />
                    }
                >
                    <Recommendations recommendedProducts={product.others} />
                </React.Suspense>
            )}
            <ProductCategory />
            <BestGear />
            <Footer />
        </div>
    );
};

export default ProductPage;
