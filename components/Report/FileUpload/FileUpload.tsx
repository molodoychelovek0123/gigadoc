import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';
import { FileDrop } from '@/components/FileDrop/FileDrop';
import { Loader } from '@/components/Loader/Loader';
import { Modal } from '@/components/Modal/Modal';

const FileUpload = ({
  updateData,
  show,
  updateShow,
  route,
}: {
  updateData: (data: Record<string, string>) => void;
  show: boolean;
  updateShow: (data: boolean) => void;
  route: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (acceptedFiles: File[]) => {
    const file = (acceptedFiles?.length ?? 0) > 0 ? acceptedFiles[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    try {
      if (selectedFile) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post(route, formData, {
          method: 'POST',
        });

        console.log('File uploaded successfully:', response.data);
        if (response?.data?.result) {
          updateData(response.data.result);
          updateShow(false);
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Modal show={show} width={'400px'}>
      <Loader show={isLoading} />

      <FileDrop onDrop={handleFileChange} label={selectedFile?.name} />

      <button
        className="w-full h-11 flex-col  bg-blue-900  gap-2.5 inline-flex rounded-full justify-center items-center"
        onClick={handleFileUpload}
      >
        <div className="text-white text-base font-medium  leading-normal">
          Загрузить
        </div>
      </button>
    </Modal>
  );
};

export default FileUpload;
