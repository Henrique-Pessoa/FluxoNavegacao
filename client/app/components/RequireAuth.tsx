'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface RequireAuthProps {
  children: ReactNode;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const RequireAuth = ({ children, setToken }: RequireAuthProps) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const checkTokenValidity = () => {
      if (!accessToken || !refreshToken) {
        router.push('/');
      } else {
        const decodedToken: any = jwt.decode(accessToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          router.push('/');
        } else {
          setToken(accessToken);
        }
      }
    };

    checkTokenValidity();

    const interval = setInterval(checkTokenValidity, 60000);

    return () => clearInterval(interval);
  }, [setToken, router]);

  return <>{children}</>;
};

export default RequireAuth;
