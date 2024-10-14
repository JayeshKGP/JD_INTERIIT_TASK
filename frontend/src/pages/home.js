import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { Badge, Container } from '@mui/material';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography, 
    Button,
    Chip,
    Box
  } from '@mui/material';
  import { 
    Couch, 
    Palette, 
    Straighten, 
    Inventory,
    LocalShipping,
    BarChart,
    Chair
  } from '@mui/icons-material';



const backend = 'https://jdtaskbackend.tech/';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(false);
    const [ItemData, setItemData] = useState({});
    const [MY_LIST, setMY_LIST] = useState([{id: 'loading',
        name: 'Loading...',}]);

    useEffect(() => {
        console.log(backend)
        axios.get(backend+'task')
            .then(response => {
                console.log(response)
                setData(response.data);
                setMY_LIST(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    function getItemInfo(item_id){
        axios.get(backend+'info', { headers: { id: item_id } })
            .then(response => {
                setItemData(response.data);
                setSelected(true);
                console.log(response.data); 
            })
            .catch(error => {
                alert(error);
            });
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    function getItemLabel(item) {
        return item.name;
      }

    return (
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 12 }}>
            <Item>
                <h1 style={{ color: '#1E90FF' }}>Tree View App</h1>
            </Item>
        </Grid>

        <Grid size={{ xs: 4, md: 4 }}>
          <Item><RichTreeView items={MY_LIST} getItemLabel={getItemLabel} onItemClick={(event, item_id)=>{
            if(item_id.startsWith('item_')){
                setSelected(false);
                getItemInfo(item_id);
          }}}/></Item>
        </Grid>
        <Grid size={{ xs: 8, md: 8 }}>
          <Item>{selected ? <Container>
            
            <Card sx={{ maxWidth: 1000, margin: 'auto' }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="100%"
              image={ItemData.image_url}
              alt={ItemData.name}
              sx={{ objectFit: 'cover', height: { xs: '300px', md: '100%' } }}
            />
            <Chip
              label={ItemData.status.replace('_', ' ')}
              color="error"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                textTransform: 'capitalize'
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {ItemData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {ItemData.brand} - {ItemData.category}
            </Typography>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Inventory sx={{ mr: 1 }} />
                  <Typography variant="body2">{ItemData.material}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Straighten sx={{ mr: 1 }} />
                  <Typography variant="body2">{ItemData.dimensions}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Palette sx={{ mr: 1 }} />
                  <Typography variant="body2">{ItemData.color}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Chair sx={{ mr: 1 }} />
                  <Typography variant="body2">Qty: {ItemData.quantity}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <LocalShipping sx={{ mr: 1 }} />
                  <Typography variant="body2">Godown ID: {ItemData.godown_id.slice(0, 8)}...</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <BarChart sx={{ mr: 1 }} />
                  <Typography variant="body2">Item ID: {ItemData.item_id.slice(0, 8)}...</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="h5" color="primary">
                ${ItemData.price.toFixed(2)}
              </Typography>
              <Chip 
                label={ItemData.status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'} 
                color={ItemData.status === 'out_of_stock' ? 'error' : 'success'} 
                variant="outlined"
              />
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', p: 2, bgcolor: 'action.hover' }}>
            <Button variant="outlined" size="large" fullWidth sx={{ mr: 1 }}>
              Add to Cart
            </Button>
            <Button variant="contained" size="large" fullWidth sx={{ ml: 1 }}>
              Buy Now
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
            
          </Container> : <h2>Select item from list</h2>}</Item>
        </Grid>

      </Grid>
    </Box>
    );
};

export default Home;