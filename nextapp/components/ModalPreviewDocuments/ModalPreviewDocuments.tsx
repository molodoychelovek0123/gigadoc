import { Modal } from '@/components/Modal/Modal';
import { CSSProperties, useState } from 'react';
import { randomUUID } from 'crypto';
import { TextWithLineBreaks } from '@/components/TextWithLineBreaks/TextWithLineBreaks';
import { uuid } from 'uuidv4';
import { ESResultItem } from '@/components/ModalPreviewDocuments/types';
import Snackbar from 'awesome-snackbar';
import { ModalWarningNoTemplate } from '@/components/ModalPreviewDocuments/ModalWarningNoTemplate/ModalWarningNoTemplate';

type Props = {
  show: boolean;
  items: ESResultItem[];
  onChoose: (item: ESResultItem) => void;
};
export const ModalPreviewDocuments = ({ show, items, onChoose }: Props) => {
  const [itemSelected, setItemSelected] = useState<ESResultItem | null>(null);
  const [isWarning, setIsWarning] = useState(false);

  const handleChoose = (item: ESResultItem) => {
    if (!item.content.includes('{{')) {
      setIsWarning(true);
      setItemSelected(item);
    } else {
      onChoose(item);
    }
  };

  return (
    <>
      <Modal show={show} width={'90%'}>
        <h1 className="text-2xl font-bold">Выберите шаблон</h1>
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <div
              className="cutout h-60 w-48 p-[2px] text-xs custom-gradient-border"
              key={uuid()}
              style={
                {
                  '--delay': `${Math.random() * 1000}ms`,
                  '--border-radius': '5px',
                  '--paper-indent': '12px',
                } as CSSProperties
              }
            >
              <div
                key={uuid()}
                className="cutout bg-[#F3F3F3] h-full w-full p-4 text-xs document-preview-hoverable"
                style={
                  {
                    '--border-radius': '5px',
                    '--paper-indent': '12px',
                  } as CSSProperties
                }
                onClick={() => handleChoose(item)}
              >
                <TextWithLineBreaks text={item.content} />
              </div>
            </div>
          ))}
        </div>
      </Modal>
      {isWarning && (
        <ModalWarningNoTemplate
          onCancel={() => {
            setItemSelected(null);
            setIsWarning(false);
          }}
          onNext={() => {
            if (itemSelected) onChoose(itemSelected);
          }}
        />
      )}
    </>
  );
};
