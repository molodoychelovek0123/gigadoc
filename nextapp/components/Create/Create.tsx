import { SubmitHandler, useForm } from 'react-hook-form';
import { CSSProperties, useEffect, useState } from 'react';
import { Select } from '@/components/Create/Select/Select';
import ReactSelect from 'react-select';
import FileUpload from '@/components/Report/FileUpload/FileUpload';
import { Editor } from '@/components/Editor/Editor';
import { FormInput } from '@/components/FormInput/FormInput';
import {
  fillValue,
  getValue,
  highLightTextSelector,
  parseFormFields,
} from './utils';
import { TextEditor } from '@/components/TextEditor/TextEditor';
import { debounce } from 'next/dist/server/utils';
import { Loader } from '@/components/Loader/Loader';
import { LABELS } from '@/globals/constants';

type Inputs = {
  exampleRequired: string;
  [k: string]: string;
};

const Create = () => {
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
  const [html, setHtml] = useState<string | null>(
    `<div id="A" style="background-color: transparent; min-height: 1000px; width: 100%; padding-top: 20px; overflow: auto;"><style></style><section style="width: 793px; min-height: 1122px; padding: 18px 47px 75px 94px;"><p class=" Normal" style="margin-left: 37px; margin-right: 18px; text-align: right;"><span class=" DefaultParagraphFont" style="font-weight: 700;">        </span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont" style="font-weight: 700;"></span><span class=" DefaultParagraphFont"> </span></p><h2 class=" Normal Heading2" style="margin-left: -19px; margin-right: 18px; text-indent: 56px;"><span class=" DefaultParagraphFont" style="font-size: 18px;">ПОСТАНОВЛЕНИЕ</span></h2><p class=" Normal BodyText" style="margin-left: -19px; margin-right: 18px; text-indent: 56px;"><span class=" DefaultParagraphFont">об изъятии и о передаче уголовного дела</span></p><p class=" Normal BodyText" style="margin-left: -19px; margin-right: 18px; text-indent: 56px;"></p><table class=" TableNormal" id="A0" x0="1" x1="1" x2="1" x3="1" x4="1" x5="1" x6="1" x7="1" x8="1" x9="1" x10="1" x11="1" style="margin-left: -12px;"><colgroup><col style="width:26.22222222222222%"><col style="width:36.888888888888886%"><col style="width:36.888888888888886%"></colgroup><tbody><tr><td><p class=" Normal BodyText" style="margin-left: 11px; margin-right: 18px; text-align: left;"><span class=" DefaultParagraphFont" style="font-weight: 700;">г. Москва</span></p></td><td><p class=" Normal BodyText" style="margin-left: -19px; margin-right: 18px; text-indent: 56px;"></p></td><td><p class=" Normal BodyText" style="margin-left: -19px; margin-right: -3px; text-indent: 56px;"><span class=" DefaultParagraphFont" style="font-weight: 700;"> </span><span class=" DefaultParagraphFont" style="font-weight: 700;"><span class="text--selector" data-text-item="date"> ____ </span></span></p></td></tr></tbody></table><p class=" Normal" style="margin-left: -19px; margin-right: 18px; text-indent: 56px; text-align: both;"></p><p class=" Normal" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="role"> ____ </span></span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="prosecutorFio"> ____ </span></span><span class=" DefaultParagraphFont">, рассмотрев материалы уголовного дела </span><span class=" DefaultParagraphFont"></span><span class=" DefaultParagraphFont">№</span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="dealNumber"> ____ </span>,</span><span class=" DefaultParagraphFont"> поступившее из СО ОМВД России по </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="disctrict"> ____ </span></span><span class=" DefaultParagraphFont"> г. Москвы,</span></p><p class=" Normal" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: both;"></p><p class=" Normal" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: center;"><span class=" DefaultParagraphFont" style="font-weight: 700;">УСТАНОВИЛ:</span></p><p class=" Normal" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: center;"></p><p class=" ConsNonformat" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">Настоящее уголовное дело возбуждено СО Отдела МВД России </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"></span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">по</span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"> </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"> </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">району</span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"> г. Москвы </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"><span class="text--selector" data-text-item="startDate"> ____ </span></span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">  по признакам состава преступления, предусмотренного ч.</span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"> 4 </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">ст. </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">111 </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">УК РФ, </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"></span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">в отношении </span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;"><span class="text--selector" data-text-item="accusedFio"> ____ </span></span><span class=" DefaultParagraphFont" style="font-family: Times New Roman; font-size: 18px;">. </span></p><p class=" NoSpacing" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont">В ходе предварительного расследования установлено, что </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="accusedFio"> ____ </span></span><span class=" DefaultParagraphFont">, примерно в </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="hour"> ____ </span></span><span class=" DefaultParagraphFont"> часа </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="minutes"> ____ </span></span><span class=" DefaultParagraphFont"> минуту </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="year"> ____ </span></span><span class=" DefaultParagraphFont">, находясь на лестничной площадке 17-го этажа подъезда № </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="podNumber"> ____ </span></span><span class=" DefaultParagraphFont"> дома </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="homeNumber"> ____ </span></span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont">по улице </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="streetName"> ____ </span> </span><span class=" DefaultParagraphFont">города Москвы, имея умысел на причинение тяжкого вреда жизни и здоровью, используя в качестве оружия предмет, конструктивно схожий с ножом, в ходе внезапного конфликта нанес один удар вышеуказанным предметом </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="victimFullName"> ____ </span></span><span class=" DefaultParagraphFont">, тем самым причинил последнему телесные повреждения согласно справке из ГКБ №</span><span class=" DefaultParagraphFont"> <span class="text--selector" data-text-item="hospitalNumber"> ____ </span></span><span class=" DefaultParagraphFont"> г. Москвы: «</span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="doctorReview"> ____ </span></span><span class=" DefaultParagraphFont">», то есть причини тяжкий вред здоровью, после чего с места совершения преступления скрылся</span><span class=" DefaultParagraphFont">.</span></p><p class=" NoSpacing" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont">Согласно заключению специалиста № </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="docturReviewNumber"> ____ </span></span><span class=" DefaultParagraphFont"> от </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="doctorReviewDate"> ____ </span>, </span><span class=" DefaultParagraphFont"> «</span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="doctorReviewFull"> ____ </span></span><span class=" DefaultParagraphFont">»</span><span class=" DefaultParagraphFont">.</span><span class=" DefaultParagraphFont"> </span></p><p class=" NoSpacing" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont">Следовательно,</span><span class=" DefaultParagraphFont"> в действиях </span><span class=" DefaultParagraphFont">ФИО 2</span><span class=" DefaultParagraphFont">.</span><span class=" DefaultParagraphFont"> усматриваются признаки преступления, предусмотренного ч. </span><span class=" DefaultParagraphFont">4</span><span class=" DefaultParagraphFont"> ст. 111 УК РФ, предварительное следствие по которому </span><span class=" DefaultParagraphFont"></span><span class=" DefaultParagraphFont">в соответствии с ч. 2 ст. 151 УПК РФ осуществляется следователями Следственного комитета Российской Федерации</span><span class=" DefaultParagraphFont">, </span><span class=" DefaultParagraphFont">следовательно,</span><span class=" DefaultParagraphFont"> имеются основания </span><span class=" DefaultParagraphFont">для</span><span class=" DefaultParagraphFont"> передачи уголовного дела в </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="MRSOName"> ____ </span></span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont">МРСО СУ по</span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="MRSODeal"> ____ </span></span><span class=" DefaultParagraphFont"> ГСУ СК России по г. Москве</span><span class=" DefaultParagraphFont"> для организации дальнейшего расследования</span><span class=" DefaultParagraphFont">. </span></p><p class=" Normal BodyText2" style="line-height: 100%; text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont">На основании изложенного, и руководствуясь  </span><span class=" DefaultParagraphFont">п. 12 ч. 2 ст. 37, ст. 153</span><span class=" DefaultParagraphFont"> УПК РФ,</span></p><p class=" Normal" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: center;"><span class=" DefaultParagraphFont" style="font-weight: 700;">П О С Т А Н О В И Л</span><span class=" DefaultParagraphFont" style="font-weight: 700;">:</span><span class=" DefaultParagraphFont" style="font-weight: 700;"> </span></p><p class=" Normal" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: center;"></p><p class=" Normal" style="text-indent: 37px; text-align: both;"><span class=" DefaultParagraphFont">У</span><span class=" DefaultParagraphFont">головное дело № </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="dealNumber"> ____ </span> </span><span class=" DefaultParagraphFont">изъять </span><span class=" DefaultParagraphFont">из </span><span class=" DefaultParagraphFont">производства </span><span class=" DefaultParagraphFont">СО</span><span class=" DefaultParagraphFont"> О</span><span class=" DefaultParagraphFont">М</span><span class=" DefaultParagraphFont">ВД </span><span class=" DefaultParagraphFont">России </span><span class=" DefaultParagraphFont">по</span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="district"> ____ </span></span><span class=" DefaultParagraphFont"> район</span><span class=" DefaultParagraphFont">у г. Москвы </span><span class=" DefaultParagraphFont">и передать в</span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="MRSOName"> ____ </span></span><span class=" DefaultParagraphFont"> </span><span class=" DefaultParagraphFont">МРСО СУ по </span><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="MRSODeal"> ____ </span> </span><span class=" DefaultParagraphFont">ГСУ СК России по г. Москве</span><span class=" DefaultParagraphFont"> для организации дальнейшего расследования.</span></p><p class=" Normal BodyText" style="margin-left: -10px; margin-right: 18px; text-indent: 56px; text-align: both;"></p><p class=" Normal"><span class=" DefaultParagraphFont">Первый з</span><span class=" DefaultParagraphFont">аместитель </span></p><p class=" Normal" style="text-align: both;"><span class=" DefaultParagraphFont">межрайонн</span><span class=" DefaultParagraphFont">ого</span><span class=" DefaultParagraphFont"> прокурор</span><span class=" DefaultParagraphFont">а</span><span class=" DefaultParagraphFont"> </span></p><p class=" Normal" style="text-align: right;"><span class=" DefaultParagraphFont"><span class="text--selector" data-text-item="prosecutorFio"> ____ </span></span></p></section></div>`,
  );
  const [variant, setVariant] = useState<number>(0);
  const [showUploadFile, setShowUploadFile] = useState<boolean>(false);
  const [fields, setFields] = useState<string[]>(['ssad', 'sdasd']);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    const value = watchAllFields[focusedField];
    console.log(value);
    if (html && (value?.length ?? 0) > 0 && (focusedField?.length ?? 0) > 0) {
      setHtml(fillValue(html, value, focusedField));
    }
  }, [focusedField, html, watchAllFields]);
  useEffect(() => {
    console.log(variant);
    if (Number(variant) > 0 && Number(variant) !== 999) {
      fetch(`/api/upload?id=${variant}`)
        .then((res) => res.json())
        .then((data) => {
          const { message } = data;
          setHtml(message);
        });
    }
    if (Number(variant) === 999) {
      console.log('variant');
      setShowUploadFile(true);
    }
  }, [variant]);

  // useEffect(() => {
  //   console.log(html);
  // }, [html]);

  // useEffect(() => {
  //   highLightTextSelector(focusedField)
  // }, [focusedField, html])

  const options = [
    { value: 999, label: 'Загрузить файл шаблона' },
    {
      value: 1,
      label:
        'Постановление об отмене постановления о приостановлении предварительного следствия',
    },
    {
      value: 2,
      label:
        'Постановление об отмене постановления о приостановлении дознания и о возобновлении дознания',
    },
  ];

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
        <div className={'mt-5 flex gap-4 items-center'}>
          <div
            className="cutout bg-blue-950 h-10 w-10"
            style={
              {
                '--border-radius': '5px',
                '--paper-indent': '12px',
              } as CSSProperties
            }
          />
          {variant !== 0 && (
            <div className="text-base leading-tight">
              Создание по параметрам
            </div>
          )}
          {variant == 0 && (
            <ReactSelect
              options={options}
              onChange={(option) => setVariant(option?.value ?? 0)}
              placeholder={'Выберите шаблон'}
            />
          )}
        </div>

        {fields.map((name, index) => {
          return (
            <FormInput
              key={name}
              label={LABELS[name] ?? name}
              placeholder={'Введите значение'}
              formRegister={register(name)}
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
          ' cutout bg-[#F3F3F3] p-4 max-h-full overflow-y-auto overflow-x-hidden relative'
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
        {/*<Editor content={html ?? ""} setContent={setHtml}/>*/}
        {/*{html && }*/}
      </div>

      <FileUpload
        show={showUploadFile}
        updateShow={setShowUploadFile}
        updateData={(data) => {
          setFields(parseFormFields(data as any));
          setHtml(data as any);
        }}
        route={'http://localhost:3030/file/upload'}
      />
    </div>
  );
};

export default Create;
