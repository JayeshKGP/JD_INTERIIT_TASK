import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Inventory,
  Category,
  AttachMoney,
  Store,
  Label,
} from '@mui/icons-material';

const BACKEND_URL = process.env.REACT_APP_BACKEND;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:before': {
            borderColor: 'black',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

const InventorySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState([5, 500]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isredirect, setIsRedirect] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}search`, {
        headers: {
          name: searchTerm,
          category,
          status,
          brand,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (!auth || auth === 'false') {
      setIsRedirect(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  return (
    <ThemeProvider theme={theme}>
      {isredirect ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h4">Please login first. Redirecting...</Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Card sx={{ mb: 4, p: 3, borderRadius: 0 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'black' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  startIcon={<SearchIcon />}
                  size="large"
                  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                      bgcolor: alpha('#000000', 0.8),
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: 'black' }}>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                    sx={{ color: 'black', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Furniture">Furniture</MenuItem>
                    <MenuItem value="Tools">Tools</MenuItem>
                    <MenuItem value="Toys">Toys</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: 'black' }}>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    sx={{ color: 'black', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="in_stock">In Stock</MenuItem>
                    <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: 'black' }}>Brand</InputLabel>
                  <Select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    label="Brand"
                    sx={{ color: 'black', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {[
                      'Adidas', 'Apple', 'Ashley', 'Black & Decker', 'Bosch', 'DeWalt',
                      'Dell', 'Fisher-Price', 'H&M', 'HP', 'Hasbro', "Haverty's", 'Ikea',
                      'LEGO', 'La-Z-Boy', "Levi's", 'Makita', 'Mattel', 'Nike', 'Playmobil',
                      'Samsung', 'Sony', 'Stanley', 'Wayfair', 'Zara'
                    ].map((brand) => (
                      <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography gutterBottom sx={{ color: 'black' }}>Price Range</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={5}
                  max={500}
                  sx={{ color: 'black' }}
                />
              </Grid>
            </Grid>
          </Card>
          <Box sx={{ mt: 4 }}>
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={60} sx={{ color: 'black' }} />
              </Box>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                  Search Results
                </Typography>
                <Grid container spacing={3}>
                  {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.item_id}>
                      <Card onClick={() => handleItemClick(item)} sx={{ cursor: 'pointer', borderRadius: 0 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.image_url || "https://via.placeholder.com/300x140"}
                          alt={item.name}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div" noWrap sx={{ color: 'black' }}>
                            {item.name}
                          </Typography>
                          <Typography color="text.secondary" noWrap>
                            {item.brand}
                          </Typography>
                          <Typography variant="h6" sx={{ color: 'black' }}>
                            ${item.price.toFixed(2)}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                            <Chip
                              label={item.status.replace('_', ' ')}
                              color={item.status === 'in_stock' ? 'success' : 'error'}
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
          <Dialog open={!!selectedItem} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            {selectedItem && (
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={selectedItem.image_url || "https://via.placeholder.com/300"}
                      alt={selectedItem.name}
                      sx={{ objectFit: 'cover', borderRadius: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>{selectedItem.name}</Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {selectedItem.brand}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                        ${selectedItem.price.toFixed(2)}
                      </Typography>
                      <Chip
                        label={selectedItem.status.replace('_', ' ')}
                        color={selectedItem.status === 'in_stock' ? 'success' : 'error'}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                    <TableContainer component={Paper} elevation={0}>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Inventory sx={{ mr: 1, color: 'black' }} />
                                Quantity
                              </Box>
                            </TableCell>
                            <TableCell>{selectedItem.quantity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Category sx={{ mr: 1, color: 'black' }} />
                                Category
                              </Box>
                            </TableCell>
                            <TableCell>{selectedItem.category}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Store sx={{ mr: 1, color: 'black' }} />
                                Godown ID
                              </Box>
                            </TableCell>
                            <TableCell>{selectedItem.godown_id}</TableCell>
                          </TableRow>
                          {selectedItem.attributes && Object.entries(selectedItem.attributes).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Label sx={{ mr: 1, color: 'black' }} />
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Box>
                              </TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </DialogContent>
            )}
          </Dialog>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default InventorySearch;