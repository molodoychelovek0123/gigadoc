type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
}: Props) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="inputField"
      >
        {label}
      </label>
      <input
        tabIndex={0}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={(e) => {
          onBlur?.(e);
        }}
      />
    </div>
  );
};
