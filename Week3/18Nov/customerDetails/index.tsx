import axios from "axios";
import { useEffect, useState } from "react";
import "./CustomerDetails.css"
interface Customer {
    Name: string;
    City: string;
    Country: string
}
const CustomerDetails: React.FC = () => {
    const [customerData, setCustomerdata] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [countries, setCountries] = useState<string[]>([]);
    const [selectCountry, setSelectCountry] = useState<string>("");

    const fetchData = async (country: string = "") => {
        try {
            const response = await axios.get("https://www.w3schools.com/angular/customers.php");
            const data = response.data.records;
            // console.log(data, "data")
            const filteredData = country ? data.filter((customer: Customer) => customer.Country === country) : data
            // console.log(filteredData, "filteredData")
            setCustomerdata(filteredData)
            setIsLoading(false)

            const uniqueCountries = data.map((customer: Customer) => customer.Country).filter((country: string, ind: any, self: any) => self.indexOf(country) === ind)
            setCountries(uniqueCountries)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleCountry = (e: any) => {
        const country = e.target.value
        setSelectCountry(country);
        fetchData(country)
    }

    return (
        <div>
            <div>
                <h1>Customer Details</h1>
            </div>
            <div>
                <label>Select Country:</label>
                <select value={selectCountry} onChange={handleCountry}>
                    <option value="">All Country</option>
                    {
                        countries?.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))
                    }

                </select>
            </div>
            <div>

                {
                    isLoading ? (
                        <p>Loading..</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerData?.map((customer, ind) => (
                                        <tr key={ind}>
                                            <td>{customer.Name}</td>
                                            <td>{customer.City}</td>
                                            <td>{customer.Country}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}
export default CustomerDetails;