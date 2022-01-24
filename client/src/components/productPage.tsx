import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../types';
import axios from 'axios';

import Header from "./header";
import ProductOverview from './productOverview';
import Recommendations from './Recommendations';
import ProductCategory from './productCategory';
import Footer from './footer';

const baseUrl: string = 'http://localhost:3001/api/products';

const ProductPage = (): JSX.Element => {
    const [ product, setProduct ] = useState<Products | undefined>(undefined)

    const { category, slug } = useParams();
    useEffect(() => {
        axios.get(`${baseUrl}/${category}/${slug}`)
            .then(response => response.data)
            .then(result => setProduct(result[0]));
    }, []);

    return(
    <div>
        <Header category="plain" />
        {product !== undefined
        && <ProductOverview 
            imagePaths={product.categoryImage}
            newProduct={product.new}
            name={product.name}
            description={product.description}
            price={`${product.price}`}
            features={product.features}
            includes={product.includes}
            gallery={[product.gallery.first.mobile, product.gallery.second?.mobile, product.gallery.third?.mobile]}
        />}
        {product !== undefined
        && <Recommendations 
            recommendedProducts={product.others}
        />
        }
        <ProductCategory />
        <Footer />
    </div>
    );
}

export default ProductPage;