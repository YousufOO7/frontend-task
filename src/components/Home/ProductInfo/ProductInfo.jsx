import { RiDeleteBin6Line } from "react-icons/ri";

const ProductInfo = ({ skuInfo }) => {
    console.log(skuInfo);

    if (!Array.isArray(skuInfo) || skuInfo.length === 0) {
        return (
            <div className="border rounded-md border-accent mt-10 p-5 text-center">
                <h2 className="text-xl font-semibold text-black">Product Information</h2>
                <p className="text-gray-500 mt-4">No product data available.</p>
            </div>
        );
    }

    const groupProducts = skuInfo.reduce((acc, item) => {
        const key = `${item.productName}-${item.size}`;
        if (!acc[key]) {
            acc[key] = {
                ...item,
                singleWholePrice: parseFloat(item.wholePrice),
                MultiWholePrice: parseFloat(item.wholePrice),
                skus: [item.sku.slice(7, 11)],
            };
        } else {
            acc[key].singleWholePrice = parseFloat(item.wholePrice);
            acc[key].MultiWholePrice += parseFloat(item.wholePrice);
            acc[key].skus.push(item.sku.slice(7, 11));
        }
        return acc;
    }, {});

    const groupArray = Object.values(groupProducts);

    return (
        <div className="border rounded-md border-accent mt-5">
            <h2 className="text-xl font-semibold p-2 bg-gray-100 text-black">Product Information</h2>

            <div className="border-gray-200 p-3">
                {
                    groupArray.map((item, idx) => (
                        <div key={idx} className="flex justify-between gap-10 items-center border border-gray-400 p-3 rounded-md mb-4">
                            <div>
                                <p><strong>Name: </strong>{item.productName}</p>
                                <p><strong>Size: </strong>{item.size}</p>
                                <p><strong>Color: </strong>{item.color || "N/A"}</p>
                                <p><strong>Available Stock: </strong>{item.stock}</p>
                                <p><strong>SKU: </strong>
                                    <span className="space-x-2">
                                        {item.skus.map((sku, i) => (
                                            <span key={i}>{sku}</span>
                                        ))}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="border rounded px-28 py-1 bg-white w-full">
                                    <p>TK. {item.singleWholePrice}</p>
                                </div>

                                <div>
                                    <p><b>Subtotal</b></p>
                                    <p><b>{item.MultiWholePrice}.00</b></p>
                                </div>
                            </div>

                            <div>
                                <button className="text-red-500 text-xl">
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductInfo;
