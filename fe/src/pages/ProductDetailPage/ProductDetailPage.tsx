import css from './ProductDetailPage.module.scss';
import Related from '@/components/Related/Related';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.js';
import Product from '@/components/Product/Product.jsx';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '@/redux/product/operations.js';
import { fetchRelatedProducts } from '@/redux/relatedProducts/operations.js';

const ProductDetailPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
            dispatch(fetchRelatedProducts(id));
        }
    }, [dispatch, id]);

    return (
        <main className={`${css.detail} container`}>
            <Product />
            <Related />
        </main>
    );
};

export default ProductDetailPage;
