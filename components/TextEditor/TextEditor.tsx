import { useTextEditor } from '@/components/TextEditor/useTextEditor';
import { Toolbar } from '@/components/TextEditor/components/Toolbar/Toolbar';
import { LinkModal } from '@/components/TextEditor/components/LinkModal/LinkModal';
import { useEffect, useRef, useState } from 'react';
import { ContextMenu } from '@/components/ContextMenu/ContextMenu';
import {
  fetchGigaChatModels,
  generateText,
} from '@/globals/utils/gigachatRequest';
import { getAccessToken } from '@/globals/utils/gigachatGetAccessToken';
import Image from 'next/image';

interface ContextMenuState {
  x: number;
  y: number;
  items: {
    label: string;
    onClick: () => void;
  }[];
}

type Props = {
  id?: string;
  value?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  isFullScreen: boolean;
  openFullScreen?: () => void;
  closeFullScreen?: () => void;
};

export const TextEditor = ({
  id = 'editor',
  value,
  isDisabled,
  onChange,

  isFullScreen,
  openFullScreen,
  closeFullScreen,
}: Props) => {
  const {
    wrapTextToTag,
    onChangeEditor,
    isPopupOpen,
    idLinkInput,
    link,
    handleOpenLinkModal,
    handleCloseLinkModal,
    onChangeLink,
    insertList,
    addLink,
    localValue,
    insertTagAtCaret,
  } = useTextEditor({ id, value, onChange });

  const editorRef = useRef<HTMLDivElement>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [AISidebarOpen, setAISidebarOpen] = useState(false);
  const [AIRequest, setAIRequest] = useState<string>('');
  const [accessToken, setAccessToken] = useState(null);
  const [models, setModels] = useState([]);
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    const fetchTokenAndModels = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
      const modelsData = await fetchGigaChatModels(token);
      setModels(modelsData?.data);
    };

    fetchTokenAndModels();
  }, []);

  const onClickAI = async () => {
    if (!accessToken) return;
    const userMessage = AIRequest;
    const generatedResponse = await generateText(accessToken, userMessage);
    setGeneratedText(generatedResponse?.choices?.[0]?.message.content);
  };

  const handleInsertGeneratedText = () => {
    try {
      insertTagAtCaret('u', generatedText);
      setGeneratedText('');
      setAISidebarOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
      }
    }
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      document.execCommand('insertText', false, text);
    });
  };

  const handleSendToAI = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        setAIRequest(selection.toString());
        handleOpenAI();
      }
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        { label: 'Копировать', onClick: handleCopy },
        { label: 'Вставить', onClick: handlePaste },
        { label: 'Создать с ИИ', onClick: handleOpenAI },
        { label: 'Передать в ИИ', onClick: handleSendToAI },
      ],
    });
  };

  const handleClick = () => {
    setContextMenu(null);
  };

  const handleOpenAI = () => {
    openFullScreen?.();
    setAISidebarOpen(true);
  };

  const handleCloseAI = () => {
    setAISidebarOpen(false);
  };

  return (
    <div className={'flex'}>
      <div className="text-editor-wrapper">
        <Toolbar
          wrapTextToTag={wrapTextToTag}
          onLink={handleOpenLinkModal}
          insertTagAtCaret={insertTagAtCaret}
          insertList={insertList}
        />
        <div className="area-wrapper">
          <div
            className="area"
            contentEditable={!isDisabled}
            dangerouslySetInnerHTML={{ __html: localValue ?? '' }}
            id={id ?? 'editor'}
            onInput={(e) => onChangeEditor(e?.currentTarget?.innerHTML ?? '')}
            onContextMenu={handleContextMenu}
            onClick={handleClick}
            ref={editorRef}
            style={{ textAlign: 'justify' }}
          />
        </div>

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={() => setContextMenu(null)}
          />
        )}

        <LinkModal
          link={link}
          isOpen={isPopupOpen}
          onClose={handleCloseLinkModal}
          onChangeLink={onChangeLink}
          addLink={addLink}
          id={idLinkInput}
        />
      </div>
      <div
        className={`h-full ${isFullScreen && AISidebarOpen ? 'w-72' : 'w-0'} overflow-hidden pt-[58px] pl-5 box-border transition-all duration-300`}
      >
        <div className={'h-full bg-white rounded-[8px] p-4 shadow-lg'}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex gap-2">
              <span>ИИ</span>
              <Image src={'/icons/robot.svg'} alt="AI" width={16} height={16} />
            </h3>
            <button onClick={handleCloseAI} className="text-sm text-red-500">
              Закрыть
            </button>
          </div>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
            value={AIRequest}
            onChange={(e) => setAIRequest(e.target.value)}
          />
          <button
            onClick={onClickAI}
            className="w-full p-2 bg-[#372579] text-white rounded mb-4"
          >
            Создать
          </button>
          {generatedText && (
            <>
              <div className="p-2 border border-gray-300 rounded mb-4">
                {generatedText}
              </div>
              <button
                onClick={handleInsertGeneratedText}
                className="w-full p-2 bg-green-500 text-white rounded"
              >
                Вставить в документ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
