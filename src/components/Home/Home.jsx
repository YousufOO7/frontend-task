import CustomerInfo from "./CustomerInfo/CustomerInfo";
import ProductCustomerNavigation from "./ProductCustomerNavigation/ProductCustomerNavigation";


const Home = () => {
    return (
        <div className="max-w-1440px pt-5 px-3">
            <div>
                <ProductCustomerNavigation />
            </div>
        </div>
    );
};

export default Home;