import { useEffect, useCallback } from 'react';

export const usePaystack = () => {
  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const s = document.createElement('script');
      s.src = 'https://js.paystack.co/v1/inline.js';
      s.id = 'paystack-script';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const initializePayment = useCallback((options: any, publicKey: string) => {
    if (!window.PaystackPop) { alert('Payment loading, try again shortly.'); return; }
    const ref = `giftly_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
    const handler = window.PaystackPop.setup({ key: publicKey, ...options, ref });
    handler.openIframe();
  }, []);

  return { initializePayment };
};

export const formatNaira = (n: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(n);
