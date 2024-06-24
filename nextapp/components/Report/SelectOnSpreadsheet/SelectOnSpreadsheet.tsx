import Spreadsheet, {
  EntireRowsSelection,
  Matrix,
  Point,
  Selection,
} from 'react-spreadsheet';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { transformObjectDataToSpreadsheetArray } from './utils';
import ConfigureRange from '@/components/Report/SelectOnSpreadsheet/ConfigureRange/ConfigureRange';
import DownloadWord from '@/components/Report/SelectOnSpreadsheet/DownloadWord/DownloadWord';

/*
const dataLabels = {
  violations_of_the_law: {
    text: 'Выявлено нарушений закона',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 6,
  },
  protests_brought: {
    text: 'Принесено протестов',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 7,
  },
  protests_reviewed__decline: {
    text: 'Из рассмотренных протестов - отклонено',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 8,
  },
  protests_reviewed__apply: {
    text: 'Из рассмотренных протестов - удовлетворено',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 9,
  },
  directed_claims_to_court: {
    text: 'Направленные претензии в суд',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 10,
  },

  amount_in_thousands_rubles: {
    text: 'Сумма в тысячах рублей',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 11,
  },
  claims_satisfied_terminated: {
    text: 'Претензии удовлетворены - прекращено  ввиду добровольного удовлетворения требований прокурора',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 12,
  },
  claims_satisfied_amount: {
    text: 'Претензии удовлетворены - Сумма в тысячах рублей',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 13,
  },
  submissions_made: {
    text: 'Внесено представлений',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 14,
  },
  individuals_brought_to_disciplinary_responsibility: {
    text: 'По представлению прокурора привлечено лиц на дисциплинарную ответственность',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 15,
  },
  individuals_brought_to_administrative_responsibility: {
    text: 'По представлению прокурора привлечено лиц на административную ответственность',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 16,
  },
  warned_about_inadmissibility: {
    text: 'Предостережено лиц о недопустимости нарушения  закона',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 17,
  },
  materials_sent_for_criminal_prosecution: {
    text:
      'Направлено материалов для решения вопроса об уголовном преследовании в порядке\n' +
      'п. 2 ч. 2 ст. 37 УПК РФ',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 18,
  },
  criminal_cases_initiated: {
    text:
      'Возбуждено уголовных дел по материалам, направленным прокурором в порядке\n' +
      'п. 2 ч. 2  ст. 37 УПК РФ',
    sheet: ['Раздел 1', 'Раздел 2', 'Раздел 3'],
    column: 19,
  },

  // В сфере экономики
  // В сфере экономики - всего
  // В сфере экономики - о  государственной и муниципальной собственности
  // В сфере экономики - о  землепользовании
  // В сфере экономики - о  кредитно-банковской деятельности
  // В сфере экономики - о  налогах
  // В сфере экономики - о  бюджете
  // В сфере экономики - о закупках товаров, работ, услуг для обеспечения государственных и муниципальных нужд, а также отдельными видами юридических лиц
  // В сфере экономики - о  лицензировании
  // В сфере экономики - о банкротстве
  // В сфере экономики - об охране интеллектуальной собственности, авторских  и смежных прав
  // В сфере экономики - о градостроительной деятельности
  economy_total: {
    text: 'В сфере экономики - Всего',
    sheet: ['Раздел 1'],
    row: 7,
  },
  economy_state_municipal_property: {
    text: 'В сфере экономики - о  государственной и муниципальной собственности',
    sheet: ['Раздел 1'],
    row: 8,
  },
  economy_land_use: {
    text: 'В сфере экономики - о землепользовании',
    sheet: ['Раздел 1'],
    row: 9,
  },
  economy_credit_banking_activities: {
    text: 'В сфере экономики - о кредитно-банковской деятельности',
    sheet: ['Раздел 1'],
    row: 10,
  },
  economy_taxes: {
    text: 'В сфере экономики - о налогах',
    sheet: ['Раздел 1'],
    row: 11,
  },
  economy_budget: {
    text: 'В сфере экономики - о бюджете',
    sheet: ['Раздел 1'],
    row: 12,
  },
  economy_procurement: {
    text: 'В сфере экономики - о закупках товаров, работ, услуг для обеспечения государственных и муниципальных нужд, а также отдельными видами юридических лиц',
    sheet: ['Раздел 1'],
    row: 13,
  },
  economy_license: {
    text: 'В сфере экономики - о лицензировании',
    sheet: ['Раздел 1'],
    row: 14,
  },
  economy_bankruptcy: {
    text: 'В сфере экономики - о банкротстве',
    sheet: ['Раздел 1'],
    row: 15,
  },
  economy_intellectual_property: {
    text: 'В сфере экономики - об охране интеллектуальной собственности, авторских  и смежных прав',
    sheet: ['Раздел 1'],
    row: 16,
  },
  economy_construction: {
    text: 'В сфере экономики - о градостроительной деятельности',
    sheet: ['Раздел 1'],
    row: 17,
  },

  //  В области охраны окружающей среды и природопользования - всего
  //  В области охраны окружающей среды и природопользования -  об охране земли, почв
  //  В области охраны окружающей среды и природопользования -  об охране вод и атмосферного воздуха
  //  В области охраны окружающей среды и природопользования -  об отходах производства и потребления
  //  В области охраны окружающей среды и природопользования -  об охране и использовании животного мира
  //  В области охраны окружающей среды и природопользования -  о лесопользовании
  //  В области охраны окружающей среды и природопользования -  о рыболовстве, водных биоресурсах и аквакультуре
  environmental_total: {
    text: 'В области охраны окружающей среды и природопользования - всего',
    sheet: ['Раздел 1'],
    row: 19,
  },
  environmental_land: {
    text: 'Об охране земли, почв',
    sheet: ['Раздел 1'],
    row: 20,
  },
  environmental_water: {
    text: 'Об охране вод и атмосферного воздуха',
    sheet: ['Раздел 1'],
    row: 21,
  },
  environmental_waste: {
    text: 'Об отходах производства и потребления',
    sheet: ['Раздел 1'],
    row: 22,
  },
  environmental_animals: {
    text: 'Об охране и использовании животного мира',
    sheet: ['Раздел 1'],
    row: 23,
  },
  environmental_forest: {
    text: 'О лесопользовании',
    sheet: ['Раздел 1'],
    row: 24,
  },
  environmental_fish: {
    text: 'О рыболовстве, водных биоресурсах и аквакультуре',
    sheet: ['Раздел 1'],
    row: 25,
  },

  //   В сфере соблюдения прав и свобод человека и гражданина
  //   В сфере соблюдения прав и свобод человека и гражданина - о  миграции
  //   В сфере соблюдения прав и свобод человека и гражданина - о здравоохранении
  //   В сфере соблюдения прав и свобод человека и гражданина - об избирательных правах
  //   В сфере соблюдения прав и свобод человека и гражданина - о  воинской обязанности и военной службе
  //   В сфере соблюдения прав и свобод человека и гражданина - о  трудовых правах
  //   В сфере соблюдения прав и свобод человека и гражданина - об охране труда и произв. травматизме
  //   В сфере соблюдения прав и свобод человека и гражданина - об оплате труда
  //   В сфере соблюдения прав и свобод человека и гражданина - о занятости
  //   В сфере соблюдения прав и свобод человека и гражданина - о жилищных правах граждан
  //   В сфере соблюдения прав и свобод человека и гражданина - о  пенсионном законодательстве, об охране прав инвалидов и престарелых
  //   В сфере соблюдения прав и свобод человека и гражданина - об обращениях граждан
  //   В сфере соблюдения прав и свобод человека и гражданина - об обеспечении безопасности граждан в местах массового пребывания

  human_rights_total: {
    text: 'В сфере соблюдения прав и свобод человека и гражданина - всего',
    sheet: ['Раздел 1'],
    row: 27,
  },
  human_rights_migration: {
    text: 'Права и свободы человека - о миграции',
    sheet: ['Раздел 1'],
    row: 28,
  },
  human_rights_healthcare: {
    text: 'Права и свободы человека - о здравоохранении',
    sheet: ['Раздел 1'],
    row: 29,
  },
  human_rights_elections: {
    text: 'Права и свободы человека - об избирательных правах',
    sheet: ['Раздел 1'],
    row: 30,
  },
  human_rights_military: {
    text: 'Права и свободы человека - о воинском обязанности и военной службе',
    sheet: ['Раздел 1'],
    row: 31,
  },
  human_rights_workers_rights: {
    text: 'Права и свободы человека - о трудовых правах',
    sheet: ['Раздел 1'],
    row: 32,
  },
  human_rights_workers_rights_occupational_injuries: {
    text: 'Права и свободы человека - об охране труда и произв. травматизме',
    sheet: ['Раздел 1'],
    row: 33,
  },
  human_rights_wage_payment: {
    text: 'Права и свободы человека - об оплате труда',
    sheet: ['Раздел 1'],
    row: 34,
  },
  human_rights_employment: {
    text: 'Права и свободы человека - о занятости',
    sheet: ['Раздел 1'],
    row: 35,
  },
  human_rights_rental_rights: {
    text: 'Права и свободы человека - о жилищных правах граждан',
    sheet: ['Раздел 1'],
    row: 36,
  },
}; */

