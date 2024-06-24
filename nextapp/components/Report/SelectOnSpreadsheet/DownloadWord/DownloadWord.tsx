import React from 'react';
import axios from 'axios';

type Data = '';
type WordByte = { data: Blob & { type: string; headers: any } } | any;
const DownloadWord = ({
  spreadsheet,
  labels,
}: {
  spreadsheet: any;
  labels: any;
}) => {
  const downloadWordFile = () => {
    const apiUrl = 'http://localhost:8000/exec-excel-data';

    const requestData = {
      spreadsheet: spreadsheet,
      labels: labels,
    };

    axios
      .post<Data, WordByte>(apiUrl, requestData, {
        responseType: 'blob',
      })
      .then((response) => {
        const filename = 'report';
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  };

  return (
    <button className="btn btn-primary" onClick={downloadWordFile}>
      Download File
    </button>
  );
};

export default DownloadWord;
