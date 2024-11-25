import React, { useEffect, useState } from "react";
import { Customer, customerService } from "../services/customerService";
import "./Customers.css"
import PurchaserCard from "./PurchaserCard";

interface ErrorMessages {
    name: string;
    city: string;
    contactNumber: string;
    year: string;
    photo: string;
    totalPurchases: string;
}

const CustomersDetails: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerId, setCustomerId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [contactNumber, setContactNumber] = useState<string>("");
    // const [year, setYear] = useState<number>(2024);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [photo, setPhoto] = useState<string>("");
    const [totalPurchasesPerYear, setTotalPurchasesPerYear] = useState<number>(0);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

    const [topPurchasers, setTopPurchasers] = useState<Customer[]>([]);

    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("All Cities");

    const [errors, setErrors] = useState<ErrorMessages>({
        name: "",
        city: "",
        contactNumber: "",
        year: "",
        photo: "",
        totalPurchases: "",
    });

    useEffect(() => {
        fetchData();
        fetchTopPurchasers();
    }, []);


    const fetchData = () => {
        customerService.getAllCustomers().then((data: Customer[]) => {
            setCustomers(data);
            setFilteredCustomers(data);
            setCities(["All Cities", ...new Set(data.map((customer) => customer.City))]);
        });
    };


    const validateForm = () => {
        const newErrors: ErrorMessages = {
            name: "",
            city: "",
            contactNumber: "",
            year: "",
            photo: "",
            totalPurchases: "",
        };

        let isValid = true;

        if (!name) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!city) {
            newErrors.city = "City is required";
            isValid = false;
        }

        if (!contactNumber) {
            newErrors.contactNumber = "Contact number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(contactNumber)) {
            newErrors.contactNumber = "Contact number must be 10 digits";
            isValid = false;
        }

        if (!year || year < 1900 || year > new Date().getFullYear()) {
            newErrors.year = "Please enter a valid year";
            isValid = false;
        }

        if (!photo) {
            newErrors.photo = "Photo URL is required";
            isValid = false;
        }

        if (!totalPurchasesPerYear || totalPurchasesPerYear <= 0) {
            newErrors.totalPurchases = "Total purchases must be greater than 0";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateForm()) return;

        const customerObj: Customer = {
            CustomerId: customerId,
            Name: name,
            City: city,
            ContactNumber: contactNumber,
            Year: year,
            Photo: photo,
            TotalPurchasesPerYear: totalPurchasesPerYear
        };

        if (selectedCustomer === null) {
            customerService.createCustomer(customerObj).then(() => {
                alert("New Customer added successfully.");
                fetchData();
            });
        } else {
            customerService.updateCustomer(customerObj).then(() => {
                alert("Customer updated successfully.");
                fetchData();
            });
        }

        setSelectedCustomer(null);
        clearFields();
    };

    const handleDelete = (customerId: number) => {
        if (window.confirm("Do you want to delete this customer?") === false) {
            return;
        }

        customerService.deleteCustomer(customerId).then(() => {
            alert(`Customer with ID ${customerId} deleted successfully.`);
            fetchData();
        });
    };

    const handleCancel = () => {
        setSelectedCustomer(null);
        clearFields();
    };

    const clearFields = () => {
        setCustomerId(0);
        setName("");
        setCity("");
        setContactNumber("");
        setYear(new Date().getFullYear());
        setPhoto("");
        setTotalPurchasesPerYear(0);
    };

    const handleUpdate = (customerId: number) => {
        customerService.getCustomerById(customerId).then((response) => {
            const customer = response;
            setCustomerId(customer.CustomerId);
            setName(customer.Name);
            setCity(customer.City);
            setContactNumber(customer.ContactNumber);
            setYear(customer.Year);
            setPhoto(customer.Photo);
            setTotalPurchasesPerYear(customer.TotalPurchasesPerYear);
            setSelectedCustomer(customerId);
        });
    };

    const fetchTopPurchasers = () => {
        customerService.getAllCustomers().then((data: Customer[]) => {
            // Sort customers by `TotalPurchasesPerYear` in descending order and take the top 5
            const sortedData = data.sort((a, b) => b.TotalPurchasesPerYear - a.TotalPurchasesPerYear).slice(0, 5);
            setTopPurchasers(sortedData);
        });
    };

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        if (city === "All Cities") {
            setFilteredCustomers(customers);
        } else {
            setFilteredCustomers(customers.filter((customer) => customer.City === city));
        }
    };

    return (
        <div className="crud-container">
            <section className="form-section">
                <h2 className="section-title">
                    {selectedCustomer !== null ? "Update Customer" : "Add New Customer"}
                </h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Customer Name"
                        // required
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter Customer City"
                        // required
                        />
                        {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Enter Contact Number"
                        // required
                        />
                        {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                        // required
                        />
                        {errors.year && <p className="error">{errors.year}</p>}
                    </div>
                    <div className="form-group">
                        <label>Photo</label>
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Enter Photo URL"
                        // required
                        />
                        {errors.photo && <p className="error">{errors.photo}</p>}
                    </div>
                    <div className="form-group">
                        <label>Total Purchases Per Year</label>
                        <input
                            type="text"
                            value={totalPurchasesPerYear}
                            onChange={(e) => setTotalPurchasesPerYear(Number(e.target.value))}
                            placeholder="Enter Total Purchases"
                        // required
                        />
                        {errors.totalPurchases && <p className="error">{errors.totalPurchases}</p>}
                    </div>

                    <button type="submit" className="submit-btn">
                        {selectedCustomer !== null ? "Update Customer" : "Add Customer"}
                    </button>

                    {selectedCustomer !== null && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </section>

            <section className="list-section">

                <div className="filter-container">
                    <label htmlFor="city-filter">Filter by City: </label>
                    <select
                        id="city-filter"
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                    >
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <h2 className="section-title">Customer List  ({selectedCity})</h2>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Contact Number</th>
                            <th>Year</th>
                            <th>Total Purchases</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => (
                            <tr key={customer.CustomerId}>
                                <td>{index + 1}</td>
                                <td>{customer.Name}</td>
                                <td>{customer.City}</td>
                                <td>{customer.ContactNumber}</td>
                                <td>{customer.Year}</td>
                                <td>{customer.TotalPurchasesPerYear}</td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate(customer.CustomerId)}
                                        className="update-btn"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.CustomerId)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="top-purchasers-container">
                <h2 className="section-title">Top 5 Purchasers</h2>
                <div className="card-container">
                    {topPurchasers.map((customer) => (
                        <PurchaserCard
                            key={customer.CustomerId}
                            name={customer.Name}
                            city={customer.City}
                            photo={customer.Photo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomersDetails;
