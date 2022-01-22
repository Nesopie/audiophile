import Button from "./button";
import axios from 'axios';

const baseUrl: string = 'http://localhost:3001/api/products';

const ProductCard = ({ imagePath, newProduct, productName, productDescription, id, category }: { imagePath: string, newProduct: boolean, productName: string, productDescription: string, id: string, category: string | undefined}): JSX.Element => {
    const handleClick = ()  => {
        axios.get(`${baseUrl}/${category}/${id}`)
            .then(response => response.data)
            .then(results => console.log(results));
    }
    return(
        <section className="product-card" id={id}>
            <img src={`${imagePath}`}></img>
            <div>
                { newProduct ? <span> NEW PRODUCT </span> : null}
                <div>{ productName }</div>
                <p>{ productDescription }</p>
                <Button 
                    buttonLabel="SEE PRODUCT"
                    buttonColor="orange"
                    handleClick={handleClick}
                />
            </div>
        </section>
    );
}   

export default ProductCard;