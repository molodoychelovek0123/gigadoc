import Link from 'next/link';
import { MenuLinks } from './MenuLinks/MenuLinks';

export const SidebarMenu = () => {
  return (
    <aside className="min-w-60 ">
      <div className="flex-col justify-start items-start gap-12 inline-flex py-3 px-5 bg-white w-full h-full cutout">
        <Link
          className="text-center text-slate-950 text-3xl font-semibold font-heading leading-9"
          href="/"
        >
          GigaDoc
        </Link>
        <MenuLinks
          links={[
            {
              text: 'Домой',
              href: '/',
              iconLink: '/icons/home-icon.svg',
            },
            {
              text: 'Документы',
              href: '/documents',
              iconLink: '/icons/docs-icon.svg',
              subLinks: [
                {
                  text: 'Создание из экселя',
                  href: '/create',
                },
                {
                  text: 'Создание по параметрам',
                  href: '/create',
                },
              ],
            },
            {
              text: 'Контакты',
              href: '/contacts',
              iconLink: '/icons/contacts-icon.svg',
            },
          ]}
        />
      </div>
    </aside>
  );
};
