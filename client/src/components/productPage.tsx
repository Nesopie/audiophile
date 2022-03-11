import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../types';
import axios from 'axios';

import Header from "./header";
import ProductOverview from './productOverview';
import Recommendations from './Recommendations';
import ProductCategory from './productCategory';
import Footer from './footer';
import './_styles/productsPage.css';
import BestGear from './bestGear';

import productService from '../services/products';

const ProductPage = (): JSX.Element => {
    const [ product, setProduct ] = useState<Products | undefined>(undefined)

    const { category, slug } = useParams();
    useEffect(() => {
        window.scroll(0,0);
        productService.getProductBySlug(category, slug)
        .then(result => setProduct(result[0]));
    }, []);

    return(
        <div className="product-page-container">
            <Header category="plain" />
            {product !== undefined
            && <ProductOverview 
                imagePaths={product.image}
                newProduct={product.new}
                name={product.name}
                description={product.description}
                price={`${product.price}`}
                features={product.features}
                includes={product.includes}
                gallery={product.gallery}
            />}
            {product !== undefined
            && <Recommendations 
                recommendedProducts={product.others}
            />
            }
            <ProductCategory />
            <BestGear />
            <Footer />
        </div>
    );
}

export default ProductPage;