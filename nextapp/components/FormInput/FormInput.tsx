import { UseFormRegisterReturn } from 'react-hook-form';
import { uuid } from 'uuidv4';
import { CSSProperties } from 'react';

type Props = {
  name?: string;
  label?: string;
  placeholder?: string;
  setValue?: (name: string, value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formRegister?: UseFormRegisterReturn<any>;
  hints?: string[];
};
export const FormInput = ({
  name,
  label,
  placeholder,
  setValue,
  formRegister,
  onFocus,
  onBlur,
  hints,
}: Props) => {
  // @ts-ignore Сука, оно там есть
  const { onBlur: formOnBlur } = formRegister;

  const setFieldValue = (value: string) => {
    if (name) {
      setValue?.(name, value);
    }
  };

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
        onFocus={onFocus}
        {...formRegister}
        onBlur={(e) => {
          onBlur?.(e);
          formOnBlur?.(e);
        }}
      />
      <div className={'mt-2 flex flex-wrap gap-1'}>
        {hints
          ?.filter((value, index, array) => array.indexOf(value) === index)
          .map((item) => (
            <>
              {item.length > 0 && item.trim() !== '[SEP]' ? (
                <div
                  className=" rounded-full p-[1px] text-xs custom-gradient-border cursor-pointer"
                  key={uuid()}
                  onClick={() => setFieldValue(item.trim())}
                  style={
                    {
                      '--delay': `${Math.random() * 1000}ms`,
                    } as CSSProperties
                  }
                >
                  <div className=" rounded-full bg-white p-1">
                    {item.length > 25 ? item.slice(0, 25) + '...' : item}
                  </div>
                </div>
              ) : null}
            </>
          ))}
      </div>
    </div>
  );
};
