import { Link } from 'react-router-dom';

import rightArraw from './assets/shared/desktop/icon-arrow-right.svg';
import './_styles/categoryCard.css'

const CategoryCard = ({ imagePath, categoryName }: {imagePath: string, categoryName: string}): JSX.Element => {
    return (
        <div className="category-card">
            <div>
                <img src={imagePath} />
            </div>
            <div>
                {categoryName}
            </div>
            <Link
                to={`products/${categoryName.toLowerCase()}`}
            >
                <button >
                    <p>SHOP</p>
                    <img src={rightArraw} /> 
                </button>
            </Link>
        </div>
    )
}

export default CategoryCard;