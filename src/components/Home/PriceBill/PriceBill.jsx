import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const PriceBill = ({ skuInfo, vatPercentage, discountAmount }) => {
    const [paymentRows, setPaymentRows] = useState([{ method: "", amount: "" }]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    //   fetch account api
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get(`https://front-end-task-lake.vercel.app/api/v1/account/get-accounts?type=All`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
                    }
                });
                if (response.data && Array.isArray(response?.data?.data)) {
                    console.log(response?.data?.data)
                    setPaymentMethods(response?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching payment methods:", error);
            }
        };

        fetchPaymentMethods();
    }, []);

    const totalMRP = skuInfo.reduce((sum, item) => sum + (item.sellPrice || 0), 0);
    //   const totalDiscount = skuInfo.reduce((sum, item) => sum + (item.discount || 0), 0);
    const totalWithOutVat = skuInfo.reduce((sum, item) => sum + (item.discountPrice || 0), 0);
    const adjustedTotal = totalWithOutVat - discountAmount;
    const validAdjustedTotal = adjustedTotal > 0 ? adjustedTotal : 0;

    const vatAmount = (vatPercentage / 100) * validAdjustedTotal;
    const totalPayable = validAdjustedTotal + vatAmount;

    const uniqueItems = new Set(skuInfo.map(item => `${item.name}-${item.size}`));
    const totalQuantity = skuInfo.length;
    const totalNumber = uniqueItems.size;

    const totalReceived = paymentRows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
    const change = totalReceived - totalPayable;

    const handleAddRow = () => {
        setPaymentRows([...paymentRows, { method: "", amount: "" }]);
    };

    const handleDeleteRow = (index) => {
        const updated = [...paymentRows];
        updated.splice(index, 1);
        setPaymentRows(updated);
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...paymentRows];
        updated[index][field] = value;
        setPaymentRows(updated);
    };

    return (
        <div>
            {/* Summary Section */}
            <div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Maximum Rating Price (MRP)</p>
                    <p><b>{totalMRP.toFixed(2)}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(+) VAT/TAX</p>
                    <p><b>{vatAmount.toFixed(2)}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(-) Discount</p>
                    <p><b>{discountAmount.toFixed(2)}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Number Of Items</p>
                    <p><b>{totalNumber}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Total Items Quantity</p>
                    <p><b>{totalQuantity}</b></p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Total Payable Amount</p>
                    <p><b>{totalPayable.toFixed(2)}</b></p>
                </div>
            </div>

            {/* Payment Rows */}
            {paymentRows.map((row, index) => (
                <div key={index} className="flex items-center justify-between gap-3 mt-3">
                    {index === 0 ? (
                        <button
                            onClick={handleAddRow}
                            className="border w-10 h-10 flex items-center justify-center rounded text-xl"
                        >
                            +
                        </button>
                    ) : (
                        <button
                            onClick={() => handleDeleteRow(index)}
                            className="border w-10 h-10 flex items-center justify-center rounded text-xl text-red-500"
                        >
                            <MdDelete />
                        </button>
                    )}

                    {/* Method */}
                    <div>
                        <fieldset className="border rounded px-2 pt-1">
                            <legend className="text-sm px-1 text-gray-500">Choose The Method ✱</legend>
                            <Select
                                value={row.method}
                                onChange={(e) => handleInputChange(index, "method", e.target.value)}
                                displayEmpty
                                className="min-w-[150px] text-sm"
                                variant="standard"
                            >
                                <MenuItem value="">Select</MenuItem>
                                {paymentMethods?.map((method) => (
                                    <MenuItem key={method.id} value={method.accountName}>
                                        {method?.accountName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </fieldset>
                    </div>

                    {/* Amount */}
                    <div>
                        <fieldset className="border rounded px-2 pt-1">
                            <legend className="text-sm px-1 text-gray-500">Enter Payment Amount ✱</legend>
                            <input
                                type="number"
                                value={row.amount}
                                placeholder="Enter amount"
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="outline-none px-1 py-1 w-32 text-sm"
                            />
                        </fieldset>
                    </div>
                </div>
            ))}

            {/* Additional Info */}
            <div className="mt-5">
                <h2 className="text-xl">Additional Information</h2>

                <div className="flex items-center justify-between border-0 border-b">
                    <p>Payable Amount</p>
                    <p><b>{totalPayable.toFixed(2)}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Total Receive Amount</p>
                    <p><b>{totalReceived.toFixed(2)}</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Change</p>
                    <p><b>{change >= 0 ? change.toFixed(2) : '0.00'}</b></p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-evenly mt-3">
                <button className="btn rounded-md bg-primary text-white">Cancel & Clear</button>
                <button className="btn rounded-md">Add POS</button>
            </div>

            <div className="my-3 space-y-3">
                <div className="flex justify-between">
                    <button className="btn rounded-md bg-primary text-white">Hold</button>
                    <button className="btn rounded-md">Hold List</button>
                    <button className="btn rounded-md">SMS</button>
                </div>
                <div className="flex justify-between">
                    <button className="btn rounded-md bg-primary text-white">Quotation</button>
                    <button className="btn rounded-md">Reattempt</button>
                    <button className="btn rounded-md">Reprint</button>
                </div>
            </div>
        </div>
    );
};

export default PriceBill;
