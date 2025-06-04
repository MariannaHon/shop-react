import { Suspense, ReactNode } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Toaster } from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Toaster
                position="top-center"
                toastOptions={{
                    success: {
                        style: {
                            color: 'green',
                            fontSize: '14px',
                        },
                    },
                    error: {
                        style: {
                            color: 'red',
                            fontSize: '14px',
                        },
                    },
                }}
            />
            <Suspense fallback={null}>{children}</Suspense>
            <Footer />
        </div>
    );
};

export default Layout;
