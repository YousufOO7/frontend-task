import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import HoldListModal from "./HoldListModal";

const PriceBill = ({ skuInfo,
    vatPercentage,
    discountAmount,
    invoice,
    barcode,
    phoneNumber,
    selectedEmployee,
    setSelectedEmployee,
    discountType,
    setSkuInfo,
    setBarcode,
    setPhoneNumber,
    setInvoice,
    setDiscountAmount,
    setVatPercentage,
    setEmployees,
    employees,
    setDiscountType }) => {

    const [paymentRows, setPaymentRows] = useState([{ method: "", amount: "" }]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [showHoldModal, setShowHoldModal] = useState(false);


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
    const totalDiscount = discountAmount; // Using the global discount amount
    const totalWithOutVat = totalMRP - totalDiscount;
    const vatAmount = (vatPercentage / 100) * totalWithOutVat;
    const totalPayable = totalWithOutVat + vatAmount;
    
    // For display purposes
    const uniqueItems = new Set(skuInfo.map(item => `${item?.productName}-${item?.size}`));
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

    // Handle hold button order data
    const handleHoldOrder = () => {
        if (skuInfo.length === 0) {
            alert("No products to hold");
            return;
        }

        const heldOrders = JSON.parse(localStorage.getItem('heldOrders') || '[]');
        const newOrder = {
            id: Date.now(),
            invoice,
            barcode,
            phoneNumber,
            employee: selectedEmployee,
            discountType,
            discountAmount,
            vatPercentage,
            skuInfo,
            totalPayable,
            date: new Date().toISOString()
        };

        localStorage.setItem('heldOrders', JSON.stringify([...heldOrders, newOrder]));

        // Clear the form
        setSkuInfo([]);
        setBarcode('');
        setPhoneNumber('');
        setDiscountAmount(0);
        setVatPercentage(0);
        setEmployees([]);
        setDiscountType('');
        setSelectedEmployee('')
        setPaymentRows([{ method: "", amount: "" }]);


        // Increment invoice number
        const currentNum = parseInt(invoice.slice(-4));
        const newNum = (currentNum + 1).toString().padStart(4, '0');
        setInvoice(invoice.slice(0, -4) + newNum);
    };


    // handle Add POS
    const handleAddPOS = async () => {
        if (skuInfo.length === 0) {
            alert("Please add at least one product");
            return;
        }

        if (totalReceived < totalPayable) {
            alert("Payment amount is less than total amount");
            return;
        }

        if (!selectedEmployee?.id) {
            alert("Please select a valid employee");
            return;
        }

        try {
            const products = skuInfo.map(item => ({
                variationProductId: item.variationProductId || item.id,
                quantity: item.quantity || 1,
                unitPrice: item.sellPrice || 0,
                discount: item.discount || 0,
                subTotal: ((item.sellPrice || 0) - (item.discount || 0)) * (item.quantity || 1)
            }));

            const payments = paymentRows
                .filter(row => row.method && row.amount)
                .map(row => {
                    const account = paymentMethods.find(m => m.accountName === row.method);
                    if (!account?.id) {
                        throw new Error(`Invalid account for payment method: ${row.method}`);
                    }
                    return {
                        paymentAmount: parseFloat(row.amount),
                        accountId: account.id
                    };
                });

            const posData = {
                invoiceNo: invoice,
                salesmenId: selectedEmployee?.id || 0,
                discountType: "Fixed",
                discount: discountAmount,
                phone: phoneNumber,
                totalPrice: totalWithOutVat,
                totalPaymentAmount: totalReceived,
                changeAmount: change >= 0 ? change : 0,
                vat: vatAmount,
                products: products,
                payments: payments,
                sku: skuInfo.flatMap(item => Array(item.quantity || 1).fill(item.sku))
            };

            console.log("Submitting POS data:", JSON.stringify(posData, null, 2));

            const res = await axios.post(
                `https://front-end-task-lake.vercel.app/api/v1/sell/create-sell`,
                posData,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
                    }
                }
            );

            console.log("POS created successfully:", res.data);
            alert("POS transaction completed successfully!");

            // Clear form
            setSkuInfo([]);
            setBarcode('');
            setPhoneNumber('');
            setDiscountAmount(0);
            setVatPercentage(0);
            setDiscountType('Fixed');
            setSelectedEmployee(null);
            setPaymentRows([{ method: "", amount: "" }]);

            // Increment invoice number
            const currentNum = parseInt(invoice.slice(-4));
            const newNum = (currentNum + 1).toString().padStart(4, '0');
            setInvoice(invoice.slice(0, -4) + newNum);

        } catch (error) {
            console.error("Error creating POS:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
                alert(`Error: ${error.response.data.message || "Failed to create POS"}`);
            } else {
                alert("Network error. Please try again.");
            }
        }
    };



    return (
        <div className="mt-5">
            {/* Summary Section */}
            <div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Maximum Rating Price (MRP)</p>
                    <p><b>{totalMRP.toFixed(2)}৳</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(+) VAT/TAX</p>
                    <p><b>{vatAmount.toFixed(2)}৳</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>(-) Discount</p>
                    <p><b>{totalDiscount.toFixed(2)}৳</b></p>
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
                    <p><b>{totalPayable.toFixed(2)}৳</b></p>
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
                    <p><b>{totalPayable.toFixed(2)}৳</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Total Receive Amount</p>
                    <p><b>{totalReceived.toFixed(2)}৳</b></p>
                </div>
                <div className="flex items-center justify-between border-0 border-b">
                    <p>Change</p>
                    <p><b>{change >= 0 ? change.toFixed(2) : '0.00'}৳</b></p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-evenly mt-3">
                <button className="btn rounded-md bg-red-600 text-white">Cancel & Clear</button>
                <button
                    className="btn bg-green-900 text-white rounded-md"
                    onClick={handleAddPOS}
                >Add POS</button>
            </div>

            <div className="my-3 space-y-3">
                <div className="flex justify-between">
                    <button
                        className="btn rounded-md bg-black text-white"
                        onClick={handleHoldOrder}
                    >Hold</button>
                    <button
                        className="btn bg-red-600 text-white rounded-md"
                        onClick={() => setShowHoldModal(true)}
                    >Hold List</button>
                    <button className="btn bg-black text-white rounded-md">SMS</button>
                </div>
                <div className="flex justify-between">
                    <button className="btn rounded-md bg-primary text-white">Quotation</button>
                    <button className="btn bg-green-500 text-white rounded-md">Reattempt</button>
                    <button className="btn bg-black text-white rounded-md">Reprint</button>
                </div>
            </div>

            <HoldListModal
                show={showHoldModal}
                onClose={() => setShowHoldModal(false)}
                setSkuInfo={setSkuInfo}
                setBarcode={setBarcode}
                setPhoneNumber={setPhoneNumber}
                setInvoice={setInvoice}
                setDiscountAmount={setDiscountAmount}
                setVatPercentage={setVatPercentage}
                employees={employees}
                setSelectedEmployee={setSelectedEmployee}
                setDiscountType={setDiscountType}
            />

        </div>
    );
};

export default PriceBill;
