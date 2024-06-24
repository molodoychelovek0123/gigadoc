import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  fillValue,
  getValue,
  parseFormFields,
} from '@/components/Create/utils';
import { FormInput } from '@/components/FormInput/FormInput';
import { TextEditor } from '@/components/TextEditor/TextEditor';
import FileUpload from '@/components/Report/FileUpload/FileUpload';
import getConfig from 'next/config';
import { ModalWithSingleInput } from '@/components/ModalWithSingleInput/ModalWithSingleInput';
import Snackbar from 'awesome-snackbar';
import { ModalPreviewDocuments } from '@/components/ModalPreviewDocuments/ModalPreviewDocuments';
import { ESResultItem } from '@/components/ModalPreviewDocuments/types';
import { getSemantics } from '@/globals/utils/getSemantics';
import { Loader } from '@/components/Loader/Loader';
import { number } from 'prop-types';
import { LABELS } from '@/globals/constants';

type Inputs = {
  exampleRequired: string;
  [k: string]: string;
};

const {
  publicRuntimeConfig: { esServiceUrl, msToolbertUrl, docxPressUrl },
} = getConfig();
export const UploadCreate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [html, setHtml] = useState<string | null>(null);
  const [plainTextInitialDocument, setPlainTextInitialDocument] = useState<
    string | null
  >(null);
  const [fields, setFields] = useState<string[]>([]);

  const [focusedField, setFocusedField] = useState('');

  const [fieldsHint, setFieldsHint] = useState<
    Record<(typeof fields)[number], string[]>[]
  >(
    {
      fields: [
        {
          city: ['', '', '[SEP]', ''],
        },
        {
          currentDate: [
            '2019',
            '25 февраля 2019',
            '25 февраля 2019',
            '25 февраля 2019',
          ],
        },
        {
          seller: ['', '', '', ''],
        },
        {
          buyer: ['', '', '', '[SEP]'],
        },
        {
          automobile_marka: ['', '', '', '[SEP]'],
        },
        {
          automobile_model: [
            '[SEP]',
            '[SEP] Отчет о сданном в эксплуатацию домеДом был сдан в эксплуатацию 25 февраля 2019 года. В дом входит 35 квартир, из них : 1 квартира типа 1 - а1 квартира типа 1 - г1 квартира типа 1 - д8 квартир типа 2 - а8 квартир типа 2 - б8 квартир типа 2 - в8 квартир типа 2 - гПлощадь помещений в квартирахКвартира типа 1 - а : Общая комната : 51. 17 м²Спальня : 0 м²Кухня : 15. 36 м²Совмещенный санузел : 6. 97 м²Передняя : 22. 49 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 32 м²Площадь летних помещений : 4. 66 м²Общая площадь ( на 1 ) : 100. 65 м²Площадь квартиры без учета летних помещений : 95. 99 м²Жилая площадь квартиры : 51. 17 м²Квартира типа 1 - г : Общая комната : 45. 79 м²Спальня : 0 м²Кухня : 15. 77 м²Совмещенный санузел : 10. 17 м²Передняя : 18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( на [SEP]',
            '[SEP]',
            '',
          ],
        },
        {
          VIN: [
            '[SEP] Отчет о сданном в эксплуатацию домеДом был сдан в эксплуатацию 25 февраля 2019 года. В дом входит 35 квартир, из них : 1 квартира типа 1 - а1 квартира типа 1 - г1 квартира типа 1 - д8 квартир типа 2 - а8 квартир типа 2 - б8 квартир типа 2 - в8 квартир типа 2 - гПлощадь помещений в квартирахКвартира типа 1 - а : Общая комната : 51. 17 м²Спальня : 0 м²Кухня : 15. 36 м²Совмещенный санузел : 6. 97 м²Передняя : 22. 49 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 32 м²Площадь летних помещений : 4. 66 м²Общая площадь ( на 1 ) : 100. 65 м²Площадь квартиры без учета летних помещений : 95. 99 м²Жилая площадь квартиры : 51. 17 м²Квартира типа 1 - г : Общая комната : 45. 79 м²Спальня : 0 м²Кухня : 15. 77 м²Совмещенный санузел : 10. 17 м²Передняя : 18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( [SEP]',
            '',
            '[SEP] Отчет о сданном в эксплуатацию домеДом был сдан в эксплуатацию 25 февраля 2019 года. В дом входит 35 квартир, из них : 1 квартира типа 1 - а1 квартира типа 1 - г1 квартира типа 1 - д8 квартир типа 2 - а8 квартир типа 2 - б8 квартир типа 2 - в8 квартир типа 2 - гПлощадь помещений в квартирахКвартира типа 1 - а : Общая комната : 51. 17 м²Спальня : 0 м²Кухня : 15. 36 м²Совмещенный санузел : 6. 97 м²Передняя : 22. 49 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 32 м²Площадь летних помещений : 4. 66 м²Общая площадь ( на 1 ) : 100. 65 м²Площадь квартиры без учета летних помещений : 95. 99 м²Жилая площадь квартиры : 51. 17 м²Квартира типа 1 - г : Общая комната : 45. 79 м²Спальня : 0 м²Кухня : 15. 77 м²Совмещенный санузел : 10. 17 м²Передняя : 18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( на 1 [SEP]',
            '',
          ],
        },
        {
          subject_item_year: ['2019', '2019', '2019', '25 февраля 2019'],
        },
        {
          automobile_color: ['', '', '', ''],
        },
        {
          automobile_probeg: [
            '',
            '18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( [SEP]',
            '',
            '',
          ],
        },
        {
          price: ['', '', '', ''],
        },
        {
          payment_terms: ['', '2019', '', ''],
        },
        {
          registration_address_seller: ['[SEP]', '[SEP]', '[SEP]', '[SEP]'],
        },
        {
          passport_info_seller: ['[SEP]', '[SEP]', '[SEP]', '[SEP]'],
        },
        {
          registration_address_buyer: ['[SEP]', '[SEP]', '[SEP]', '[SEP]'],
        },
        {
          passport_info_buyer: [
            '[SEP] Отчет о сданном в эксплуатацию домеДом был сдан в эксплуатацию 25 февраля 2019 года. В дом входит 35 квартир, из них : 1 квартира типа 1 - а1 квартира типа 1 - г1 квартира типа 1 - д8 квартир типа 2 - а8 квартир типа 2 - б8 квартир типа 2 - в8 квартир типа 2 - гПлощадь помещений в квартирахКвартира типа 1 - а : Общая комната : 51. 17 м²Спальня : 0 м²Кухня : 15. 36 м²Совмещенный санузел : 6. 97 м²Передняя : 22. 49 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 32 м²Площадь летних помещений : 4. 66 м²Общая площадь ( на 1 ) : 100. 65 м²Площадь квартиры без учета летних помещений : 95. 99 м²Жилая площадь квартиры : 51. 17 м²Квартира типа 1 - г : Общая комната : 45. 79 м²Спальня : 0 м²Кухня : 15. 77 м²Совмещенный санузел : 10. 17 м²Передняя : 18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( [SEP]',
            '[SEP]',
            '[SEP] Отчет о сданном в эксплуатацию домеДом был сдан в эксплуатацию 25 февраля 2019 года. В дом входит 35 квартир, из них : 1 квартира типа 1 - а1 квартира типа 1 - г1 квартира типа 1 - д8 квартир типа 2 - а8 квартир типа 2 - б8 квартир типа 2 - в8 квартир типа 2 - гПлощадь помещений в квартирахКвартира типа 1 - а : Общая комната : 51. 17 м²Спальня : 0 м²Кухня : 15. 36 м²Совмещенный санузел : 6. 97 м²Передняя : 22. 49 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 32 м²Площадь летних помещений : 4. 66 м²Общая площадь ( на 1 ) : 100. 65 м²Площадь квартиры без учета летних помещений : 95. 99 м²Жилая площадь квартиры : 51. 17 м²Квартира типа 1 - г : Общая комната : 45. 79 м²Спальня : 0 м²Кухня : 15. 77 м²Совмещенный санузел : 10. 17 м²Передняя : 18. 05 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 13. 6 м²Площадь летних помещений : 6. 8 м²Общая площадь ( на 1 ) : 96. 58 м²Площадь квартиры без учета летних помещений : 89. 78 м²Жилая площадь квартиры : 45. 79 м²Квартира типа 1 - д : Общая комната : 53. 94 м²Спальня : 0 м²Кухня : 17. 95 м²Совмещенный санузел : 8. 15 м²Передняя : 26. 29 м²Уборная : 0 м²Ванная комната : 0 м²Лоджия : 9. 83 м²Площадь летних помещений : 4. 92 м²Общая площадь ( на 1 ) : 111. 25 м²Площадь квартиры без учета летних помещений : 106. 33 м²Жилая площадь квартиры : 53. 94 м²Квартира типа 2 - а : Общая комната : 17. 32 м²Спальня : 17. 76 м²Кухня : 14. 99 м²Совмещенный санузел : 0 м²Передняя : 12. 95 м²Уборная : 11. 21 м²Ванная комната : 13. 28 м²Лоджия : 16. 46 м²Площадь летних помещений : 8. 23 м²Общая площадь ( [SEP]',
            '[SEP]',
          ],
        },
        {
          startDate: [
            '2019',
            '25 февраля 2019',
            '25 февраля 2019',
            '25 февраля 2019',
          ],
        },
      ],
    }.fields,
  );
  // Первый этап загрузка документа
  // Второй этап что вы хотите сгенерировать
  // Третий этап выбор пользака
  // Потом нужно отправить все в ms_toolbert
  const [currentStep, setCurrentStep] = useState<number>(0);

  console.log('plainTextInitialDocument', plainTextInitialDocument);

  useEffect(() => {
    const value = watchAllFields[focusedField];
    if (html && (value?.length ?? 0) > 0 && (focusedField?.length ?? 0) > 0) {
      setHtml(fillValue(html, value, focusedField));
    }
  }, [focusedField, html, watchAllFields]);

  const [esResults, setEsResults] = useState<ESResultItem[]>([]);

  const onSubmitStep1 = async (userSearchString: string) => {
    setEsResults([]);
    try {
      const responseByContent: ESResultItem[] = await fetch(
        `${esServiceUrl}/search/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search_string: `${plainTextInitialDocument}`,
          }),
        },
      ).then((res) => res.json());
      setEsResults((prev) => [...prev, ...responseByContent]);
    } catch (e) {
      console.error;
    }
    try {
      const responseByQuery: ESResultItem[] = await fetch(
        `${esServiceUrl}/search/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search_string: `${userSearchString}` }),
        },
      ).then((res) => res.json());

      setEsResults((prev) => [...prev, ...responseByQuery]);

      setCurrentStep((prevState) => prevState + 1);
    } catch (e) {
      console.error(e);

      new Snackbar(`Произошла неизвестная ошибка`, {
        position: 'bottom-center',
        actionText: 'Повторить',
        onAction: () => onSubmitStep1(userSearchString),
        style: {
          container: [
            ['background-color', 'red'],
            ['border-radius', '5px'],
          ],
          message: [['color', '#eee']],
          bold: [['font-weight', 'bold']],
          actionButton: [
            ['color', 'white'],
            ['font-weight', 'bold'],
          ],
        },
      });
    }
  };

  const onSubmitStep2 = async (item: ESResultItem) => {
    let step2Fields: string[] = [];
    try {
      setCurrentStep((prev) => prev + 1);
      const res: { result: string } = await fetch(
        `${docxPressUrl}/file/?filename=${item.filename}`,
      ).then((res) => res.json());

      step2Fields = parseFormFields(res.result);
      setHtml(res.result);
      setFields(step2Fields);
    } catch (e) {
      alert('Произошла ошибка. Попробуйте ещё раз.');
    }

    setCurrentStep((prevState) => prevState + 1);

    try {
      new Snackbar(`Началась загрузка данных по семантике`, {
        position: 'bottom-center',
        style: {
          container: [['border-radius', '5px']],
          message: [['color', '#000']],
          bold: [['font-weight', 'bold']],
        },
      });
      const preFillFields = await getSemantics({
        context: plainTextInitialDocument ?? '',
        fields: step2Fields,
        limit: 2,
      });
      setFieldsHint(preFillFields?.fields ?? []);
    } catch (e) {
      new Snackbar(
        `Произошла неизвестная ошибка при обогащении данных по семантике`,
        {
          position: 'bottom-center',
          style: {
            container: [
              ['background-color', 'red'],
              ['border-radius', '5px'],
            ],
            message: [['color', '#eee']],
            bold: [['font-weight', 'bold']],
          },
        },
      );
      console.error(e);
    }
  };

  console.log(esResults);

  return (
    <div
      className={`grid ${isFullScreen ? 'grid-cols-1' : 'grid-cols-2'}  p-6 gap-8 h-full relative`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-text-item="${focusedField}"]{background: #ffff0075;}`,
        }}
      />
      <div
        className={` cutout bg-[#F3F3F3] p-4 overflow-y-auto overflow-x-hidden ${isFullScreen ? 'hidden' : ''}`}
      >
        <div className="text-sm font-bold uppercase">Шаблоны документов</div>

        {fields.map((name, index) => {
          return (
            <FormInput
              name={name}
              key={name}
              setValue={(name, value) => {
                if (
                  html &&
                  (value?.length ?? 0) > 0 &&
                  (name?.length ?? 0) > 0
                ) {
                  setHtml(fillValue(html, value, name));
                  setFocusedField(name);
                }

                setValue(name, value);
              }}
              label={LABELS[name] ?? name}
              placeholder={'Введите значение'}
              formRegister={register(name)}
              hints={
                fieldsHint?.find((item) => typeof item[name] !== 'undefined')?.[
                  name
                ] ?? []
              }
              onFocus={() => {
                setValue(name, getValue(html ?? '', name) ?? '');
                setFocusedField(name);
              }}
              onBlur={() => {
                setFocusedField('');
              }}
            />
          );
        })}
      </div>
      <div
        className={
          ' cutout bg-[#F3F3F3] p-4 max-h-full overflow-y-auto overflow-x-hidden'
        }
      >
        <div
          className={'absolute top-2 right-2 cursor-pointer z-50'}
          onClick={() => setIsFullScreen((prev) => !prev)}
        >
          <img
            src={'/icons/fscreen.svg'}
            className={'h-6 w-6 cursor-pointer'}
          />
        </div>
        <TextEditor
          value={html ?? ''}
          onChange={setHtml}
          isFullScreen={isFullScreen}
          openFullScreen={() => setIsFullScreen(true)}
          closeFullScreen={() => setIsFullScreen(false)}
          id={'create-editor'}
          key={'EDITOR'}
          isDisabled={false}
        />
      </div>

      {/* MODALS */}
      <FileUpload
        show={currentStep === 0}
        updateShow={() => setCurrentStep((prevState) => prevState + 1)}
        updateData={(data) => {
          setPlainTextInitialDocument(data as any);
        }}
        route={`${docxPressUrl}/file/upload?format=text`}
      />

      <ModalWithSingleInput
        show={currentStep === 1}
        title={'Какой документ хотите получить'}
        label={'Наименование документа, который хотите получить '}
        placeholder={'Договор купли-продажи автомобиля'}
        onSubmit={onSubmitStep1}
      />
      <ModalPreviewDocuments
        show={currentStep === 2}
        items={esResults}
        onChoose={onSubmitStep2}
      />
      <Loader show={currentStep === 3} withBlur={true} />
    </div>
  );
};
