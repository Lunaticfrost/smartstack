import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { verifyToken } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
// import ProtectedRoute from '@/components/ProtectedRoute';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Verify token on initial app load
    dispatch(verifyToken());
  }, [dispatch]);

  return <>{children}</>;
}

export default MyApp;