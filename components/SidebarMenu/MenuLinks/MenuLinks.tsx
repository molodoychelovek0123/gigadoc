import Image from 'next/image';

type Link = {
  text: string;
  href: string;
  iconLink?: string;
  subLinks?: {
    text: string;
    href: string;
  }[];
};
type Props = {
  links: Link[];
};

export const MenuLinks = ({ links }: Props) => {
  return (
    <div className="flex-col justify-start items-start gap-6 flex menu-links">
      {links.map((item) => (
        <div
          className="flex-col justify-start items-start gap-2.5 flex"
          key={`${item.text}-${item.href}`}
        >
          <div className="flex-col justify-start items-start gap-3.5 flex">
            <a
              href={item.href}
              className="justify-start items-center gap-2.5 inline-flex"
            >
              {item.iconLink && (
                <Image
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  src={item.iconLink}
                  alt={item.text}
                />
              )}
              <div className="text-slate-950 text-sm font-semibold font-default uppercase leading-none">
                {item.text}
              </div>
            </a>
            {(item.subLinks?.length ?? -1) > 0 && (
              <div className="flex-col justify-start items-start gap-2.5 flex">
                {item.subLinks?.map((subLink) => (
                  <a
                    href={subLink.href}
                    key={`${subLink.text}-${subLink.href}`}
                    className="text-slate-950 text-opacity-50 text-sm font-normal font-default leading-none"
                  >
                    {subLink.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
