type Props = {
  link: string;
  isOpen: boolean;
  onClose: () => void;
  onChangeLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addLink: () => void;
  id: string;
};
export const LinkModal = ({
  link,
  addLink,
  onChangeLink,
  id,
  isOpen,
  onClose,
}: Props) => {
  return (
    <div className={`link-modal ${isOpen ? 'link-modal--open' : ''}`}>
      <div className="link-modal__head">
        <div className="link-modal__text">Выберите ссылку</div>
        <button
          className="link-modal__close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          title="Закрыть"
        >
          Х
        </button>
      </div>
      <div className="link-modal__input-wrapper">
        <input
          className={
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          }
          id={id}
          placeholder={'Вставьте адрес ссылки'}
          value={link}
          onBlur={onClose}
          onChange={onChangeLink}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addLink}
          type="button"
        >
          Добавить
        </button>
      </div>
    </div>
  );
};
