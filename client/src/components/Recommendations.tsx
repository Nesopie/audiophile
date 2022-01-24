import axios, { Axios, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { RecommendedProducts, Products } from '../types';
import uniqid from 'uniqid';

import Button from './button';

const getCategoryFromSlug  = (slug: string) => {
    let i;
    for(i = slug.length - 1; i >= 0; i--) {
        if(slug[i] == '-') break;
    }

    return slug.substring(i + 1, slug.length);
}

const getAllUrls = (array: Array<RecommendedProducts>) => {
    let result: any = [];
    for(let i = 0; i < array.length; i++) {
        result.push(axios.get(`${baseUrl}/${getCategoryFromSlug(array[i].slug)}/${array[i].slug}`));
    }
    return result;
}

const baseUrl = 'http://localhost:3001/api/products';

const Recommendations = ({recommendedProducts}: {recommendedProducts: Array<RecommendedProducts>}): JSX.Element => {
    const [ recommendations, setRecommendations ] = useState<Array<Products>>([]);
    const [ isLoading, setIsLoading ] = useState<Boolean>(false);

    useEffect(() => {
        setIsLoading(true);  
        axios.all(getAllUrls(recommendedProducts))
        .then((result: any) => result.map((singleResult: any) => singleResult.data[0]))
        .then(result => setRecommendations(result));

        setIsLoading(false);
    }, []);

    useEffect(() => {
    }, [recommendations]);

    return (
        <section className="recommended-products">
            <h1>YOU MAY ALSO LIKE</h1>
            <div>
                {!isLoading && recommendations.map((recommendation, index) => {
                    return (
                        <div key={uniqid()}>
                            <img src={require(`./assets/shared/mobile/image-${recommendedProducts[index].slug}.jpg`)} />
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