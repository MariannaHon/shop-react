import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm';

import css from './RegistrationPage.module.scss';

const RegistrationPage = () => {
    return (
        <div className={css.register}>
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
