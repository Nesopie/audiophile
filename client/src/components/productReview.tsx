import axios from 'axios';
import React from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { store } from '..';
import { Review } from '../types';

import './_styles/productReview.css';

interface IProductReviewProps {
    username: string,
    date: Date,
    content: string,
    upvotes: number,
    upvoted: boolean | undefined;
    id: string;
    setReviews: React.Dispatch<React.SetStateAction<Array<Review>>>
}

const ProductReview = ({ username, date, content, upvotes, upvoted, id, setReviews }: IProductReviewProps) => {
    const { category, slug } = useParams();
    
    const handleUpvote = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.patch<Array<Review>>(`http://localhost:3001/api/products/${category}/${slug}`, {
            type: 'upvote',
            id,
            username: store.getState().username
        }, {
            headers: {
                authorization: `bearer ${store.getState().token}`
            }
        });

        setReviews(response.data);
    }

    const handleDownvote = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.patch<Array<Review>>(`http://localhost:3001/api/products/${category}/${slug}`, {
            type: 'downvote',
            id,
            username: store.getState().username
        }, {
            headers: {
                authorization: `bearer ${store.getState().token}`
            }
        });

        setReviews(response.data);
    }

    return (
        <div className="review">
            <div>
                <button className={`${ upvoted === true && 'disabled'}`} onClick={handleUpvote}>
                    <AiOutlinePlus />
                </button>
                <p>{upvotes}</p>
                <button className={`${upvoted === false && 'disabled'}`} onClick={handleDownvote}>
                    <AiOutlineMinus />
                </button>
            </div>
            <div>
                <div className='review-header'>
                    <div>
                        <span>{username}</span>
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <AiFillDelete />
                        <span>Delete</span>
                    </div>
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default ProductReview