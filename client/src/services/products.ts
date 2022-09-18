import axios, { AxiosResponse } from "axios";
import { Products, RecommendedProducts } from "../types";
import helper from "../utils/helper";

// const baseUrl: string = 'http://localhost:3001/api/products';
// const baseUrl = `${window.location.origin}/api/products`
const baseUrl = "http://localhost:3001/api/products";

const getProductsByCategory = async (category: string | undefined) => {
    const response = await axios.get(`${baseUrl}/${category}`);
    return response.data;
};

const getProductBySlug = async (
    category: string | undefined,
    slug: string | undefined
) => {
    const response = await axios.get(`${baseUrl}/${category}/${slug}`);
    return response.data;
};

const getAllUrlPromises = (
    array: Array<RecommendedProducts>
): Array<Promise<AxiosResponse>> => {
    let result: Array<Promise<AxiosResponse>> = [];
    for (let i = 0; i < array.length; i++) {
        result.push(
            axios.get(
                `${baseUrl}/${helper.getCategoryFromSlug(array[i].slug)}/${
                    array[i].slug
                }`
            )
        );
    }
    return result;
};

const getRecommendedProducts = async (
    recommendedProducts: Array<RecommendedProducts>
): Promise<Array<Products>> => {
    const response = await axios.all<AxiosResponse>(
        getAllUrlPromises(recommendedProducts)
    );
    return response.map(
        (singleResponse: AxiosResponse) => singleResponse.data[0]
    );
};

const productService = {
    getProductsByCategory,
    getProductBySlug,
    getRecommendedProducts,
};

export default productService;
