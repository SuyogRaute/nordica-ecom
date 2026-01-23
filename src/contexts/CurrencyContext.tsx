import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'CAD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CAD_RATE = 1.36; // Approximate USD to CAD conversion

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    // Auto-detect country based on timezone (simple approach)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Toronto') || timezone.includes('Vancouver') || timezone.includes('Canada')) {
      setCurrency('CAD');
    }
  }, []);

  const convertPrice = (priceUSD: number): number => {
    if (currency === 'CAD') {
      return Math.round(priceUSD * CAD_RATE * 100) / 100;
    }
    return priceUSD;
  };

  const formatPrice = (priceUSD: number): string => {
    const converted = convertPrice(priceUSD);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
