import css from './Brands.module.scss';

const Brands = () => {
    return (
        <section>
            <div>
                <div className={`${css.top} mb-20`}>
                    <span className={css.line}></span>
                    <h2 className={css.title}>Top Brands</h2>
                    <span className={css.line}></span>
                </div>
                <ul className={`${css.list} mb-40`}>
                    <li className={css.item}>
                        <img
                            width={167}
                            height={30}
                            src="/images/armani.svg"
                            alt="Armani logo"
                        />
                    </li>
                    <li className={css.item}>
                        <img
                            width={118}
                            height={30}
                            src="/images/calvin.svg"
                            alt="Calvin Clein logo"
                        />
                    </li>
                    <li className={css.item}>
                        <img
                            width={86}
                            height={30}
                            src="/images/dkny.svg"
                            alt="DKNY logo"
                        />
                    </li>
                    <li className={css.item}>
                        <img
                            width={117}
                            height={30}
                            src="/images/baladinini.svg"
                            alt="Baldinini logo"
                        />
                    </li>
                    <li className={css.item}>
                        <img
                            width={167}
                            height={30}
                            src="/images/armani.svg"
                            alt="Armani logo"
                        />
                    </li>
                    <li className={css.item}>
                        <img
                            width={86}
                            height={30}
                            src="/images/dkny.svg"
                            alt="DKNY logo"
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Brands;
