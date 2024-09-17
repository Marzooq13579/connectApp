// components/ProviderWrapper.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
