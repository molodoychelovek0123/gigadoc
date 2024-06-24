import { Modal } from '@/components/Modal/Modal';
import { FormInput } from '@/components/FormInput/FormInput';
import React from 'react';
import { Input } from '@/components/Input/Input';

type Props = {
  title: string;
  show: boolean;
  onSubmit: (value: string) => void;
  label?: string;
  placeholder?: string;
};
export const ModalWithSingleInput = ({
  title,
  show,
  onSubmit,
  placeholder,
  label,
}: Props) => {
  const [value, setValue] = React.useState('');
  return (
    <Modal show={show}>
      <h3 className={'text-sm font-bold uppercase'}> {title} </h3>
      <Input
        label={label}
        placeholder={placeholder ?? 'Введите значение'}
        value={value}
        onChange={(e) => setValue(e.target.value ?? '')}
      />
      <button
        className="w-full h-11 flex-col  bg-blue-900  gap-2.5 inline-flex rounded-full justify-center items-center"
        onClick={() => onSubmit(value)}
      >
        <div className="text-white text-base font-medium  leading-normal">
          Отправить
        </div>
      </button>
    </Modal>
  );
};
