export const parseFormFields = (htmlString: string): string[] => {
  const root = document.createElement('html');
  root.innerHTML = htmlString;

  const stringBooleanFilter = (str?: string | null): str is string =>
    typeof str === 'string';
  const uniqueArrayFilter = (arr: string[]): string[] =>
    arr.filter((item, index) => arr.indexOf(item) === index);

  return uniqueArrayFilter(
    Array.from(root.querySelectorAll('.text--selector'))
      .map((item) => item.getAttribute('data-text-item'))
      .filter(stringBooleanFilter),
  );
};

export const fillValue = (
  htmlString: string,
  value: string,
  selector: string,
) => {
  const root = document.createElement('html');
  root.innerHTML = htmlString;

  if (selector && selector.length > 0) {
    root.querySelectorAll(`[data-text-item=${selector}]`).forEach((item) => {
      item.textContent = value;
    });
  }

  console.log(root);
  return root.innerHTML;
};

export const getValue = (htmlString: string, selector: string) => {
  const root = document.createElement('html');
  root.innerHTML = htmlString;

  return root.querySelector(`[data-text-item=${selector}]`)?.textContent;
};

export const highLightTextSelector = (selector: string) => {
  const editor = document.querySelector('#editor');

  if (editor) {
    editor.querySelectorAll('.text--selector--highlighted').forEach((item) => {
      item.classList.remove('text--selector--highlighted');
    });

    if (selector && selector?.length > 0) {
      editor
        .querySelectorAll(`[data-text-item=${selector}]`)
        .forEach((item) => {
          item.classList.add('text--selector--highlighted');
        });
    }
  }
};
