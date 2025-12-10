import { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI imports
import {
    CardContent,
    Card,
    Typography,
    CardMedia,
    Container,
    Grid,
} from '@mui/material';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then(res => {
        setProducts(res.data);
    })
    .catch(err => {
        console.error('Error fetching products:', err);
    });
    }, []);

    return (
        <Container >
            <Typography variant="h4" align="center" gutterBottom>
                Product List
        </Typography>

        <Grid container spacing={3}>
            {products.map(pro => (
                <Grid item xs={12} sm={6} md={4} key={pro.id}>
            <Card>
            <CardMedia
                component="img"
                height="200"
                image={pro.image}
                alt={pro.title}
                sx={{ objectFit: 'contain', padding: 2 }}
            />

            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {pro.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {pro.description.slice(0, 100)}...
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Price: ${pro.price}
                </Typography>
                </CardContent>
            </Card>
        </Grid>
            ))}
        </Grid>
    </Container>
    );
};

export default Products;
