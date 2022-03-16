import React from 'react';

import {
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloTypographyTitle,
  ElloSelect,
  ElloButton,
  ElloDatePicker,
  ElloTooltip,
  ELLO_TIMEZONES,
} from '@components';

import { ReactSVG } from 'react-svg';
import { addDriverModalActions } from '../../../../actions/myGarage';
import { useDispatch } from 'react-redux';
import { AddressSuggestions } from 'react-dadata';

const Col3 = ({ options, setDriverImg, driverImg }) => {
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleChange = (e) => {
    getBase64(e.target.files[0]).then((res) =>
      setDriverImg({ base64: res, fileName: e.target.files[0].name })
    );
  };
  function deleteDriverImg(e) {
    e.stopPropagation();
    setDriverImg(null);
  }
  const dispatch = useDispatch();
  return (
    <ElloCol span={11}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '417px',
        }}
      >
        <ElloTypographyTitle level={5}>Паспорт</ElloTypographyTitle>{' '}
        <div
          onClick={() => {
            dispatch(addDriverModalActions(false));
          }}
        >
          <ReactSVG
            style={{ width: '50px' }}
            className="svg-container"
            src={'/assets/icons/close.svg'}
            onC
          />
        </div>
      </div>

      <ElloCol>
        <ElloFormItem
          label="Серия/номер паспорта"
          name="PassportNumber"
          className="form-item-column"
        >
          <ElloInput placeholder="Введите серию/номер паспорта" />
        </ElloFormItem>
      </ElloCol>

      <ElloFormItem
        label="Дата выдачи"
        name="PassportDate"
        className="form-item-column"
      >
        <ElloDatePicker
          className="full-width"
          placeholder="Введите дату выдачи"
        />
      </ElloFormItem>
      <ElloFormItem
        label="Кем выдан"
        name="PassportIssued"
        className="form-item-column"
      >
        <ElloInput placeholder="Введите наименование подразределения" />
      </ElloFormItem>
      <ElloFormItem
        label="Адрес регистрации"
        name="AddressReg"
        className="form-item-column"
      >
        <AddressSuggestions
          // eslint-disable-next-line no-undef
          token={process.env.REACT_APP_API_KEY}
          suggestionClassName="dadata-suggest"
          inputProps={{
            className: 'ant-input',
            placeholder: 'Введите адрес',
            name: 'AddressReg',
          }}
        />
      </ElloFormItem>
      <ElloTypographyTitle level={5}>Доп.инфо</ElloTypographyTitle>
      <ElloFormItem
        name="Category"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите открытые категории',
          },
        ]}
        label="Открытые категории"
        className="form-item-column"
      >
        <ElloSelect mode="multiple" options={options} />
      </ElloFormItem>
      <ElloFormItem
        label="Часовой пояс"
        name="timeZone"
        className="form-item-column"
      >
        <ElloSelect options={ELLO_TIMEZONES} />
      </ElloFormItem>
      <ElloFormItem>
        <div className="driver-img-div">
          {driverImg && driverImg.base64 ? (
            <img src={driverImg.base64} className="driver-img" />
          ) : (
            <ReactSVG
              style={{ width: '90px', borderRadius: '25px', height: '90px' }}
              className="svg-container"
              src={'/assets/icons/addDriverImg.svg'}
            />
          )}
          <div>
            <br />
            {driverImg ? (
              <div onClick={(e) => deleteDriverImg(e)}>
                <ElloTooltip placement="right" title="Удалить">
                  <ReactSVG
                    style={{ width: '50px', height: '30px' }}
                    className="svg-container"
                    src={'/assets/icons/data/delete.svg'}
                  />
                </ElloTooltip>
              </div>
            ) : null}
            <label htmlFor="single-file1">
              <ElloTooltip placement="right" title="Редактировать">
                <ReactSVG
                  style={{ width: '50px', height: '30px' }}
                  className="svg-container"
                  src={'/assets/icons/data/edit.svg'}
                />
              </ElloTooltip>
            </label>
          </div>
        </div>
        <input
          style={{ display: 'none', width: '5px' }}
          id="single-file1"
          type="file"
          onChange={handleChange}
        />
        <br />
      </ElloFormItem>
      <ElloButton type="primary" shape="round" htmlType="submit">
        Добавить
      </ElloButton>
    </ElloCol>
  );
};

export default Col3;
