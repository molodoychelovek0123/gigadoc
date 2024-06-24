import { FormEvent, RefObject, useEffect, useRef } from 'react';

export const Editor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const caretPos = useRef(0);
  const getCaret = (el: HTMLDivElement) => {
    const sel = window.getSelection();

    if (sel?.rangeCount == 0) {
      return 0;
    }

    const range = sel?.getRangeAt(0);
    if (range) {
      const preRange = range?.cloneRange();
      preRange?.selectNodeContents(el);
      preRange?.setEnd(range?.endContainer, range?.endOffset);

      const caretAt = preRange.toString().length;

      return caretAt;
    }

    return 0;
  };

  const setCaret = (el: HTMLDivElement, offset: number) => {
    let sel = window.getSelection();
    let range = document.createRange();

    const getIndex = () => {
      let newOffset = offset;

      for (let index = 0; index < (el.childNodes?.length ?? 0); index++) {
        const child = el.childNodes[index];
        const length = child?.textContent?.length ?? 0;
        if (newOffset < length) {
          console.log(child, length, newOffset);
          return { offset: newOffset, index };
        }

        newOffset -= length;
      }

      if (newOffset === 0) {
        const child = el.childNodes[el.childNodes.length - 1];
        const length = child?.textContent?.length ?? 0;

        return { offset: length, index: el.childNodes.length - 1 };
      }

      return { offset, index: 0 };
    };

    const { offset: newOffset, index: idx } = getIndex();
    try {
      range.setStart(el.childNodes[idx] ?? el, newOffset);
    } catch (e) {
      console.error(e);
      console.log(
        newOffset,
        idx,
        el.childNodes[idx],
        el.childNodes[idx]?.textContent?.length ?? null,
      );
      range.setStart(el, 0);
    }
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  useEffect(() => {
    if (editorRef.current) {
      setCaret(editorRef.current, caretPos.current);
      editorRef.current.focus();
    }
  }, [content]);

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    if (editorRef.current) {
      caretPos.current = getCaret(editorRef.current);
      setContent(e.currentTarget.innerHTML);
    }
  };

  return (
    <div
      className={'bg-white h-full overflow-auto outline-0'}
      ref={editorRef}
      id="editor"
      dangerouslySetInnerHTML={{ __html: content }}
      contentEditable
      onInput={handleInput}
    />
  );
};
