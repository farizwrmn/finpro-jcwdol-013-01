'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken, signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function AuthCustomer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/');

        const result = await dispatch(checkToken(token));
        if (!result?.role) {
          dispatch(signOut());
          router.push('/');
        }

        if (!(result?.role?.name === "customer" && result?.isVerified)) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      }
    })();
  }, [dispatch, router]);

  if (isLoading) return <></>;

  return <>{children}</>;
}