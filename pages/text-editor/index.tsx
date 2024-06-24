import { useState } from 'react';
import { TextEditor } from '@/components/TextEditor/TextEditor';

const Page = () => {
  const [html, setHtml] = useState<string | null>(null);

  return (
    <TextEditor
      value={html ?? ''}
      onChange={setHtml}
      isFullScreen={true}
      id={'create-editor'}
      key={'EDITOR'}
      isDisabled={false}
    />
  );
};

export default Page;
