import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../types";
import axios from 'axios';

import Header from "./header";
import ProductCard from "./productCard";
import ProductCategory from "./productCategory";
import BestGear from "./bestGear";
import './_styles/productsPage.css';
import Footer from "./footer";

const baseUrl: string = 'http://localhost:3001/api/products';

const ProductPage = (): JSX.Element => {
    const [ products, setProducts ] = useState<Array<Products>>([]);
    const [ loading, setLoading ] = useState<Boolean>(true);

    const { category } = useParams();
    useEffect(() => {
        axios.get(`${baseUrl}/${category}`)
            .then(response =>  response.data )
            .then(result => { 
                setProducts(result); 
                setLoading(false);
            });
    }, [])
    return (
        <div className="product-page-container">
            <Header category={category}/>
            <section className="product-container">
                {!loading && products.map((product) => {
                    return (
                        <ProductCard 
                            key={product._id}
                            id={`${product._id}`}
                            imagePath={require(`${product.image.mobile}`)}
                            newProduct={product.new}
                            productName={product.name}
                            productDescription={product.description}
                            category={category}
                        />
                    );
                })}
            </section>
            <ProductCategory />
            <BestGear />
            <Footer />
        </div>
    );
}

export default ProductPage;