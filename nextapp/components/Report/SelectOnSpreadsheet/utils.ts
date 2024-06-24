type InputObject = {
  [key: string]: {
    [index: number]: string;
  };
};

type OutputItem = { value: string; readonly: boolean };
export const transformObjectDataToSpreadsheetArray = (
  input: InputObject,
): OutputItem[][] => {
  const result: OutputItem[][] = [];

  // Получаем все ключи (A, B, и так далее)
  const keys = Object.keys(input);

  // Перебираем все индексы (0, 1, и так далее)
  const indices = Object.keys(input[keys[0]]);

  // Перебираем все индексы
  indices.forEach((index) => {
    // Создаем новый массив для текущего индекса
    const subArray: OutputItem[] = [];

    // Перебираем все ключи
    keys.forEach((key) => {
      // Получаем значение по текущему ключу и индексу
      const value = input[key][Number(index)];

      // Добавляем объект в подмассив
      subArray.push({ value, readonly: false });
    });

    // Добавляем подмассив в результирующий массив
    result.push(subArray);
  });

  return result;
};

// Пример использования
const inputObject: InputObject = {
  A: { 0: 'a0Text', 1: 'a1Text' },
  B: { 0: 'b0Text', 1: 'b1Text' },
};
