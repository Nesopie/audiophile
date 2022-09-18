import { Link } from "react-router-dom";
import facebookIcon from "./assets/shared/desktop/icon-facebook.svg";
import twitterIcon from "./assets/shared/desktop/icon-twitter.svg";
import instagramIcon from "./assets/shared/desktop/icon-instagram.svg";

import "./_styles/footer.css";

const Footer = (): JSX.Element => {
    return (
        <footer>
            <div className="footer-decoration"></div>
            <div>
                <h3>audiophile</h3>
                <div className="links-container">
                    <Link to="/">HOME</Link>
                    <Link to="/products/headphones">HEADPHONES</Link>
                    <Link to="/products/speakers">SPEAKERS</Link>
                    <Link to="/products/earphones">EARPHONES</Link>
                </div>
            </div>
            <div>
                <div className="footer-text">
                    <div>
                        <p>
                            Audiophile is an all in one stop to fulfill your
                            audio needs. We're a small team of music lovers and
                            sound specialists who are devoted to helping you get
                            the most out of personal audio. Come and visit our
                            demo facility - we're open 7 days a week.
                        </p>
                        <p>Copyright 2021. All Rights Reserved</p>
                    </div>
                    <div className="socials">
                        <img src={facebookIcon} />
                        <img src={twitterIcon} />
                        <img src={instagramIcon} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
