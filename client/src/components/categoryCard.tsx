import rightArraw from './assets/shared/desktop/icon-arrow-right.svg';
import './_styles/categoryCard.css'

import axios from 'axios';

const baseUrl: string = 'http://localhost:3001/api/products';

const CategoryCard = ({ imagePath, categoryName }: {imagePath: string, categoryName: string}): JSX.Element => {
    const handleClick = (event: React.MouseEvent) => {
        axios.get(`${baseUrl}/${categoryName.toLowerCase()}`)
            .then((products) => {
                console.log(products.data);
        })
    }

    return (
        <div className="category-card">
            <div>
                <img src={imagePath} />
            </div>
            <div>
                {categoryName}
            </div>
            <button onClick={handleClick}>
                <p>SHOP</p>
                <img src={rightArraw} /> 
            </button>
        </div>
    )
}

export default CategoryCard;