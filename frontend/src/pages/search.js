import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
const backend = process.env.REACT_APP_BACKEND;
const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        material: '',
        brand: '',
        category: '',
        status: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async (query = '') => {
        try {
            const response = await axios.get(backend+'items', {
                params: {
                    search: query,
                    ...filters
                }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const debouncedFetchItems = debounce((query) => {
        fetchItems(query);
    }, 500);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        debouncedFetchItems(query);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [name]: value
            };
            fetchItems(searchTerm, newFilters);
            return newFilters;
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Material:
                    <input
                        type="text"
                        name="material"
                        value={filters.material}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    />
                </label>
            </div>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <img src={item.image_url} alt={item.name} width="100" />
                        <h3>{item.name}</h3>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Status: {item.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;