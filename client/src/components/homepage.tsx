import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './_styles/homepage.css';
import Header from './header';
import Carousel from './carousel';
import ProductCategory from './productCategory';
import ProductDisplay from './productDisplay';
import BestGear from './bestGear';

import Footer from './footer';
import helper from '../utils/helper';

const Homepage = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        // if(store.getState().username !== "") {
        //     return;
        // }
        // let user = localStorage.getItem("user");
        // if(!user) return;
        // user = JSON.parse(user);
        // console.log(user);
        // if(typeGuard.isUser(user)) {
        //     dispatch({ type: 'SET_USER_LS', 
        //         user: {
        //             username: user.username, 
        //             token: user.token,
        //             cart: user.cart
        //         }
        //     });
        // }
        helper.useUser();
    }, []);

    return (
        <div style={{position: "relative"}}>
            <Header category={undefined}/>
            <Carousel />
            <div className="homepage">
                <ProductCategory />
                <ProductDisplay />
                <BestGear />
                <Footer />
            </div>
        </div>
    );
}

export default Homepage;