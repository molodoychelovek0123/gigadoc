import Image from 'next/image';
import { Inter } from 'next/font/google';
import React from 'react';
import Link from 'next/link';
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu';
import getConfig from 'next/config';

const inter = Inter({ subsets: ['latin'] });

const XLXSIcon = () => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 25H2.5C1.125 25 0 23.875 0 22.5V2.5C0 1.125 1.125 0 2.5 0H17.5C18.875 0 20 1.125 20 2.5V22.5C20 23.875 18.875 25 17.5 25ZM17.5 45H2.5C1.125 45 0 43.875 0 42.5V32.5C0 31.125 1.125 30 2.5 30H17.5C18.875 30 20 31.125 20 32.5V42.5C20 43.875 18.875 45 17.5 45ZM27.5 45H42.5C43.875 45 45 43.875 45 42.5V22.5C45 21.125 43.875 20 42.5 20H27.5C26.125 20 25 21.125 25 22.5V42.5C25 43.875 26.125 45 27.5 45ZM25.0001 12.5V2.5C25.0001 1.125 26.1251 0 27.5001 0H42.5001C43.8751 0 45.0001 1.125 45.0001 2.5V12.5C45.0001 13.875 43.8751 15 42.5001 15H27.5001C26.1251 15 25.0001 13.875 25.0001 12.5Z"
      fill="#372579"
    />
  </svg>
);

const ParamsIcon = () => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.8312 7.57888C39.5625 6.8477 39.5625 5.66657 38.8312 4.9354L34.4437 0.548354C34.0934 0.197291 33.6178 0 33.1219 0C32.6259 0 32.1503 0.197291 31.8 0.548354L28.125 4.22297L35.1562 11.2535L38.8312 7.57888ZM33.2813 13.1283L26.2501 6.09777L7.78131 24.5646C7.59381 24.7521 7.50006 24.9771 7.50006 25.2395V30.9389C7.50006 31.4639 7.91256 31.8764 8.43756 31.8764H14.1376C14.3813 31.8764 14.6251 31.7826 14.7938 31.5951L33.2813 13.1283ZM41.25 37.5008H3.75C1.6875 37.5008 0 39.1881 0 41.2504C0 43.3127 1.6875 45 3.75 45H41.25C43.3125 45 45 43.3127 45 41.2504C45 39.1881 43.3125 37.5008 41.25 37.5008Z"
      fill="#372579"
    />
  </svg>
);

const { publicRuntimeConfig } = getConfig();

export default function Home() {
  console.log(publicRuntimeConfig);
  const cardClassName =
    'cutout bg-zinc-200 hover:scale-105 p-5 flex flex-col justify-between min-w-72 min-h-72 transition-all';
  return (
    <div className="flex gap-5">
      <main
        className={`flex gap-5 items-center justify-between p-24 ${inter.className}`}
      >
        <Link href={'/report'} className={cardClassName}>
          <XLXSIcon />
          <p className="text-slate-950 text-base font-medium">
            Создать файл из XLSX
          </p>
        </Link>
        <Link href={'/create'} className={cardClassName}>
          <ParamsIcon />
          <p className="text-slate-950 text-base font-medium">
            Создать файл по параметрам
          </p>
        </Link>
        <Link href={'/upload-create'} className={cardClassName}>
          <ParamsIcon />
          <p className="text-slate-950 text-base font-medium">
            Создать файл на основе файла
          </p>
        </Link>
      </main>
    </div>
  );
}
