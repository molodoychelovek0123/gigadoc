import cn from 'classnames';
import { ReactNode } from 'react';

type Props = {
  show: boolean;
  children: ReactNode;
  width?: string;
};
export const Modal = ({ show, children, width }: Props) => {
  return (
    <div
      className={cn('absolute w-full h-full left-0 top-0 backdrop-blur z-50', {
        hidden: !show,
      })}
    >
      <div
        className={cn(
          'flex flex-col items-center fixed a-centered cutout bg-white p-4 gap-4 min-w-96 ',
          {
            hidden: !show,
          },
        )}
        style={{
          width,
        }}
      >
        {children}
      </div>
    </div>
  );
};
