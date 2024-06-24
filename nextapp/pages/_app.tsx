import '@/styles/styles.scss';
import type { AppProps } from 'next/app';
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu';
import React from 'react';
import { HealthCheck } from '@/components/HealtchCheck/HealthCheck';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex items-stretch h-full gap-5">
      <SidebarMenu />
      <HealthCheck />

      <div className="content-container relative cutout bg-white w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
