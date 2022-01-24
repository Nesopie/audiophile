import Button from "./button";
import axios from 'axios';
import './_styles/productCard.css';

const baseUrl: string = 'http://localhost:3001/api/products';

const ProductCard = ({ imagePath, newProduct, productName, productDescription, id, category, slug }: { imagePath: string, newProduct: boolean, productName: string, productDescription: string, id: string, category: string | undefined, slug: string}): JSX.Element => {
    return(
        <section className="product-card">
            <img src={`${imagePath}`}></img>
            <div>
                { newProduct ? <span> NEW PRODUCT </span> : null}
                <div>{ productName }</div>
                <p>{ productDescription }</p>
                <a href={`#/products/${category}/${slug}`}>
                    <Button 
                        buttonLabel="SEE PRODUCT"
                        buttonColor="orange"
                    />
                </a>
            </div>
        </section>
    );
}   

export default ProductCard;