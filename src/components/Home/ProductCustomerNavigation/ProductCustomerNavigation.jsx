import { TextField, Card, CardContent } from '@mui/material';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ProductInfo from '../ProductInfo/ProductInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerInfo from '../CustomerInfo/CustomerInfo';


const ProductCustomerNavigation = () => {

    const [invoice, setInvoice] = useState('');
    const [skuInfo, setSkuInfo] = useState([]);
    const [barcode, setBarcode] = useState('');
    const [barcodeError, setBarcodeError] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [vatPercentage, setVatPercentage] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [membershipId] = useState('MembershipId');
    const [discountType, setDiscountType] = useState('');

    // invoice date
    useEffect(() => {
        const createInvoiceDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            return `${day}${month}${year}0001`
        };
        setInvoice(createInvoiceDate());

        // fetch employee api

        const fetchEmployees = async () => {
            try {
                const res = await axios.get(` https://front-end-task-lake.vercel.app/api/v1/employee/get-employee-all`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
                    }
                });
                const employeesData = res?.data?.data;
                if (Array.isArray(employeesData)) {
                    setEmployees(employeesData);
                }
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchEmployees();

    }, []);

    // barcode
    const handleBarcode = async (e) => {
        const value = e.target.value;
        setBarcode(value);
        setBarcodeError('');

        if (value.length >= 11) {
            const alreadyExists = skuInfo.some(p => p.sku === value || p.barcode === value);
            if (alreadyExists) {
                setBarcodeError('This barcode is already used.');
                return;
            }

            try {
                const res = await axios.get(`https://front-end-task-lake.vercel.app/api/v1/purchase/get-purchase-single?search=${value}`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
                    }
                });

                const newProduct = res?.data?.data[0];
                if (newProduct) {
                    setSkuInfo(prev => [...prev, newProduct]);
                } else {
                    setBarcodeError('No product found for this barcode.');
                }

            } catch (error) {
                console.log(error);
                setBarcodeError('Error fetching product. Please try again.');
            }
        }
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setDiscountAmount(value === '' ? 0 : Number(value));
        }
    };

    const handleVatChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setVatPercentage(value === '' ? 0 : Number(value));
        }
    };

    // sales man


    return (
        <div>
            <div className='flex justify-between gap-5'>

                <div className='w-2/3'>
                    <div className="border rounded-md border-accent ">
                        <div>
                            <h2 className="text-xl font-semibold p-2 bg-gray-100 text-black">Product & Customer Navigation</h2>
                        </div>

                        <div>
                            <Card>
                                <CardContent>
                                    <div className='flex items-center gap-4'>
                                        <TextField
                                            label="Invoice Number"
                                            type="text"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            value={invoice}
                                            margin="dense"
                                            className=" text-white border-none"
                                        />

                                        <TextField
                                            label="Product Barcode"
                                            type="text"
                                            fullWidth
                                            required
                                            value={barcode}
                                            onChange={handleBarcode}
                                            variant="outlined"
                                            margin="dense"
                                            className=" text-white border-none"
                                            error={!!barcodeError}
                                            helperText={barcodeError}
                                        />

                                        <TextField
                                            label="Phone"
                                            type="number"
                                            fullWidth
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            variant="outlined"
                                            margin="dense"
                                            className=" text-white border-none"
                                        />
                                        <TextField
                                            label="Membership id"
                                            type="number"
                                            fullWidth
                                            value={membershipId}
                                            InputProps={{ readOnly: true }}
                                            variant="outlined"
                                            margin="dense"
                                            className=" text-white border-none"
                                        />
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <FormControl fullWidth margin="dense">
                                            <InputLabel id="employee-select-label">Select Sales Person</InputLabel>
                                            <Select
                                                labelId="employee-select-label"
                                                value={selectedEmployee || ''} // Handle null case
                                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                                label="Select Sales Person"
                                                renderValue={(selected) => selected ? `${selected.firstName}` : ''}
                                            >
                                                {employees?.map((emp) => (
                                                    <MenuItem key={emp._id} value={emp}>
                                                        {emp.firstName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>


                                        <FormControl fullWidth margin="dense">
                                            <InputLabel id="discount-type-label">Select Discount Type</InputLabel>
                                            <Select
                                                labelId="discount-type-label"
                                                value={discountType}
                                                onChange={(e) => setDiscountType(e.target.value)}
                                                label="Select Discount Type"
                                            >
                                                <MenuItem value="percentage">Fixed</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            label="Enter The Discount Amount"
                                            type="text"
                                            fullWidth
                                            required
                                            value={discountAmount === 0 ? '' : discountAmount}
                                            onChange={handleDiscountChange}
                                            variant="outlined"
                                            margin="dense"
                                            placeholder="Enter The Discount Amount"
                                            className=" text-white border-none"
                                        />
                                        <TextField
                                            label="Enter The VAT Amount"
                                            type="text"
                                            fullWidth
                                            required
                                            value={vatPercentage === 0 ? '' : vatPercentage}
                                            onChange={handleVatChange}
                                            variant="outlined"
                                            margin="dense"
                                            placeholder="Enter The VAT Amount"
                                            className=" text-white border-none"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <ProductInfo
                        skuInfo={skuInfo}
                        setSkuInfo={setSkuInfo}
                        barcode={barcode} />
                </div>

                <div>
                    <CustomerInfo
                        skuInfo={skuInfo}
                        vatPercentage={vatPercentage}
                        discountAmount={discountAmount}
                        invoice={invoice}
                        barcode={barcode}
                        phoneNumber={phoneNumber}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        discountType={discountType}
                        setSkuInfo={setSkuInfo}
                        setBarcode={setBarcode}
                        setPhoneNumber={setPhoneNumber}
                        setInvoice={setInvoice}
                        setDiscountAmount={setDiscountAmount}
                        setVatPercentage={setVatPercentage}
                        setEmployees={setEmployees}
                        employees={employees}
                        setDiscountType={setDiscountType}
                    />
                </div>
            </div>

        </div>
    );
};

export default ProductCustomerNavigation;