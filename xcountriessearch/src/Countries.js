import './Countries.css'
import { useState, useEffect } from 'react';

async function getCountries() {
    try{
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    console.log(data);
    return data
    }
    catch (e) {
        console.error("Error fetching data: ", e.message || e);
        return []
    }
}


function Countries() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        async function fetchData() {
            const result = await getCountries();
            setCountries(result);
        }
        fetchData();
    }, []);

    return (

        <>
        <input type='text' placeholder="Search for countries" value={search} onChange={(e) => setSearch(e.target.value)} ></input>
        <div className="Countries">
            {countries.length > 0 && (countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).map(country =>
                <div key={country.name.common} className="card">
                    <img src={country.flags.png} alt={`${country.name} flag`} />
                    <h2>{country.name.common}</h2>
                </div>
            ))}
        </div>
        </>
    );
}

export default Countries