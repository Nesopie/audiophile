import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { store } from "..";
import { Review } from "../types";
import ProductReview from "./productReview";
import "./_styles/productReviews.css";

export interface IIProductReviewProps {
    productReviews: Array<Review>;
}

const ProductReviews = ({ productReviews }: IIProductReviewProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useState<string>("");
    const [reviews, setReviews] = useState<Array<Review>>(productReviews);
    const { category, slug } = useParams();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const review = {
            username: store.getState().username,
            date: new Date(),
            content: textareaRef?.current?.value,
            upvotes: 1,
            upvotedBy: [store.getState().username],
            downvotedBy: [],
        };

        try {
            const response = await axios.post<Array<Review>>(
                `http://localhost:3001/api/products/${category}/${slug}`,
                { review },
                {
                    headers: {
                        authorization: `bearer ${store.getState().token}`,
                    },
                }
            );
            setReviews(response.data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                // @TODO show toaster
            }
        }

        setContent("");
    };

    return (
        <div className="product-reviews">
            {reviews
                .sort((first, second) =>
                    first.upvotedBy.length - first.downvotedBy.length >
                    second.upvotedBy.length - second.downvotedBy.length
                        ? -1
                        : 11
                )
                .map((review) => {
                    let upvoted: boolean | undefined = undefined; //upvote -> true, downvote -> false, no interaction -> undefined
                    review.upvotedBy.forEach((user) => {
                        if (user.username === store.getState().username)
                            upvoted = true;
                    });

                    review.downvotedBy.forEach((user) => {
                        if (user.username === store.getState().username)
                            upvoted = false;
                    });

                    const upvotes =
                        review.upvotedBy.length - review.downvotedBy.length;

                    return (
                        <ProductReview
                            key={review._id}
                            username={review.username}
                            date={review.date}
                            content={review.content}
                            upvotes={upvotes}
                            upvoted={upvoted}
                            id={review._id}
                            setReviews={setReviews}
                        />
                    );
                })}
            <div className="add-review">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className="add-button"
                    onClick={handleClick}
                >
                    SEND
                </button>
            </div>
        </div>
    );
};

export default ProductReviews;
