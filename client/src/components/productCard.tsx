import Button from "./button";
import './_styles/productCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ imagePath, newProduct, productName, productDescription, id, category, slug }: { imagePath: string, newProduct: boolean, productName: string, productDescription: string, id: string, category: string | undefined, slug: string}): JSX.Element => {
    return(
        <section className="product-card">
            <img src={`${imagePath}`}></img>
            <div>
                { newProduct ? <span> NEW PRODUCT </span> : null}
                <div>{ productName }</div>
                <p>{ productDescription }</p>
                <Link
                    to={`${slug}`}
                >
                    <Button 
                        buttonLabel="SEE PRODUCT"
                        buttonColor="orange"
                    />
                </Link>
            </div>
        </section>
    );
}   

export default ProductCard;