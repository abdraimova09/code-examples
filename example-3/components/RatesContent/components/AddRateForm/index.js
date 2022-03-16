import React, { useEffect } from 'react';
import { Form } from 'antd';

import {
  ElloTypographyTitle,
  ElloForm,
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloInputNumber,
  ElloButton,
} from '@components';
import { ElloRow } from '../../../../../../common/components';

import './styles.less';
import { ReactSVG } from 'react-svg';

function AddRateForm({ currentItem, onAddRate, setActiveKey }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (currentItem?.id) {
      form.setFieldsValue({
        name: currentItem.name,
        id: currentItem.id,
        costCargo: currentItem.costCargo,
        costDistance: currentItem.costDistance,
        costTime: currentItem.costTime,
      });
    } else {
      form.setFieldsValue({
        name: null,
        id: null,
        costCargo: 0,
        costDistance: 0,
        costTime: 0,
      });
    }
  }, [currentItem?.id]);
  return (
    <div className="my-garage-add-rate-form-wrapper">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '894px',
        }}
      >
        {' '}
        <ElloTypographyTitle level={5}>Тариф</ElloTypographyTitle>
        <div onClick={() => setActiveKey(0)}>
          <ReactSVG
            style={{ width: '50px' }}
            className="svg-container"
            src={'/assets/icons/close.svg'}
          />
        </div>
      </div>

      {/* <ElloTypographyTitle level={5}>Тариф</ElloTypographyTitle> */}
      <ElloForm form={form} onFinish={onAddRate}>
        <ElloRow span={24}>
          <ElloCol span={12}>
            <ElloFormItem hidden name="id" />
            <ElloFormItem
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите название',
                },
              ]}
              label="Название"
              name="name"
              className="form-item-column"
            >
              <ElloInput
                className="full-width"
                placeholder="Введите название"
              />
            </ElloFormItem>
            <ElloFormItem
              label="Стоимость погрузки/разгрузки ТС, руб."
              name="costCargo"
              className="form-item-column"
              tooltip="Фиксированная часть тарифа, в которую можно внести стоимость: подачи авто, погрузки (из расчета что она длится 1 час), разгрузки."
            >
              <ElloInputNumber
                className="full-width"
                placeholder="Введите cтоимость погрузки/разгрузки ТС, руб."
              />
            </ElloFormItem>
          </ElloCol>
          <ElloCol span={12}>
            <ElloFormItem
              label="Стоимость 1 км пути, руб."
              name="costDistance"
              className="form-item-column"
              tooltip="Часть тарифа, зависящая от расстояния (рассчитывается как длина маршрута умноженная на стоимость проезда за 1 км)"
            >
              <ElloInputNumber
                className="full-width"
                placeholder="Введите cтоимость 1 км пути, руб."
              />
            </ElloFormItem>
            <ElloFormItem
              label="Стоимость 1 часа, руб."
              name="costTime"
              className="form-item-column"
              tooltip="Часть тарифа, зависящая от времени, затраченного на рейс (рассчитывается как длительность маршрута во времени на стоимость 1 часа)."
            >
              <ElloInputNumber
                className="full-width"
                placeholder="Введите cтоимость 1 часа, руб."
              />
            </ElloFormItem>
          </ElloCol>
          <ElloCol className="d-flex flex-column justify-content-end align-items-start">
            <ElloButton type="primary" shape="round" htmlType="submit">
              {currentItem?.id ? 'Обновить' : 'Добавить'}
            </ElloButton>
          </ElloCol>
        </ElloRow>
      </ElloForm>
    </div>
  );
}

export default AddRateForm;
