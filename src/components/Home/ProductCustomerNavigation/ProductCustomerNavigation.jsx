import { TextField, Card, CardContent } from '@mui/material';

const ProductCustomerNavigation = () => {
    return (
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
                                type="number"
                                fullWidth
                                required
                                variant="outlined"
                                margin="dense"
                                className=" text-white border-none"
                            />

                            <TextField
                                label="Product Barcode"
                                type="number"
                                fullWidth
                                required
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
    );
};

export default ProductCustomerNavigation;