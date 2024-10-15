import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  Inventory,
  Category,
  AttachMoney,
  Store,
  Build,
  Description,
  Label,
} from '@mui/icons-material';

const backend = process.env.REACT_APP_BACKEND;

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(false);
  const [itemData, setItemData] = useState({});
  const [myList, setMyList] = useState([{ id: 'loading', name: 'Loading...' }]);

  useEffect(() => {
    axios.get(backend + 'task')
      .then(response => {
        setData(response.data);
        setMyList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  function getItemInfo(item_id) {
    axios.get(backend + 'info', { headers: { id: item_id }, withCredentials: true })
      .then(response => {
        if (response.data.auth) {
          setItemData(response.data.data);
          setSelected(true);
        } else {
          localStorage.setItem('auth', 'false');
          alert('Please login first');
          window.location.href = '/login';
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function getItemLabel(item) {
    return item.name;
  }

  if (loading) return <CircularProgress color='black'/>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Inventory Management
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Item List
              </Typography>
              <RichTreeView
                items={myList}
                getItemLabel={getItemLabel}
                onItemClick={(event, item_id) => {
                  if (item_id.startsWith('item_')) {
                    setSelected(false);
                    getItemInfo(item_id);
                  }
                }}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              {selected ? (
                <Card>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={itemData.image_url}
                        alt={itemData.name}
                        sx={{ objectFit: 'cover', height: { xs: '300px', md: '100%' } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                          {itemData.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {itemData.brand} - {itemData.category}
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell><Box display="flex" alignItems="center"><Inventory sx={{ mr: 1 }} /> Quantity</Box></TableCell>
                                <TableCell>{itemData.quantity}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><Box display="flex" alignItems="center"><AttachMoney sx={{ mr: 1 }} /> Price</Box></TableCell>
                                <TableCell>${itemData.price.toFixed(2)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell><Box display="flex" alignItems="center"><Store sx={{ mr: 1 }} /> Godown ID</Box></TableCell>
                                <TableCell>{itemData.godown_id}</TableCell>
                              </TableRow>


                              {Object.entries(itemData.attributes).map(([key, value]) => (


<TableRow>
                                <TableCell><Box display="flex" alignItems="center"><Label sx={{ mr: 1 }} /> {key.charAt(0).toUpperCase() + key.slice(1)}</Box></TableCell>
                                <TableCell>{value.toString()}</TableCell>
                              </TableRow>
                      ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="body2">Item ID: {itemData.item_id}</Typography>
                          <Chip
                            label={itemData.status.replace('_', ' ')}
                            color={itemData.status === 'out_of_stock' ? 'error' : 'success'}
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ) : (
                <Typography variant="h6">Select an item from the list</Typography>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;