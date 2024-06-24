import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = { onDrop: (acceptedFiles: File[]) => void; label?: string };
export const FileDrop = ({ onDrop, label }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const labelString =
    label ?? 'Перетащите файлы сюда или кликните для выбора файлов';
  return (
    <div className={'p-[1px] bg-black bg-opacity-15 cutout rounded-lg w-full'}>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full min-h-40 p-4 rounded-lg cursor-pointer cutout ${
          isDragActive
            ? 'border-blue-500 bg-blue-100'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input {...getInputProps()} className="hidden" />
        <p className="text-gray-500"> {labelString}</p>
      </div>
    </div>
  );
};
