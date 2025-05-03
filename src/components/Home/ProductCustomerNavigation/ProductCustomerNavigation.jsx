import { TextField, Card, CardContent } from '@mui/material';
import ProductInfo from '../ProductInfo/ProductInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCustomerNavigation = () => {

    const [invoice, setInvoice] = useState('');
    const [skuInfo, setSkuInfo] = useState([]);
    const [barcode, setBarcode] = useState('');

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
    }, []);

    // barcode
    const handleBarcode = async (e) => {
        
        const value = e.target.value;
        setBarcode(value);

        if(value.length >= 11){
            console.log("Making API call...");
            try{
                const res = await axios.get(`https://front-end-task-lake.vercel.app/api/v1/purchase/get-purchase-single?search=${value}`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
                    }
                });
                console.log(res?.data?.data[0]);
                const newProduct = res?.data?.data[0];
                if (newProduct && !skuInfo.some(p => p.sku === newProduct.sku)) {
                    setSkuInfo(prev => [...prev, newProduct]);
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div className="border rounded-md border-accent">
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
                                />

                                <TextField
                                    label="Phone"
                                    type="number"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />
                                <TextField
                                    label="Membership id"
                                    type="number"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />
                            </div>

                            <div className='flex items-center gap-4'>
                                <TextField
                                    label="Select Sales Person"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />

                                <TextField
                                    label="Select Discount Price"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />

                                <TextField
                                    label="Enter The Discount Amount"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />
                                <TextField
                                    label="Enter The VAT Amount"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    margin="dense"
                                    className=" text-white border-none"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ProductInfo skuInfo={skuInfo} />
        </div>
    );
};

export default ProductCustomerNavigation;