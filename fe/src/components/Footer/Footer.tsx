import styles from './Footer.module.scss';
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.location}>
                    <img src="images/map.png" alt="Map placeholder" />
                    <div>
                        <h4 className="label label--small mb-10">
                            STORE LOCATION
                        </h4>
                        <p className="paragraph paragraph--small">
                            COMPANY LTD.CO
                        </p>
                        <p className="paragraph paragraph--small">
                            234 FAKE ADDRESS NAME,
                        </p>
                        <p className="paragraph paragraph--small">
                            FAKE CITY NAME, COUNTRY
                        </p>
                        <p className="paragraph paragraph--small">
                            01234 (000) 123 456 XXX
                        </p>
                    </div>

                    <div className={styles.about}>
                        <h4 className="label label--small mb-10">ABOUT US</h4>
                        <p className="paragraph paragraph--small">
                            ONE COULD REFUSE TO PAY EXPENSIVE TRANSLATORS, THE
                        </p>
                        <p className="paragraph paragraph--small">
                            EUROPEAN LANGUAGES ARE MEMBERS OF THE SAME FAMILY.
                            THEIR
                        </p>
                        <p className="paragraph paragraph--small">
                            SEPARATE EXISTENCE IS A MYTH. USES{' '}
                            <a href="#">READ MORE</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>© 2016 THE SHOP. ALL RIGHTS RESERVED.</p>
                <div className={styles.socialIcons}>
                    <h4 className="label label--small">CONNECT US</h4>
                    <img
                        src="/icons/twitter.svg"
                        alt="Twitter"
                        width="25"
                        height="25"
                    />
                    <img
                        src="/icons/pinterest.svg"
                        alt="Pinterest"
                        width="25"
                        height="25"
                    />
                    <img
                        src="/icons/facebook.svg"
                        alt="Facebook"
                        width="25"
                        height="25"
                    />
                    <img
                        src="/icons/youtube.svg"
                        alt="YouTube"
                        width="25"
                        height="25"
                    />
                    <img
                        src="/icons/instagram.svg"
                        alt="Instagram"
                        width="25"
                        height="25"
                    />
                    <img
                        src="/icons/google.svg"
                        alt="Google"
                        width="25"
                        height="25"
                    />
                </div>
            </div>
        </footer>
    );
};
export default Footer;
