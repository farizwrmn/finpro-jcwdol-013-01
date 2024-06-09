'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken } from '@/lib/features/auth/authSlice';

export default function Auth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== undefined) {
      const payload = JSON.parse(localStorage.getItem('token') || '');
      const token = payload.token;
      if (token) {
        dispatch(checkToken(token));
      }
    }
  });

  return <>{children}</>;
}
