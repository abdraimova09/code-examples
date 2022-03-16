import React from 'react';
import { ReactSVG } from 'react-svg';

import {
  ElloSelect,
  ElloSelectOption,
  ElloSpace,
  ElloFormItem,
  ElloSlider,
  ElloCol,
  ElloTooltip,
  ElloDivider,
  ElloButton,
} from '@components';

import {
  ACCESSIBILTY_CARS,
  DRIVERS_CARS,
  FREIGHT_CARS,
  TYPE_CARS,
} from '../../utils/constants';

import './styles.less';

function FilterFormCars({
  typeOfCar,
  setTypeOfCar,
  accessibilityOfCar,
  setAccessibilityOfCar,
  freightOfCar,
  setFreightOfCar,
  driverOfCar,
  setDriverOfCar,
  weigth,
  setWeigth,
  volume,
  setVolume,
  resetFilter,
}) {
  return (
    <div className="d-flex flex-fill flex-column justify-content-start align-content-start my-garage-filter-form-wrapper">
      <ElloSpace className="d-flex flex-fill flex-row justify-content-start align-items-center my-garage-filter-form">
        <div>
          <label>Тип автомобиля</label>
          <ElloSelect
            placeholder="Показать все"
            value={typeOfCar}
            mode="multiple"
            onChange={(e) => setTypeOfCar(e)}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <ElloDivider style={{ margin: '4px 0' }} />
                <div className="d-flex justify-content-center align-items-center">
                  <ElloButton
                    type="default"
                    shape="round"
                    size="large"
                    onClick={() => setTypeOfCar([])}
                  >
                    Очистить
                  </ElloButton>
                </div>
              </div>
            )}
          >
            {TYPE_CARS.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label>Доступность</label>
          <ElloSelect
            value={accessibilityOfCar}
            onChange={(e) => setAccessibilityOfCar(e)}
          >
            {ACCESSIBILTY_CARS.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label>Фрахт</label>
          <ElloSelect value={freightOfCar} onChange={(e) => setFreightOfCar(e)}>
            {FREIGHT_CARS.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label>Водитель</label>
          <ElloSelect value={driverOfCar} onChange={(e) => setDriverOfCar(e)}>
            {DRIVERS_CARS.map((item) => (
              <ElloSelectOption key={item.id} value={item.label}>
                {item.label}
              </ElloSelectOption>
            ))}
          </ElloSelect>
        </div>
        <ElloTooltip title="Сброс фильтра">
          <ReactSVG
            onClick={() => resetFilter()}
            className="reset-filter-fields"
            src={'/assets/icons/resetFilter.svg'}
            style={{ marginTop: 15 }}
          />
        </ElloTooltip>
      </ElloSpace>

      <ElloCol>
        <br />
        <ElloFormItem label="Грузоподъемность">
          <div className="filter-form-cars-weigth-slider-value">
            <span>
              {weigth[0]}т - {weigth[1]}т
            </span>
          </div>

          <ElloSlider
            className="filter-form-cars-weigth-slider"
            range
            defaultValue={[0, 100]}
            min={0}
            max={100}
            onChange={(e) => setWeigth(e)}
            value={weigth}
          />
        </ElloFormItem>
      </ElloCol>
      <ElloCol>
        <ElloFormItem label="Объем">
          <div className="filter-form-cars-volume-slider-value">
            <span>
              {volume[0]}м³ - {volume[1]}м³
            </span>
          </div>
          <ElloSlider
            className="filter-form-cars-volume-slider"
            range
            defaultValue={[0, 330]}
            min={0}
            max={330}
            onChange={(e) => setVolume(e)}
            value={volume}
          />
        </ElloFormItem>
      </ElloCol>
    </div>
  );
}

export default FilterFormCars;
