import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import uniqid from 'uniqid';

import Button from './button';
import { RecommendedProducts, Products } from '../types';
import './_styles/Recommendations.css';
import productService from '../services/products';

import helper from '../utils/helper';

const Recommendations = ({ recommendedProducts }: { recommendedProducts: Array<RecommendedProducts> }): JSX.Element => {
    const [ recommendations, setRecommendations ] = useState<Array<Products>>([]);
    const [ isLoading, setIsLoading ] = useState<Boolean>(false);
    const   isMobile = useMediaQuery({ maxWidth: 480 });
    const   isTablet = useMediaQuery({ maxWidth: 824 });

    useEffect(() => {
        setIsLoading(true);  
        const getRecommendedProducts = async() => {
            const response = await productService.getRecommendedProducts(recommendedProducts);
            setRecommendations(response);
        }

        getRecommendedProducts();

        setIsLoading(false);
    }, []);

    return (
        <section className="recommended-products">
            <h1>YOU MAY ALSO LIKE</h1>
            <div>
                {!isLoading && recommendations.map((_recommendation, index) => {
                    return (
                        <div key={uniqid()}>
                            <img src={require(`./assets/shared/${ isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop' }/image-${recommendedProducts[index].slug}.jpg`)} />
                            <h3>{recommendedProducts[index].name}</h3>
                            <Button 
                                buttonLabel='SEE PRODUCT'
                                buttonColor='orange'
                            />
                        </div>
                    )
                })} 
            </div>
        </section>
    );
}

export default Recommendations;