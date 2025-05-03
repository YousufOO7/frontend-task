import { useState } from "react";
import { MenuItem, Select } from '@mui/material';
import { MdDelete } from 'react-icons/md';

const PriceBill = () => {

    const [paymentRows, setPaymentRows] = useState([
        { method: '', amount: '' },
    ]);

    const handleAddRow = () => {
        setPaymentRows([...paymentRows, { method: '', amount: '' }]);
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
        <div className="mt-10">
            <div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Maximum Rating Price (MRP)</p>
                    <p><b>4000.00</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(+) VAT/TAX</p>
                    <p><b>0.00</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(-) Discount</p>
                    <p><b>0.00</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Number Of Items</p>
                    <p><b>0</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Total Items Quantity</p>
                    <p><b>0</b></p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Total Payable Amount</p>
                    <p><b>4000.00</b></p>
                </div>
            </div>

            {/* input for detail */}
            {/* Dynamic input rows */}
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
                            <legend className="text-sm px-1 text-gray-500">Choose The Method</legend>
                            <Select
                                value={row.method}
                                onChange={(e) => handleInputChange(index, 'method', e.target.value)}
                                displayEmpty
                                className="min-w-[150px] text-sm"
                                variant="standard"
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Islami bank">Islami bank</MenuItem>
                                <MenuItem value="bKash">bKash</MenuItem>
                                <MenuItem value="Nagad">Nagad</MenuItem>
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
                                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                className="outline-none px-1 py-1 w-32 text-sm"
                            />
                        </fieldset>
                    </div>
                </div>
            ))}


            {/* additional info */}
            <div className="mt-5">
                <h2 className="text-xl">Additional Information</h2>

                <div className="flex items-center justify-between border-0 border-b">
                    <p>Payable Amount</p>
                    <p><b>4000.00</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Total Receive Amount</p>
                    <p><b>5000.00</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Change</p>
                    <p><b>1000.00</b></p>
                </div>
            </div>

            {/* btn section */}
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