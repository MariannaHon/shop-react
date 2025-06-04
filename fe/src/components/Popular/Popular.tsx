import { useSelector } from 'react-redux';
import PopularCard from '../PopularCard/PopularCard';
import css from './Popular.module.scss';
import { selectPopularLoading, selectPopularProducts } from '@/redux/popularProducts/selectors';
import Skeleton from '../Skeletons/Skeleton';

const Popular = () => {
    const popularProducts = useSelector(selectPopularProducts);
    const loading = useSelector(selectPopularLoading);

    const loadingTemplate = (
        <>
            {Array.from({length: 4}).map((_, i) => 
                <li key={i}>
                    <Skeleton width='20rem' height='28rem' key={i}/>
                </li>
            )}
        </>
    );

    const normalTemplate = (
        <>
            {popularProducts.map(product => (
                <li key={product._id}>
                    <PopularCard product={product} />
                </li>
            ))}
        </>
    );

    return (
        <section>
            <div className="mb-60">
                <div className={`${css.top} mb-40`}>
                    <h2 className={css.title}>Most popular</h2>
                    <span className={css.line}></span>
                </div>
                <ul className={css.list}>
                    {loading ? loadingTemplate : normalTemplate}
                </ul>
            </div>
        </section>
    );
};

export default Popular;
