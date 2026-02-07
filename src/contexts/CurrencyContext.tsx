import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'CAD';

interface CurrencyContextType {
  currency: Currency;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CAD_RATE = 1.36; // Approximate USD to CAD conversion

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // 1. Try to get country code from an IP API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country === 'CA' || data.country_code === 'CA') {
          setCurrency('CAD');
        } else {
          setCurrency('USD');
        }
      } catch (error) {
        // 2. Fallback to Timezone if API fails
        console.warn("Geo-detection failed, falling back to timezone:", error);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isCanada = timezone.includes('Toronto') ||
          timezone.includes('Vancouver') ||
          timezone.includes('Edmonton') ||
          timezone.includes('Winnipeg') ||
          timezone.includes('Halifax') ||
          timezone.includes('St_Johns') ||
          timezone.includes('Canada');

        if (isCanada) {
          setCurrency('CAD');
        } else {
          setCurrency('USD');
        }
      }
    };

    detectCurrency();
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
    <CurrencyContext.Provider value={{ currency, formatPrice, convertPrice }}>
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
