export const Select = ({ variant, setVariant }: any) => {
  return (
    <select
      className="select select-accent w-full max-w-xs"
      onChange={(event) => setVariant(event?.target?.value)}
      value={variant}
    >
      <option disabled value={0}>
        Выберите документ
      </option>
      <option value={999}> Загрузить файл шаблона </option>
      <option value={1}>
        ПОСТАНОВЛЕНИЕ об отмене постановления о приостановлении предварительного
        следствия
      </option>
      <option value={2}>
        ПОСТАНОВЛЕНИЕ об отмене постановления о приостановлении дознания и о
        возобновлении дознания
      </option>
    </select>
  );
};
