import { Modal } from '@/components/Modal/Modal';

type Props = {
  onNext?: () => void;
  onCancel?: () => void;
};

export const ModalWarningNoTemplate = ({ onCancel, onNext }: Props) => {
  return (
    <Modal show={true}>
      <h3 className="text-2xl font-bold">
        Выбранный документ не является шаблоном
      </h3>
      <p>
        Документ, который вы выбрали не является шаблоном, это означает что
        нейросеть не будет помогать сгенерировать документ
      </p>
      <div className={'flex gap-2'}>
        <button
          className="w-full h-11 flex-col  bg-red-400  gap-2.5 inline-flex rounded-full justify-center items-center px-4"
          onClick={onCancel}
        >
          <div className="text-white text-base font-medium  leading-normal">
            Отменить
          </div>
        </button>
        <button
          className="w-full h-11 flex-col  bg-blue-900  gap-2.5 inline-flex rounded-full justify-center items-center px-4"
          onClick={onNext}
        >
          <div className="text-white text-base font-medium  leading-normal">
            Продолжить
          </div>
        </button>
      </div>
    </Modal>
  );
};
