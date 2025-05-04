import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

const HoldListModal = ({ 
    show, 
    onClose, 
    setSkuInfo, 
    setBarcode, 
    setPhoneNumber,
    setInvoice,
    setDiscountAmount,
    setVatPercentage,
    setSelectedEmployee,
    employees,
    setDiscountType  }) => {
        const [heldOrders, setHeldOrders] = useState([]);

        useEffect(() => {
            const orders = JSON.parse(localStorage.getItem('heldOrders') || '[]');
            setHeldOrders(orders);
        }, [show]);

    const handleRestore = (order) => {
        setSkuInfo(order.skuInfo);
        setBarcode(order.barcode);
        setPhoneNumber(order.phoneNumber);
        setInvoice(order.invoice);
        setDiscountAmount(order.discountAmount);
        setVatPercentage(order.vatPercentage);
        setDiscountType(order.discountType);
           // Find the matching employee from current employees list
        const matchingEmployee = employees.find(emp => 
            (order.employee && 
                (emp._id === order.employee._id || 
                 emp.firstName === order.employee.firstName))
        );
        
        // If we found a match, use it, otherwise use the stored employee
        setSelectedEmployee(matchingEmployee || order.employee);
        
        onClose();
    };

    const handleDelete = (id) => {
        const updatedOrders = heldOrders.filter(order => order.id !== id);
        localStorage.setItem('heldOrders', JSON.stringify(updatedOrders));
        setHeldOrders(updatedOrders);
    };

    return (
        <Dialog open={show} onClose={onClose} maxWidth="md" fullWidth>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Held Orders</h2>
                
                {heldOrders.length === 0 ? (
                    <p>No held orders found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border">#</th>
                                    <th className="py-2 px-4 border">Invoice</th>
                                    <th className="py-2 px-4 border">Barcode</th>
                                    <th className="py-2 px-4 border">Phone</th>
                                    <th className="py-2 px-4 border">Total</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {heldOrders.map((order, index) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="py-2 px-4 border text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border text-center">{order.invoice}</td>
                                        <td className="py-2 px-4 border text-center">{order.barcode}</td>
                                        <td className="py-2 px-4 border text-center">{order.phoneNumber}</td>
                                        <td className="py-2 px-4 border text-center">{order.totalPayable.toFixed(2)}</td>
                                        <td className="py-2 px-4 border text-center space-x-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleRestore(order)}
                                            >
                                                Restore
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default HoldListModal;