const SelectOnSpreadsheet = ({ data }: { data: Record<string, string> }) => {
  const dataLabels = {
    type_1: {
      text: 'Тип 1',
      sheet: ['Sheet1'],
      column: 2,
    },
    type_2: {
      text: 'Тип 2',
      sheet: ['Sheet1'],
      column: 3,
    },
    type_3: {
      text: 'Тип 3',
      sheet: ['Sheet1'],
      column: 4,
    },
    type_4: {
      text: 'Тип 4',
      sheet: ['Sheet1'],
      column: 5,
    },
    type_5: {
      text: 'Тип 5',
      sheet: ['Sheet1'],
      column: 6,
    },
    type_6: {
      text: 'Тип 6',
      sheet: ['Sheet1'],
      column: 7,
    },
    type_7: {
      text: 'Тип 7',
      sheet: ['Sheet1'],
      column: 8,
    },
    name: {
      text: 'Название',
      sheet: ['Sheet1'],
      row: 1,
    },
    living_room: {
      text: 'Общая комната',
      sheet: ['Sheet1'],
      row: 2,
    },
    bedroom: {
      text: 'Спальня',
      sheet: ['Sheet1'],
      row: 3,
    },
    kitchen: {
      text: 'Кухня',
      sheet: ['Sheet1'],
      row: 4,
    },
    bathroom: {
      text: 'Совмещенный санузел',
      sheet: ['Sheet1'],
      row: 5,
    },
    hallway: {
      text: 'Передняя',
      sheet: ['Sheet1'],
      row: 6,
    },
    toilet: {
      text: 'Уборная',
      sheet: ['Sheet1'],
      row: 7,
    },
    washroom: {
      text: 'Ванная комната',
      sheet: ['Sheet1'],
      row: 8,
    },
    balcony: {
      text: 'Лоджия',
      sheet: ['Sheet1'],
      row: 9,
    },
    summer_room: {
      text: 'Площадь летних помещений',
      sheet: ['Sheet1'],
      row: 10,
    },
    total_area: {
      text: 'Общая площадь (на 1)',
      sheet: ['Sheet1'],
      row: 12,
    },
    apartment_area_without_summer: {
      text: 'Площадь квартиры без учета летних помещений',
      sheet: ['Sheet1'],
      row: 14,
    },
    living_area: {
      text: 'Жилая площадь (на 1)',
      sheet: ['Sheet1'],
      row: 15,
    },
    count: {
      text: 'Кол-во',
      sheet: ['Sheet1'],
      row: 16,
    },
  };
  // •	Общая комната: {{living_room__type_7}} м²
  // •	Спальня: {{bedroom__type_7}} м²
  // •	Кухня: {{kitchen__type_7}} м²
  // •	Совмещенный санузел: {{bathroom__type_7}} м²
  // •	Передняя: {{hallway__type_7}} м²
  // •	Уборная: {{toilet__type_7}} м²
  // •	Ванная комната: {{washroom__type_7}} м²
  // •	Лоджия: {{balcony__type_7}} м²
  // •	Площадь летних помещений: {{summer_room__type_7}} м²
  // •	Общая площадь (на 1): {{total_area__type_7}} м²
  // •	Площадь квартиры без учета летних помещений: {{apartment_area_without_summer__type_7}} м²
  // •	Жилая площадь квартиры: {{living_area__type_7}} м²
  const keys = Object.keys(data);

  const [selected, setSelected] = useState<Selection | undefined>();
  const [activeKey, setActiveKey] = useState<string>(keys[0]);
  const [activeData, setActiveData] = useState<
    Matrix<{ value: string; readonly: boolean }>
  >([[]]);

  const [selectedStart, setSelectedStart] = useState<{
    row: number;
    column: number;
  } | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<{
    row: number;
    column: number;
  } | null>(null);

  useEffect(() => {
    setActiveKey(Object.keys(data)[0]);
  }, [data]);

  useEffect(() => {
    const currentData = data[activeKey];
    if (currentData) {
      const table = JSON.parse(currentData);
      const spreadsheetData = transformObjectDataToSpreadsheetArray(table);
      setActiveData(spreadsheetData);
    }
  }, [data, activeKey]);

  // const columnLabels: string[] = ["Flavour"];
  // const rowLabels: string[] = [];

  const activate = (active: Point) => {
    const column = active.column;
    const row = active.row;

    if (column > 0 && row > 0) {
    }
  };

  const handleSelect = (NewSelected: Selection) => {
    setSelectedStart(NewSelected?.toRange(activeData)?.start ?? null);
    setSelectedEnd(NewSelected?.toRange(activeData)?.end ?? null);
    // setSelected(selected);
  };
  useEffect(() => {
    console.log('selected', selected?.toRange(activeData));
  }, [selected]);

  return (
    <div className=" p-8 max-h-full max-w-full box-border flex">
      <div className="grid select-on-spreadsheet-container max-h-full max-w-full">
        <div className="mr-4">
          {keys.length > 1 && (
            <div className="dropdown dropdown-hover block">
              <div tabIndex={0} role="button" className="btn m-1">
                {activeKey}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {keys.map((item) => (
                  <li key={item}>
                    <a
                      className={cn({ 'bg-secondary': item === activeKey })}
                      onClick={() => setActiveKey(item)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="max-w-full max-h-[95vh] overflow-scroll cutout bg-[#F3F3F3]">
            <Spreadsheet
              data={activeData}
              // columnLabels={columnLabels}
              // rowLabels={rowLabels}
              onChange={() => {}}
              onKeyDown={() => {}}
              onSelect={handleSelect}
              selected={selected}
            />
          </div>
        </div>
        <div className=" cutout bg-[#F3F3F3] ml-4  p-4 overflow-y-scroll">
          <ConfigureRange
            data={dataLabels}
            selectedEnd={selectedEnd}
            selectedStart={selectedStart}
            // setSelected={setSelected}
            setActiveSheet={setActiveKey}
            activeSheet={activeKey}
          />
          <DownloadWord spreadsheet={data} labels={dataLabels} />
        </div>
      </div>
    </div>
  );
};

export default SelectOnSpreadsheet;
