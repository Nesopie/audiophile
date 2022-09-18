import LoginForm from "./loginform";
import "./_styles/loginPage.css";

const LoginPage = () => {
    return (
        <div className="login-container">
            <div></div>
            <section className="form-container">
                <LoginForm />
            </section>
        </div>
    );
};

export default LoginPage;
