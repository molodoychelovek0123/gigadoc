import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import { Writable } from 'stream';

import { parse, HTMLElement } from 'node-html-parser';

const docx2html = require('docx2html');

const findCloseIndex = (
  startIndex: number,
  elements: HTMLElement[],
): number => {
  let closeIndex = startIndex;
  for (let i = startIndex; i < elements.length; i++) {
    const currentText = elements[i].textContent || '';
    if (currentText.includes('}')) {
      if (currentText.includes('}}')) {
        closeIndex = i;
      } else {
        const nextText = elements[i + 1].textContent || '';
        if (nextText.includes('}')) {
          closeIndex = i + 1;
        }
      }
      break;
    }
  }
  return closeIndex;
};

const concatenateText = (
  startIndex: number,
  endIndex: number,
  elements: HTMLElement[],
): string => {
  let newTextContent = elements[startIndex].textContent || '';
  for (let i = startIndex + 1; i <= endIndex; i++) {
    newTextContent += elements[i].textContent || '';
    elements[i].remove();
  }
  return newTextContent;
};

const replaceTextWithSpan = (textContent: string): string => {
  return textContent.replace(
    /{{\s*(\w+)\s*}}/g,
    "<span class='text--selector' data-text-item='$1'> ____ </span>",
  );
};

const enrichHTMLWithCorrectTags = (root: HTMLElement) => {
  root.querySelector('title')?.remove();
  const allElements = root.querySelectorAll('span');

  allElements.forEach((el, index) => {
    const text = el.textContent || '';

    if (text.includes('{{')) {
      let newHtml = '';
      if (text.includes('}}')) {
        newHtml = replaceTextWithSpan(text);
      } else {
        const closeIndex = findCloseIndex(index, allElements);
        const newTextContent = concatenateText(index, closeIndex, allElements);
        newHtml = replaceTextWithSpan(newTextContent);
      }
      el.innerHTML = newHtml;
    }
  });
  return root;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const data = Number(req?.query?.id ?? 0);
      let result;
      switch (data) {
        case 1:
          result = await docx2html(
            'public\\постановление_об_отмене_постановления_об_отказе_возбуждкния_УД_пример.docx',
          ).then((html: any) => {
            return html.toString();
          });
          break;
        case 2:
          result = await docx2html(
            'public\\постановление_об_отмене_постановления_об_отказе_возбуждкния_УД_пример.docx',
          ).then((html: any) => {
            return html.toString();
          });
          break;
        default:
          result = 'not found';
          return res.status(404).json({ message: result });
      }
      return res.status(200).json({ message: result });
    }
    if (req.method === 'POST') {
      const data: {
        fields: formidable.Fields<string>;
        files: formidable.Files<string>;
      } = await new Promise((resolve, reject) => {
        const form = new IncomingForm({
          multiples: false,
        });
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      try {
        const myFile =
          (data?.files?.file as unknown as formidable.File) ?? undefined;
        const currentPath = myFile?.filepath ?? 'public';
        const pathToWriteFile = `public\\${myFile?.originalFilename?.replaceAll(' ', '_')}`;

        // const readedFile = await fs.readFile(currentPath);
        // await fs.writeFile(pathToWriteFile, readedFile);

        let result = '';
        try {
          result = await docx2html(currentPath)
            .then((html: any) => {
              return html.toString();
            })
            .catch((e: any) => {
              return 'Failed parse file';
            });
        } catch (e) {
          return res
            .status(500)
            .json({ error: 'Failed parse file', code: '100' });
        }

        console.log(result);

        const root = parse(result);
        result = '';
        const newHtml = enrichHTMLWithCorrectTags(root).toString();

        return res.status(200).json({ result: newHtml });
      } catch (e) {
        console.log(e);

        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
