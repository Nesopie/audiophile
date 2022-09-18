import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import uniqid from "uniqid";
import Button from "./button";
import { RecommendedProducts, Products } from "../types";
import "./_styles/Recommendations.css";
import productService from "../services/products";
import helper from "../utils/helper";
import { Link } from "react-router-dom";

const Recommendations = ({
    recommendedProducts,
}: {
    recommendedProducts: Array<RecommendedProducts>;
}): JSX.Element => {
    const [recommendations, setRecommendations] = useState<Array<Products>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });

    useEffect(() => {
        setIsLoading(true);
        const getRecommendedProducts = async () => {
            const response = await productService.getRecommendedProducts(
                recommendedProducts
            );
            setRecommendations(response);
        };

        getRecommendedProducts();

        setIsLoading(false);
    }, []);

    return (
        <section className="recommended-products">
            <h1>YOU MAY ALSO LIKE</h1>
            <div>
                {!isLoading &&
                    recommendations.map((recommendation, index) => {
                        return (
                            <div key={uniqid()}>
                                <img
                                    src={require(`./assets/shared/${
                                        isMobile
                                            ? "mobile"
                                            : isTablet
                                            ? "tablet"
                                            : "desktop"
                                    }/image-${
                                        recommendedProducts[index].slug
                                    }.jpg`)}
                                />
                                <h3>{recommendedProducts[index].name}</h3>
                                <Link
                                    to={`/products/${helper.getCategoryFromSlug(
                                        recommendation.slug
                                    )}/${recommendation.slug}`}
                                    onClick={() =>
                                        (window.location.href = `/products/${helper.getCategoryFromSlug(
                                            recommendation.slug
                                        )}/${recommendation.slug}`)
                                    }
                                >
                                    <Button
                                        buttonLabel="SEE PRODUCT"
                                        buttonColor="orange"
                                    />
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default Recommendations;
