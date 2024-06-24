import { Document } from '@prisma/client';
import { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '@/components/Loader/Loader';
import { formatDate } from '@/components/DocumentsList/utils';

export const DocumentsList = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchDocs = async () => {
    axios
      .get<Document[]>(`/api/database/documents?ownerId=1`)
      .then((res) => {
        setDocs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDocs().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex-col justify-start items-start gap-5 inline-flex h-full w-full relative p-10">
      <Loader show={isLoading} />
      {docs.map((item) => (
        <div
          key={item.id}
          className="justify-start items-center gap-2.5 inline-flex doc-item cursor-pointer"
        >
          <div
            className="cutout bg-blue-950 h-10 w-10 doc-card transition-all duration-300"
            style={
              {
                '--border-radius': '5px',
                '--paper-indent': '12px',
              } as CSSProperties
            }
          />
          <div className="flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-slate-950 text-base font-normal leading-tight">
              {item.name}
            </div>
            <div className="text-neutral-500 text-sm font-normal leading-none">
              {formatDate(new Date(item.updatedAt))}
            </div>
          </div>
        </div>
      ))}
      {docs.length === 0 && (
        <div className="text-slate-950 text-base font-normal leading-tight">
          Ничего не найдено
        </div>
      )}
    </div>
  );
};
