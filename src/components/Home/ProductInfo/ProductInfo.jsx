import { RiDeleteBin6Line } from "react-icons/ri";
import ProductModal from "./ProductModal";
import { useState } from "react";

const ProductInfo = ({ skuInfo, setSkuInfo, barcode }) => {
    const [skuToRemove, setSkuToRemove] = useState('');
    const [groupToRemove, setGroupToRemove] = useState(null); // Track group to remove
    const [modalType, setModalType] = useState(''); // 'single' or 'group'

    if (!Array.isArray(skuInfo) || skuInfo.length === 0) {
        return (
            <div className="border rounded-md border-accent mt-10 p-5 text-center">
                <h2 className="text-xl font-semibold text-black">Product Information</h2>
                <p className="text-gray-500 mt-4">No product data available.</p>
            </div>
        );
    }

    // Group products by product name and size
    const groupProducts = skuInfo.reduce((acc, item) => {
        const key = `${item.productName}-${item.size}`;
        if (!acc[key]) {
            acc[key] = {
                ...item,
                singleWholePrice: parseFloat(item.sellPrice),
                MultiWholePrice: parseFloat(item.wholePrice),
                skus: [item.sku], // Store full SKU here
                shortSkus: [item.sku.slice(7, 11)], // For display only
            };
        } else {
            acc[key].singleWholePrice = parseFloat(item.sellPrice);
            acc[key].MultiWholePrice += parseFloat(item.wholePrice);
            acc[key].skus.push(item.sku); // Store full SKU
            acc[key].shortSkus.push(item.sku.slice(7, 11)); // For display
        }
        return acc;
    }, {});

    const groupArray = Object.values(groupProducts);

    const handleSkuRemove = () => {
        setSkuInfo(prev => prev.filter(item => item.sku !== skuToRemove));
        closeModal();
    };

    const handleGroupRemove = () => {
        setSkuInfo(prev => prev.filter(item => !groupToRemove.includes(item.sku)));
        closeModal();
    };

    const closeModal = () => {
        setSkuToRemove('');
        setGroupToRemove(null);
        setModalType('');
        document.getElementById('product_modal').close();
    };

    return (
        <div className="border rounded-md border-accent mt-5">
            <h2 className="text-xl font-semibold p-2 bg-gray-100 text-black">Product Information</h2>

            <div className="border-gray-200 p-3">
                {groupArray.map((item, idx) => (
                    <div key={idx} className="flex justify-between gap-10 items-center border border-gray-400 p-3 rounded-md mb-4">
                        <div>
                            <p><strong>Name: </strong>{item.productName}</p>
                            <p><strong>Size: </strong>{item.size}</p>
                            <p><strong>Color: </strong>{item.color || "Not found"}</p>
                            <p><strong>Available Stock: </strong>{item.stock}</p>
                            <p><strong>SKU: </strong>
                                <span className="space-x-2">
                                    {item.shortSkus.map((sku, i) => (
                                        <button
                                            key={i}
                                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-1 px-2 rounded"
                                            onClick={() => {
                                                setSkuToRemove(item.skus[i]);
                                                setModalType('single');
                                                document.getElementById('product_modal').showModal();
                                            }}
                                        >
                                            {sku}
                                        </button>
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
                            <button 
                                className="text-red-500 text-xl"
                                onClick={() => {
                                    setGroupToRemove(item.skus);
                                    setModalType('group');
                                    document.getElementById('product_modal').showModal();
                                }}
                            >
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <ProductModal
                sku={modalType === 'single' ? skuToRemove.slice(7, 11) : null}
                onConfirm={modalType === 'single' ? handleSkuRemove : handleGroupRemove}
                barcode={barcode}
                isGroup={modalType === 'group'}
            />
        </div>
    );
};

export default ProductInfo;