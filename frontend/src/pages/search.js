import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Search } from '@mui/icons-material'

const backend = 'https://taskbackend.work.gd/'; // Replace with your actual backend URL

export default function CoolSearchFilter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    material: '',
    brand: '',
    category: '',
    status: '',
  })
  const [items, setItems] = useState([])

  const fetchItems = async (query = '') => {
    try {
      const response = await axios.get(backend + 'items', {
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

  useEffect(() => {
    fetchItems(searchTerm)
  }, [searchTerm, filters])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event) => {
    const name = event.target.name
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: event.target.value,
    }))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {Object.entries(filters).map(([key, value]) => (
          <FormControl key={key} variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id={`${key}-label`}>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
            <Select
              labelId={`${key}-label`}
              name={key}
              value={value}
              onChange={handleFilterChange}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>
        ))}
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image_url}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {item.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {item.category}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${item.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip
                    label={`Qty: ${item.quantity}`}
                    color={item.quantity > 5 ? 'success' : 'warning'}
                    size="small"
                  />
                  <Chip
                    label={item.status}
                    color={item.status === 'In Stock' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}