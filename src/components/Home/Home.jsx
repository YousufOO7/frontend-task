import CustomerInfo from "./CustomerInfo/CustomerInfo";
import ProductCustomerNavigation from "./ProductCustomerNavigation/ProductCustomerNavigation";
import ProductInfo from "./ProductInfo/ProductInfo";


const Home = () => {
    return (
        <div className="max-w-1440px grid grid-cols-3 gap-5 pt-5 px-3">
            <div className="col-span-2">
                <ProductCustomerNavigation />
                <ProductInfo />
            </div>

            {/*  */}
            <div className="col-span-1">
                <CustomerInfo />
            </div>
        </div>
    );
};

export default Home;