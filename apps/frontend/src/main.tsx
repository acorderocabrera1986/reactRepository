import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import esEs from 'antd/locale/es_ES'

import App from './app';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ConfigProvider
    locale={esEs}
    theme={{
      algorithm: theme.compactAlgorithm,
      // token: {
      //   // Seed Token
      //   colorPrimary: '#00b96b',
      //   borderRadius: 2,

      //   // Alias Token
      //   colorBgContainer: '#000000',
      // },
    }}
    componentSize="large"
  >
    <App />
  </ConfigProvider>
);
