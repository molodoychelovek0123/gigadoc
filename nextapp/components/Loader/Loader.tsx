import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useRef } from 'react';

export const Loader = ({
  show,
  withBlur = false,
}: {
  show: boolean;
  withBlur?: boolean;
}) => {
  const ref = useRef<Player | null>(null);

  useEffect(() => {
    if (show) {
      ref.current?.play();
    }
    if (!show) {
      ref.current?.stop();
    }
  }, [show]);

  return (
    <div
      className={`absolute w-full h-full top-0 left-0 bg-gray-800 bg-opacity-25 z-50 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-700 
  flex items-center justify-center
  ${withBlur ? 'backdrop-blur' : ''}
  `}
    >
      <Player
        loop
        ref={ref}
        src="/lottie-doc.json"
        style={{ height: '100px', width: '100px' }}
      ></Player>
    </div>
  );
};
