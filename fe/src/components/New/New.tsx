import ImageWithSkeleton from '../Skeletons/ImageWithSkeleton';
import css from './New.module.scss';

const New = () => {
    return (
        <section>
            <div className="mb-40">
                <div className={`${css.top} mb-20`}>
                    <span className={css.line}></span>
                    <h2 className={css.title}>What`s new</h2>
                    <span className={css.line}></span>
                </div>

                <ul className={css.list}>
                    <li className={css.card}>
                        <ImageWithSkeleton src="/images/woman.png" alt="Beautiful woman" skeletonWidth={'314px'} skeletonHeight={'314px'}/>
                        <h3 className={css.name}>Black & White</h3>
                        <p className={css.text}>Spring collection 2016</p>
                    </li>
                    <li className={css.card}>
                        <ImageWithSkeleton src="/images/bags.png" alt="Stylish bags" skeletonWidth={'314px'} skeletonHeight={'314px'}/>
                        <h3 className={css.name}>Color Summer</h3>
                        <p className={css.text}>Spring collection 2016</p>
                    </li>
                    <li className={css.card}>
                        <ImageWithSkeleton src="/images/man.png" alt="Handsome man" skeletonWidth={'314px'} skeletonHeight={'314px'}/>
                        <h3 className={css.name}>Vintage for him</h3>
                        <p className={css.text}>Spring collection 2016</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default New;
