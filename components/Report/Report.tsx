// const a  = {
//   cols: {
//     "G": "SummaryNarusheniyOfRules",
//     .
//     .
//     .
//     .
//     .
//     .
//     .
//   },
//   rows: {
//     "33": "Summary",
//     "34": "Migration",
//
//   }
//
// }

// BACKEND
// FILE:  file... XLSX, XLS, CSV
// JSON-SCHEMA: {json}

// df = pd.read_excel()
// df.iloc[6, 34]

import FileUpload from './FileUpload/FileUpload';
import SelectOnSpreadsheet from './SelectOnSpreadsheet/SelectOnSpreadsheet';
import { useState } from 'react';
import cn from 'classnames';

const Report = () => {
  const [data, setData] = useState<Record<string, string>>({});
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className={'max-h-full flex'}>
      <FileUpload
        show={show}
        updateShow={setShow}
        updateData={setData}
        route={'http://localhost:8000/get-excel-data'}
      />
      <div
        className={cn('max-h-full max-w-full', {
          'opacity-50 pointer-events-none': show,
        })}
      >
        <SelectOnSpreadsheet data={data} />
      </div>
    </div>
  );
};

export default Report;
