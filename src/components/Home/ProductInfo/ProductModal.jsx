const ProductModal = ({ onConfirm, barcode, isGroup, sku }) => {
    const handleRemove = () => {
        onConfirm(); 
        document.getElementById('product_modal').close();
    };

    return (
        <dialog id="product_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Product Remove Confirmation</h3>
                <p className="py-4">
                    {isGroup ? (
                        <>Are you sure you want to remove this entire product group <b>{barcode}</b>?</>
                    ) : (
                        <>Are you sure you want to remove this product <b>{barcode}</b> (SKU: {sku})?</>
                    )}
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Cancel</button>
                        <button
                            type="button"
                            className="btn bg-red-500 text-white hover:bg-red-600"
                            onClick={handleRemove}
                        >
                            Remove
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ProductModal;