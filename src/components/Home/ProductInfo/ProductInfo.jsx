import { RiDeleteBin6Line } from "react-icons/ri";

const ProductInfo = () => {
    return (
        <div className="border rounded-md border-accent mt-10">
            <div>
                <h2 className="text-xl font-semibold p-2 bg-gray-100 text-black">Product Information</h2>
            </div>

            <div className="border-gray-200 p-3">
                <div className="flex justify-between gap-10 items-center border border-gray-400 p-3 rounded-md">
                    {/* info */}
                    <div>
                        <p><strong>Name</strong> SL</p>
                        <p><strong>Size</strong> SL</p>
                        <p><strong>Color</strong> SL</p>
                        <p><strong>Available Stock</strong> SL</p>
                        <p><strong>SKU</strong> SL</p>
                    </div>

                    {/* input & price */}
                    <div className="flex items-center  gap-5">
                        <div>
                            <input type="text" placeholder="Type here" className="input" />
                        </div>

                        <div>
                            <p><b>Subtotal</b></p>
                            <p><b>700.00</b></p>
                        </div>

                    </div>

                    {/* delete btn */}
                    <div>
                        <button className="text-red-500 text-xl">
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;