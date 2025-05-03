import PriceBill from "../PriceBill/PriceBill";


const CustomerInfo = () => {
    return (
        <div>
            <div className="border rounded-md border-accent">
                <div>
                    <h2 className="text-xl font-semibold p-2 bg-gray-100 text-black">Customer's Information</h2>
                </div>

                <div className="py-5 px-2 space-y-3">
                    <div className="flex justify-between gap-4">
                        <div className="border rounded px-2 py-1 flex items-center gap-2 bg-white w-full">
                            <span className="bg-gray-100 px-2 py-0.5 font-bold text-sm rounded">Name</span>
                            <span className="text-gray-500 text-sm">N/A</span>
                        </div>
                        {/*  */}
                        <div className="border rounded px-2 py-1 flex items-center gap-2 bg-white w-full">
                            <span className="bg-gray-100 px-2 py-0.5 font-bold text-sm rounded">Name</span>
                            <span className="text-gray-500 text-sm">N/A</span>
                        </div>
                    </div>

                    {/*  */}
                    <div className="flex justify-between gap-4">
                        <div className="border rounded px-2 py-1 flex items-center gap-2 bg-white w-full">
                            <span className="bg-gray-100 px-2 py-0.5 font-bold text-sm rounded">Name</span>
                            <span className="text-gray-500 text-sm">N/A</span>
                        </div>
                        {/*  */}
                        <div className="border rounded px-2 py-1 flex items-center gap-2 bg-white w-full">
                            <span className="bg-gray-100 px-2 py-0.5 font-bold text-sm rounded">Name</span>
                            <span className="text-gray-500 text-sm">N/A</span>
                        </div>
                    </div>
                </div>

            </div>
            <PriceBill />
        </div>
    );
};

export default CustomerInfo;