import React from 'react';
import { ReactSVG } from 'react-svg';

import {
  ElloCol,
  ElloFormItem,
  ElloInput,
  ElloTypographyTitle,
  ElloSelect,
  ElloButton,
  ElloDatePicker,
  ElloTooltip,
} from '@components';

import { editDriverModalActions } from '../../../../actions/myGarage';
import { useDispatch } from 'react-redux';
import { TIMEZONES } from '../../../../utils/constants';

import './styles.less';
import { AddressSuggestions } from 'react-dadata';

const EditCol2 = ({ options, driverImg, setDriverImg, driverForEdit }) => {
  const dispatch = useDispatch();
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
    handleDriverImg();
  };
  const deleteDriverImg = () => {
    setDriverImg(null);
    handleDriverImg();
  };
  const handleDriverImg = () => {
    if (driverImg && driverImg.base64) {
      return <img className="driver-img" src={driverImg.base64} />;
    } else if (driverForEdit.Avatar && driverForEdit.Avatar.url) {
      return <img className="driver-img" src={driverForEdit.Avatar.url} />;
    } else {
      return (
        <ReactSVG
          style={{ width: '90px', borderRadius: '25px', height: '90px' }}
          className="svg-container"
          src={'/assets/icons/addDriverImg.svg'}
        />
      );
    }
  };
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
        <div onClick={() => dispatch(editDriverModalActions(false))}>
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
        <ElloDatePicker placeholder="Введите дату выдачи" />
      </ElloFormItem>
      <ElloFormItem
        label="Кем выдан"
        name="PassportIssuedBy"
        className="form-item-column"
      >
        <ElloInput placeholder="Введите наименование подразределения" />
      </ElloFormItem>
      <ElloFormItem
        label="Адрес регистрации"
        name="RegAddress"
        className="form-item-column"
      >
        <AddressSuggestions
          token={process.env.REACT_APP_API_KEY}
          suggestionClassName="dadata-suggest"
          defaultQuery={JSON.parse(driverForEdit?.DriverInfo)?.RegAddress}
          inputProps={{
            className: 'ant-input',
            placeholder: 'Введите адрес',
            name: 'RegAddress',
          }}
        />
      </ElloFormItem>
      <ElloTypographyTitle level={5}>Доп.инфо</ElloTypographyTitle>
      <ElloFormItem
        name="LicenseCategory"
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
        name="TimeZone"
        className="form-item-column"
      >
        <ElloSelect options={TIMEZONES} />
      </ElloFormItem>
      <ElloFormItem>
        <div className="driver-img-div">
          {handleDriverImg()}
          <div>
            <br />
            {driverImg ? (
              <div onClick={() => deleteDriverImg()}>
                <ElloTooltip placement="right" title="Удалить">
                  <ReactSVG
                    style={{ width: '50px', height: '30px' }}
                    className="svg-container"
                    src={'/assets/icons/data/delete.svg'}
                  />
                </ElloTooltip>
              </div>
            ) : null}
            <label htmlFor="single-file">
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
          id="single-file"
          type="file"
          onChange={handleChange}
        />
        <br />
      </ElloFormItem>
      {/* <div className="driver-img-div">
        {handleDriverImg()}
        <div>
          {driverImg ? (
            <div onClick={() => setDriverImg(null)}>
              <ElloTooltip placement="right" title="Удалить">
                <ReactSVG
                  style={{ width: '50px', height: '30px' }}
                  className="svg-container"
                  src={'/assets/icons/data/delete.svg'}
                />
              </ElloTooltip>
            </div>
          ) : null}
          <br />

          <label htmlFor="single-file">
            <ElloTooltip placement="right" title="Редактировать">
              <ReactSVG
                style={{ width: '50px' }}
                className="svg-container"
                src={'/assets/icons/data/edit.svg'}
              />
            </ElloTooltip>
          </label>
        </div>
      </div>
      <input
        style={{ display: 'none', width: '5px' }}
        id="single-file"
        type="file"
        onChange={(e) => handleChange(e)}
      />
      <br /> */}
      <ElloButton type="primary" shape="round" htmlType="submit">
        Сохранить изменения
      </ElloButton>
    </ElloCol>
  );
};

export default EditCol2;
