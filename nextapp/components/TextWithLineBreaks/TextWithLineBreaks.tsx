import { Fragment } from 'react';
import { randomUUID } from 'crypto';
import { uuid } from 'uuidv4';

type Props = {
  text: string;
};
export const TextWithLineBreaks = ({ text }: Props) => (
  <>
    {text.split('\n').map((text, index) => (
      <Fragment key={uuid()}>
        {text}
        <br />
      </Fragment>
    ))}
  </>
);
