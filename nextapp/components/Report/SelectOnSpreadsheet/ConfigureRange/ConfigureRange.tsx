import { EntireColumnsSelection, EntireRowsSelection } from 'react-spreadsheet';

const ConfigureRange = ({
  data,
  selectedStart,
  selectedEnd,
  setSelected,
  activeSheet,
  setActiveSheet,
}: {
  data: any;
  selectedStart?: { row?: number; column?: number } | null;
  selectedEnd?: { row?: number; column?: number } | null;
  setSelected?: any;
  setActiveSheet?: any;
  activeSheet?: string;
}) => {
  const onHover = (item: any) => {
    const sheets = item?.sheet ?? [];
    if (activeSheet && sheets.length > 0) {
      if (!sheets.includes(activeSheet)) {
        setActiveSheet(sheets[0]);
      }
    }

    let selected = null;
    if (item?.column) {
      selected = new EntireColumnsSelection(item?.column, item?.column);
    }

    if (item?.row) {
      selected = new EntireRowsSelection(item?.row, item?.row);
    }

    if (selected) {
      console.log(selected);
      setSelected(selected);
    }
  };

  const selectedStartColumn = selectedStart?.column;
  const selectedStartRow = selectedStart?.row;
  const selectedEndColumn = selectedEnd?.column;
  const selectedEndRow = selectedEnd?.row;

  // Array from range
  const selectedColumns =
    selectedEndColumn && selectedStartColumn
      ? Array.from(
          { length: selectedEndColumn - selectedStartColumn + 1 },
          (_, i) => selectedStartColumn + i,
        )
      : [];
  const selectedRows =
    selectedEndRow && selectedStartRow
      ? Array.from(
          { length: selectedEndRow - selectedStartRow + 1 },
          (_, i) => selectedStartRow + i,
        )
      : [];

  return (
    <>
      {Object.keys(data).map((key) => {
        const item = data[key as keyof typeof data];
        const isItemSelected =
          selectedColumns.includes(item?.column) ||
          selectedRows.includes(item?.row);
        return (
          <div key={key}>
            <div
              className={`p-1 rounded-full border-solid border mb-2 border-black text-sm ${isItemSelected ? 'bg-gray-200' : ''}`}
              // onMouseEnter={() => {
              //   onHover(item);
              // }}
              // onMouseLeave={() => {
              //   setSelected(undefined);
              // }}
            >
              {item?.text}
            </div>
          </div>
        );
      })}
    </>
  );
};

// Выявлено наруше-ний законов	Прине-сено проте-стов	Из рассмотренных протестов		Направлено исков (заявлений) в суд общей юрисдикции, в арбитраж-ный суд	"На сумму
// (в тыс. руб.)"	Из рассмотренных судом исков (заявлений)		Внесено представ-лений	По представ-лению про-курора прив-лечено лиц к дисципл. ответствен-ности	По постановле-нию (заявлению в арбитражный суд)  прокурора привлечено лиц к адм. ответств.	Предостере-жено лиц о недопус-тимости нарушения  закона	"Направлено материалов для решения вопроса об уголовном преследовании в порядке
// п. 2 ч. 2 ст. 37 УПК РФ"	"Возбуждено уголовных дел по материалам, направленным прокурором в порядке
// п. 2 ч. 2  ст. 37 УПК РФ"
// 		откло-нено	по удовлетво-ренным проте-стам отменено и изменено незаконных правовых актов			 удовлетворено и прекращено дел ввиду до-бровольного удовлетворения требований прокурора	"на сумму
// (в тыс. руб.)"

export default ConfigureRange;
