import CategoryCard from "./categoryCard";
import headphones from "./assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.png";
import speakers from "./assets/product-zx9-speaker/mobile/image-category-page-preview.png";
import earphones from "./assets/product-yx1-earphones/mobile/image-category-page-preview.png";
import "./_styles/productCategory.css";

const ProductCategory = (): JSX.Element => {
    return (
        <section className="product-category">
            <CategoryCard
                imagePath={headphones}
                categoryName="HEADPHONES"
            />
            <CategoryCard
                imagePath={speakers}
                categoryName="SPEAKERS"
            />
            <CategoryCard
                imagePath={earphones}
                categoryName="EARPHONES"
            />
        </section>
    );
};

export default ProductCategory;
