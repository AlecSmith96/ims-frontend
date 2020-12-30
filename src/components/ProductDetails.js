import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const ProductDetails = () => {
    const {state} = useLocation();

    return <p> Product Details for {state.name}</p>
}

export default ProductDetails;