import { TagName, TAGS } from '@/components/TextEditor/constants';

type Props = {
  wrapTextToTag: (tag: TagName) => void;
  onLink: () => void;
  insertTagAtCaret?: (tag: TagName, text: string) => void;
  insertList?: (text: string) => void;
};

export const Toolbar = ({
  wrapTextToTag,
  onLink,
  insertTagAtCaret,
  insertList,
}: Props) => {
  const buttonClass =
    'w-10 h-10 bg-white rounded-full border border-black/opacity-20 flex justify-center items-center';

  return (
    <div className="w-full h-10 justify-start items-start gap-1 inline-flex">
      <button
        title="Полужирный"
        type="button"
        className={buttonClass}
        onClick={() => wrapTextToTag(TAGS.BOLD)}
      >
        <div className="text-black text-base font-semibold font-['Inter'] uppercase leading-tight">
          B
        </div>
      </button>

      <button
        title="Элемент списка"
        type="button"
        className={buttonClass}
        onClick={() => insertList?.('Элемент списка')}
      >
        <div className="text-black text-base font-semibold font-['Inter'] uppercase leading-tight">
          ⚫
        </div>
      </button>
      <button
        className={buttonClass}
        title="Курсив"
        type="button"
        onClick={() => wrapTextToTag(TAGS.ITALIC)}
      >
        {' '}
        I
      </button>
      <button
        className={buttonClass}
        title="Подчеркивание"
        type="button"
        onClick={() => wrapTextToTag(TAGS.UNDERLINE)}
      >
        {' '}
        U
      </button>
      <button
        className={buttonClass}
        title="Ссылка"
        type="button"
        onClick={onLink}
      >
        {' '}
        L
      </button>
    </div>
  );
};
