import Popular from '../../components/Popular/Popular';
import New from '../../components/New/New';
import css from './HomePage.module.scss';
import Brands from '../../components/Brands/Brands';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.js';

import { fetchPopularProducts } from '@/redux/popularProducts/operations.js';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPopularProducts());
    }, [dispatch]);

    return (
        <main className="container">
            <section className={`${css.home} mb-20`}>
                <p className="mb-10">New accessories collection</p>
                <h1 className={`${css.title} mb-20`}>
                    <span className={css.letter}>S</span>pring{' '}
                    <span className={css.letter}>E</span>ssentials
                </h1>
                <a className={css.link} href="/">
                    Shop women`s accessories
                </a>
            </section>
            <New />
            <Popular />
            <Brands />
            <ul className={`${css.list} mb-40`}>
                <li className={css.item}>
                    <span className={css.number}>01.</span>
                    <div>
                        <h4 className={css.subtitle}>Free shipping</h4>
                        <p className={css.text}>On all orders over $50</p>
                    </div>
                </li>
                <li className={css.item}>
                    <span className={css.number}>02.</span>
                    <div>
                        <h4 className={css.subtitle}>Money back guarantee</h4>
                        <p className={css.text}>On all orders</p>
                    </div>
                </li>
                <li className={css.item}>
                    <span className={css.number}>03.</span>
                    <div>
                        <h4 className={css.subtitle}>Worldwide delivery</h4>
                        <p className={css.text}>To over 80 countries</p>
                    </div>
                </li>
            </ul>
        </main>
    );
};

export default HomePage;
