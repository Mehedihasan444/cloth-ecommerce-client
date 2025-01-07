/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxiosPublic from '@/hooks/useAxiosPublic';
import React, { useState } from 'react';

interface AddressFormData {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const AddressForm = ({ user, cartItems, total }:{
  user:any;
  cartItems:any;
  total:number;
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const axiosPublic = useAxiosPublic();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    const info = {
      ...formData,
      total_bill: total,
      phone: user.phone,
      ordered_date: new Date(),
      userName: user?.displayName,
      userEmail: user?.email,
      status: "pending",
      payment: "pending",
      transactionId: "",
      products: cartItems,
    };
    const res = await axiosPublic.post("/payment", info);
    console.log(res);
    window.location.replace(res.data.url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Shipping Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="p-2 border rounded-md"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="p-2 border rounded-md"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          className="w-full p-2 border rounded-md"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          className="w-full p-2 border rounded-md"
          value={formData.addressLine2}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="p-2 border rounded-md"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="p-2 border rounded-md"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="p-2 border rounded-md"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="p-2 border rounded-md"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700"
        >
          Pay Now
        </button>
      </div>
    </form>
 
  );
};

export default AddressForm;