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
    const ref = `giftly_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const handler = window.PaystackPop.setup({ key: publicKey, ...options, ref });
    handler.openIframe();
  }, []);

  return { initializePayment };
};

// Format as CAD by default; respects passed currency symbol
export const formatCAD = (n: number): string =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

// Alias kept for backward compat
export const formatNaira = formatCAD;

// Approximate live-ish FX rates (update or fetch from API as needed)
export const FX_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  CAD: { symbol: 'CA$', rate: 1,      label: 'CAD — Canadian Dollar' },
  USD: { symbol: 'US$', rate: 0.74,   label: 'USD — US Dollar' },
  GBP: { symbol: '£',   rate: 0.59,   label: 'GBP — British Pound' },
  EUR: { symbol: '€',   rate: 0.68,   label: 'EUR — Euro' },
  NGN: { symbol: '₦',   rate: 1220,   label: 'NGN — Nigerian Naira' },
  GHS: { symbol: 'GH₵', rate: 11.2,   label: 'GHS — Ghanaian Cedi' },
  KES: { symbol: 'KSh', rate: 96,     label: 'KES — Kenyan Shilling' },
  ZAR: { symbol: 'R',   rate: 13.8,   label: 'ZAR — South African Rand' },
  AUD: { symbol: 'A$',  rate: 1.11,   label: 'AUD — Australian Dollar' },
  INR: { symbol: '₹',   rate: 61.5,   label: 'INR — Indian Rupee' },
};

export const formatPrice = (cadAmount: number, currency: string): string => {
  const fx = FX_RATES[currency] || FX_RATES.CAD;
  const converted = cadAmount * fx.rate;
  return `${fx.symbol}${converted % 1 === 0 ? converted.toLocaleString() : converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};
