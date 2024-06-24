import { useEffect, useState } from 'react';
import { TagName, TAGS } from '@/components/TextEditor/constants';
import { Element } from 'domhandler';

type Params = {
  value?: string;
  onChange?: (value: string) => void;
  id: string;
};

const getFocusedElement = () => {
  let focused = document.activeElement;
  if (!focused || focused == document.body) focused = null;
  else if (document.querySelector) focused = document.querySelector(':focus');

  return focused;
};

const isCSR =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const useTextEditor = ({ value, onChange, id }: Params) => {
  const [localValue, setLocalValue] = useState(value ?? '');
  const [currentRange, setCurrentRange] = useState<Range | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [link, setLink] = useState('');
  const idLinkInput = `${id}__link-input`;

  useEffect(() => {
    const focusedElement = getFocusedElement();
    if (focusedElement?.id !== id) {
      setLocalValue(value ?? '');
    }
  }, [id, value]);

  const handleOpenLinkModal = () => {
    if (isCSR) {
      setCurrentRange(window.getSelection()?.getRangeAt(0) ?? null);
      setIsPopupOpen(true);
    }
  };

  const handleCloseLinkModal = () => {
    setIsPopupOpen(false);
  };

  const onChangeEditor = (htmlValue: string) => {
    // onChange?.(e.target.innerHTML)
    // не уверен, мб currentTarget
    onChange?.(htmlValue);
  };

  const insertTagAtCaret = (tag: TagName, text: string) => {
    if (!currentRange) {
      if (
        window.getSelection()?.focusNode?.parentElement?.closest(`#${id}`)
          ?.id !== id
      ) {
        return;
      }
    }

    const selection = currentRange || window.getSelection()?.getRangeAt(0);
    const selectedParent = selection?.commonAncestorContainer?.parentElement;
    const element = document.createElement(tag);
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
    selection?.insertNode(element);
    selection?.setStartAfter(element);
    selection?.collapse(true);

    if (selectedParent) {
      selectedParent.normalize();
    }
  };

  const insertList = (firstItemText: string) => {
    if (!currentRange) {
      if (
        window.getSelection()?.focusNode?.parentElement?.closest(`#${id}`)
          ?.id !== id
      ) {
        return;
      }
    }

    const selection = currentRange || window.getSelection()?.getRangeAt(0);
    const selectedParent = selection?.commonAncestorContainer?.parentElement;
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const textNode = document.createTextNode(firstItemText);
    li.appendChild(textNode);
    ul.appendChild(li);
    selection?.insertNode(ul);
    selection?.setStartAfter(ul);
    selection?.collapse(true);

    if (selectedParent) {
      selectedParent.normalize();
    }
  };

  const wrapTextToTag = (tag: TagName) => {
    if (isCSR) {
      if (!currentRange) {
        if (
          window.getSelection()?.focusNode?.parentElement?.closest(`#${id}`)
            ?.id !== id
        ) {
          return;
        }
      }

      const selection = currentRange || window.getSelection()?.getRangeAt(0);
      const selectedParent = selection?.commonAncestorContainer?.parentElement;
      let mainParent = selectedParent;

      if (selection && selectedParent) {
        if (selectedParent.closest(`${tag}`) && selectedParent.textContent) {
          const text = document.createTextNode(selectedParent.textContent);

          mainParent = selectedParent?.parentElement;

          if (mainParent) {
            mainParent.insertBefore(text, selectedParent);
            mainParent.removeChild(selectedParent);
            mainParent.normalize();
          }
        } else {
          const element = document.createElement(tag);

          if (tag === TAGS.ANCHOR && link) {
            element.setAttribute('href', link);
            setLink('');
          }

          element.appendChild(selection.extractContents());
          selection?.insertNode(element);

          if (mainParent) {
            mainParent.normalize();
          }
        }
      }

      if (!Range && window.getSelection()) {
        if (window.getSelection()?.empty()) {
          window.getSelection()?.empty();
        } else if (window.getSelection()?.removeAllRanges) {
          window.getSelection()?.removeAllRanges();
        }
      }

      setCurrentRange(null);

      const editorElement = document.getElementById(id);

      if (editorElement) {
        onChangeEditor(editorElement.innerHTML);
      }
    }
  };

  const addLink = () => {
    const linkInput = document.getElementById(idLinkInput) as HTMLInputElement;

    if (linkInput) {
      wrapTextToTag(TAGS.ANCHOR);
      setIsPopupOpen(false);
    }
  };

  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e?.target?.value ?? '');
  };

  return {
    localValue,
    wrapTextToTag,
    onChangeEditor,
    isPopupOpen,
    idLinkInput,
    link,
    insertList,
    insertTagAtCaret,
    handleOpenLinkModal,
    handleCloseLinkModal,
    onChangeLink,
    addLink,
  };
};
