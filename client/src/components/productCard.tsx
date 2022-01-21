const ProductCard = ({ imagePath, newProduct, productName, productDescription }: { imagePath: string, newProduct: boolean, productName: string, productDescription: string }): JSX.Element => {
    return(
        <section className="product-card">
            <img src={`${imagePath}`}></img>
            <div>
                { newProduct ? <div> NEW PRODUCT </div> : null}
                <div></div>
            </div>
        </section>
    );
}   

export default ProductCard;