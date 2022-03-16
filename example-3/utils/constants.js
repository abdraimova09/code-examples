// eslint-disable-next-line no-unused-vars
import React from 'react';

const TYPE_CARS = [
  {
    id: 1,
    label: 'Тент',
    value: 'Тент',
    svg: '/assets/cars/tent.svg',
  },
  {
    id: 2,
    label: 'Фургон',
    value: 'Фургон',
    svg: '/assets/cars/furgon.svg',
  },
  {
    id: 3,
    label: 'Рефрежератор',
    value: 'Рефрежератор',
    svg: '/assets/cars/refrejeractor.svg',
  },
  {
    id: 4,
    label: 'Изотермический фургон',
    value: 'Изотермический фургон',
    svg: '/assets/cars/izotermfurgon.svg',
  },
  {
    id: 5,
    label: 'Контейнеровоз',
    value: 'Контейнеровоз',
  },
  {
    id: 6,
    label: 'Платформа',
    value: 'Платформа',
  },
  {
    id: 7,
    label: 'Трал',
    value: 'Трал',
    svg: '/assets/cars/tral.svg',
  },
  {
    id: 8,
    label: 'Автоцистерна',
    value: 'Автоцистерна',
  },
  {
    id: 9,
    label: 'Цементовоз',
    value: 'Цементовоз',
  },
  {
    id: 10,
    label: 'Мусоровоз',
    value: 'Мусоровоз',
  },
  {
    id: 11,
    label: 'Самосвал',
    value: 'Самосвал',
  },
  {
    id: 12,
    label: 'Бортовая',
    value: 'Бортовая',
    svg: '/assets/cars/bortovaya.svg',
  },
  {
    id: 13,
    label: 'Кран',
    value: 'Кран',
  },
  {
    id: 14,
    label: 'Манипулятор',
    value: 'Манипулятор',
    svg: '/assets/cars/manipulyator.svg',
  },
  {
    id: 15,
    label: 'Эвакуатор',
    value: 'Эвакуатор',
    svg: '/assets/cars/evakuator.svg',
  },
  {
    id: 16,
    label: 'Автобус',
    value: 'Автобус',
  },
  {
    id: 17,
    label: 'Микроавтобус',
    value: 'Микроавтобус',
  },
  {
    id: 18,
    label: 'Автовоз',
    value: 'Автовоз',
  },
  {
    id: 19,
    label: 'Яхтовоз',
    value: 'Яхтовоз',
  },
  {
    id: 20,
    label: 'Лесовоз',
    value: 'Лесовоз',
  },
  {
    id: 21,
    label: 'Трубовоз',
    value: 'Трубовоз',
    svg: '/assets/cars/trubovoz.svg',
  },
  {
    id: 22,
    label: 'Плитовоз',
    value: 'Плитовоз',
  },
  {
    id: 23,
    label: 'Тягач',
    value: 'Тягач',
    svg: '/assets/cars/tyagach.svg',
  },
  {
    id: 24,
    label: 'Другое',
    value: 'Другое',
    svg: '/assets/cars/drugoe.svg',
  },
];

const ACCESSIBILTY_CARS = [
  {
    id: 1,
    label: 'Показывать все',
  },
  {
    id: 2,
    label: 'Для всех',
  },
  {
    id: 3,
    label: 'Для партнеров',
  },
  {
    id: 4,
    label: 'Для себя',
  },
];

const FREIGHT_CARS = [
  {
    id: 1,
    label: 'Показывать все',
  },
  {
    id: 2,
    label: 'Зафрахтован',
  },
  {
    id: 3,
    label: 'Без фрахта',
  },
];

const DRIVERS_CARS = [
  {
    id: 1,
    label: 'Показывать все',
  },
  {
    id: 2,
    label: 'Назначен',
  },
  {
    id: 3,
    label: 'Не назначен',
  },
];

const VISIBILITY_CARS = [
  {
    id: 1,
    label: 'Для всех',
    tooltip: 'Автомобиль виден всем пользователям платформы',
  },
  {
    id: 2,
    label: 'Для партнеров',
    tooltip:
      'Автомобиль виден только компаниям, с которыми есть партнерские отношения в рамках платформы',
  },
  {
    id: 0,
    label: 'Для себя',
    tooltip:
      'Автомобиль не виден пользователям платформы и предназначен для самостоятельного распределения',
  },
];
const TYPE_CARS_ADD_FORM = [
  {
    id: 1,
    label: 'Выберите тип автомобиля',
  },
  {
    id: 2,
    label: 'Тент',
  },
  {
    id: 3,
    label: 'Фургон',
  },
  {
    id: 4,
    label: 'Рефрежератор',
  },
  {
    id: 5,
    label: 'Изотермический фургон',
  },
  {
    id: 6,
    label: 'Контейнеровоз',
  },
  {
    id: 7,
    label: 'Платформа',
  },
  {
    id: 8,
    label: 'Трал',
  },
  {
    id: 9,
    label: 'Автоцистерна',
  },
  {
    id: 10,
    label: 'Цементовоз',
  },
  {
    id: 11,
    label: 'Мусоровоз',
  },
  {
    id: 12,
    label: 'Самосвал',
  },
  {
    id: 13,
    label: 'Бортовая',
  },
  {
    id: 14,
    label: 'Кран',
  },
  {
    id: 15,
    label: 'Манипулятор',
  },
  {
    id: 16,
    label: 'Эвакуатор',
  },
  {
    id: 17,
    label: 'Автобус',
  },
  {
    id: 18,
    label: 'Микроавтобус',
  },
  {
    id: 19,
    label: 'Автовоз',
  },
  {
    id: 20,
    label: 'Яхтовоз',
  },
  {
    id: 21,
    label: 'Лесовоз',
  },
  {
    id: 22,
    label: 'Трубовоз',
  },
  {
    id: 23,
    label: 'Плитовоз',
  },
  {
    id: 24,
    label: 'Тягач',
  },
  {
    id: 25,
    label: 'Другое',
  },
];

const CAR_TYPE_LOAD = [
  {
    id: 1,
    label: 'Выберите тип загрузки',
  },
  {
    id: 2,
    label: 'Верхняя',
  },
  {
    id: 3,
    label: 'Боковая',
  },
  {
    id: 4,
    label: 'Задняя',
  },
];

const DRIVERS_CATEGORY = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'A1',
    label: 'A1',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'B1',
    label: 'B1',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'C1',
    label: 'C1',
  },
  {
    value: 'D',
    label: 'D',
  },
  {
    value: 'D1',
    label: 'D1',
  },
  {
    value: 'BE',
    label: 'BE',
  },
  {
    value: 'CE',
    label: 'CE',
  },
  {
    value: 'C1E',
    label: 'C1E',
  },
  {
    value: 'DE',
    label: 'DE',
  },
  {
    value: 'D1E',
    label: 'D1E',
  },
];
const DRIVER_APPOINTED = [
  {
    id: 1,
    label: 'Назначен',
    value: 'Назначен',
  },
  {
    id: 2,
    label: 'Не назначен',
    value: 'Не назначен',
  },
  {
    id: 3,
    label: 'Показывать всех',
    value: 'Показывать всех',
  },
];
const TIMEZONES = [
  {
    value: 'Europe/Amsterdam',
    label: '( GMT+01:00 ) Амстердам ',
  },
  {
    value: 'Europe/Andorra',
    label: '( GMT+01:00 ) Андорра ',
  },
  {
    value: 'Europe/Belgrade',
    label: '( GMT+01:00 ) Белград ',
  },
  {
    value: 'Europe/Berlin',
    label: '( GMT+01:00 ) Берлин ',
  },
  {
    value: 'Europe/Bratislava',
    label: '( GMT+01:00 ) Братислава ',
  },
  {
    value: 'Europe/Brussels',
    label: '( GMT+01:00 ) Брюссель ',
  },
  {
    value: 'Europe/Budapest',
    label: '( GMT+01:00 ) Будапешт ',
  },
  {
    value: 'Europe/Busingen',
    label: '( GMT+01:00 ) Бюзинген-на-Верхнем-Рейне ',
  },
  {
    value: 'Europe/Vaduz',
    label: '( GMT+01:00 ) Вадуц ',
  },
  {
    value: 'Europe/Warsaw',
    label: '( GMT+01:00 ) Варшава ',
  },
  {
    value: 'Europe/Vatican',
    label: '( GMT+01:00 ) Ватикан ',
  },
  {
    value: 'Europe/Vienna',
    label: '( GMT+01:00 ) Вена ',
  },
  {
    value: 'Europe/Guernsey',
    label: '( GMT+01:00 ) Гернси ',
  },
  {
    value: 'Europe/Gibraltar',
    label: '( GMT+01:00 ) Гибралтар ',
  },
  {
    value: 'Europe/Jersey',
    label: '( GMT+01:00 ) Джерси ',
  },
  {
    value: 'Europe/Dublin',
    label: '( GMT+01:00 ) Дублин ',
  },
  {
    value: 'Europe/Zagreb',
    label: '( GMT+01:00 ) Загреб ',
  },
  {
    value: 'Europe/Copenhagen',
    label: '( GMT+01:00 ) Копенгаген ',
  },
  {
    value: 'Europe/Lisbon',
    label: '( GMT+01:00 ) Лиссабон ',
  },
  {
    value: 'Europe/London',
    label: '( GMT+01:00 ) Лондон ',
  },
  {
    value: 'Europe/Ljubljana',
    label: '( GMT+01:00 ) Любляна ',
  },
  {
    value: 'Europe/Luxembourg',
    label: '( GMT+01:00 ) Люксембург ',
  },
  {
    value: 'Europe/Madrid',
    label: '( GMT+01:00 ) Мадрид ',
  },
  {
    value: 'Europe/Malta',
    label: '( GMT+01:00 ) Мальта ',
  },
  {
    value: 'Europe/Monaco',
    label: '( GMT+01:00 ) Монако ',
  },
  {
    value: 'Europe/Oslo',
    label: '( GMT+01:00 ) Осло ',
  },
  {
    value: 'Europe/Paris',
    label: '( GMT+01:00 ) Париж ',
  },
  {
    value: 'Europe/Podgorica',
    label: '( GMT+01:00 ) Подгорица ',
  },
  {
    value: 'Europe/Prague',
    label: '( GMT+01:00 ) Прага ',
  },
  {
    value: 'Europe/Rome',
    label: '( GMT+01:00 ) Рим ',
  },
  {
    value: 'Europe/San_Marino',
    label: '( GMT+01:00 ) Сан-Марино ',
  },
  {
    value: 'Europe/Sarajevo',
    label: '( GMT+01:00 ) Сараево ',
  },
  {
    value: 'Europe/Skopje',
    label: '( GMT+01:00 ) Скопье ',
  },
  {
    value: 'Europe/Stockholm',
    label: '( GMT+01:00 ) Стокгольм ',
  },
  {
    value: 'Europe/Tirane',
    label: '( GMT+01:00 ) Тирана ',
  },
  {
    value: 'Europe/Zurich',
    label: '( GMT+01:00 ) Цюрих ',
  },
  {
    value: 'Europe/Isle_of_Man',
    label: '( GMT+01:00 ) о-в Мэн ',
  },
  {
    value: 'Asia/Amman',
    label: '( GMT+02:00 ) Амман ',
  },
  {
    value: 'Europe/Athens',
    label: '( GMT+02:00 ) Афины ',
  },
  {
    value: 'Asia/Beirut',
    label: '( GMT+02:00 ) Бейрут ',
  },
  {
    value: 'Europe/Bucharest',
    label: '( GMT+02:00 ) Бухарест ',
  },
  {
    value: 'Asia/Gaza',
    label: '( GMT+02:00 ) Газа ',
  },
  {
    value: 'Asia/Damascus',
    label: '( GMT+02:00 ) Дамаск ',
  },
  {
    value: 'Asia/Jerusalem',
    label: '( GMT+02:00 ) Иерусалим ',
  },
  {
    value: 'Europe/Mariehamn',
    label: '( GMT+02:00 ) Мариехамн ',
  },
  {
    value: 'Asia/Nicosia',
    label: '( GMT+02:00 ) Никосия ',
  },
  {
    value: 'Europe/Sofia',
    label: '( GMT+02:00 ) София ',
  },
  {
    value: 'Europe/Istanbul',
    label: '( GMT+02:00 ) Стамбул ',
  },
  {
    value: 'Asia/Famagusta',
    label: '( GMT+02:00 ) Фамагуста ',
  },
  {
    value: 'Asia/Hebron',
    label: '( GMT+02:00 ) Хеврон ',
  },
  {
    value: 'Europe/Helsinki',
    label: '( GMT+02:00 ) Хельсинки ',
  },
  {
    value: 'Asia/Aden',
    label: '( GMT+03:00 ) Аден ',
  },
  {
    value: 'Asia/Baghdad',
    label: '( GMT+03:00 ) Багдад ',
  },
  {
    value: 'Europe/Vilnius',
    label: '( GMT+03:00 ) Вильнюс ',
  },
  {
    value: 'Europe/Zaporozhye',
    label: '( GMT+03:00 ) Запорожье ',
  },
  {
    value: 'Europe/Kaliningrad',
    label: '( GMT+03:00 ) Калининград ',
  },
  {
    value: 'Europe/Kiev',
    label: '( GMT+03:00 ) Киев ',
  },
  {
    value: 'Europe/Chisinau',
    label: '( GMT+03:00 ) Кишинев ',
  },
  {
    value: 'Asia/Kuwait',
    label: '( GMT+03:00 ) Кувейт ',
  },
  {
    value: 'Europe/Minsk',
    label: '( GMT+03:00 ) Минск ',
  },
  {
    value: 'Europe/Moscow',
    label: '( GMT+03:00 ) Москва ',
  },
  {
    value: 'Europe/Riga',
    label: '( GMT+03:00 ) Рига ',
  },
  {
    value: 'Europe/Simferopol',
    label: '( GMT+03:00 ) Симферополь ',
  },
  {
    value: 'Europe/Tallinn',
    label: '( GMT+03:00 ) Таллин ',
  },
  {
    value: 'Europe/Uzhgorod',
    label: '( GMT+03:00 ) Ужгород ',
  },
  {
    value: 'Asia/Riyadh',
    label: '( GMT+03:00 ) Эр-Рияд ',
  },
  {
    value: 'Asia/Tehran',
    label: '( GMT+03:30 ) Тегеран ',
  },
  {
    value: 'Europe/Astrakhan',
    label: '( GMT+04:00 ) Астрахань ',
  },
  {
    value: 'Asia/Baku',
    label: '( GMT+04:00 ) Баку ',
  },
  {
    value: 'Asia/Bahrain',
    label: '( GMT+04:00 ) Бахрейн ',
  },
  {
    value: 'Europe/Volgograd',
    label: '( GMT+04:00 ) Волгоград ',
  },
  {
    value: 'Asia/Dubai',
    label: '( GMT+04:00 ) Дубай ',
  },
  {
    value: 'Asia/Yerevan',
    label: '( GMT+04:00 ) Ереван ',
  },
  {
    value: 'Asia/Qatar',
    label: '( GMT+04:00 ) Катар ',
  },
  {
    value: 'Europe/Kirov',
    label: '( GMT+04:00 ) Киров ',
  },
  {
    value: 'Asia/Muscat',
    label: '( GMT+04:00 ) Маскат ',
  },
  {
    value: 'Europe/Samara',
    label: '( GMT+04:00 ) Самара ',
  },
  {
    value: 'Europe/Saratov',
    label: '( GMT+04:00 ) Саратов ',
  },
  {
    value: 'Asia/Tbilisi',
    label: '( GMT+04:00 ) Тбилиси ',
  },
  {
    value: 'Europe/Ulyanovsk',
    label: '( GMT+04:00 ) Ульяновск ',
  },
  {
    value: 'Asia/Kabul',
    label: '( GMT+04:30 ) Кабул ',
  },
  {
    value: 'Asia/Aqtau',
    label: '( GMT+05:00 ) Актау ',
  },
  {
    value: 'Asia/Aqtobe',
    label: '( GMT+05:00 ) Актобе ',
  },
  {
    value: 'Asia/Atyrau',
    label: '( GMT+05:00 ) Атырау ',
  },
  {
    value: 'Asia/Ashgabat',
    label: '( GMT+05:00 ) Ашхабад ',
  },
  {
    value: 'Asia/Yekaterinburg',
    label: '( GMT+05:00 ) Екатеринбург ',
  },
  {
    value: 'Asia/Karachi',
    label: '( GMT+05:00 ) Карачи ',
  },
  {
    value: 'Asia/Qostanay',
    label: '( GMT+05:00 ) Костанай ',
  },
  {
    value: 'Asia/Qyzylorda',
    label: '( GMT+05:00 ) Кызылорда ',
  },
  {
    value: 'Asia/Samarkand',
    label: '( GMT+05:00 ) Самарканд ',
  },
  {
    value: 'Asia/Oral',
    label: '( GMT+05:00 ) Уральск ',
  },
  {
    value: 'Asia/Kolkata',
    label: '( GMT+05:30 ) Калькутта ',
  },
  {
    value: 'Asia/Kathmandu',
    label: '( GMT+05:30 ) Катманду ',
  },
  {
    value: 'Asia/Colombo',
    label: '( GMT+05:30 ) Коломбо ',
  },
  {
    value: 'Asia/Thimphu',
    label: '( GMT+05:30 ) Тхимпху ',
  },
  {
    value: 'Asia/Almaty',
    label: '( GMT+06:00 ) Алматы ',
  },
  {
    value: 'Asia/Bishkek',
    label: '( GMT+06:00 ) Бишкек ',
  },
  {
    value: 'Asia/Dhaka',
    label: '( GMT+06:00 ) Дакка ',
  },
  {
    value: 'Asia/Dushanbe',
    label: '( GMT+06:00 ) Душанбе ',
  },
  {
    value: 'Asia/Omsk',
    label: '( GMT+06:00 ) Омск ',
  },
  {
    value: 'Asia/Tashkent',
    label: '( GMT+06:00 ) Ташкент ',
  },
  {
    value: 'Asia/Urumqi',
    label: '( GMT+06:00 ) Урумчи ',
  },
  {
    value: 'Asia/Hovd',
    label: '( GMT+06:00 ) Ховд ',
  },
  {
    value: 'Asia/Yangon',
    label: '( GMT+06:30 ) Янгон ',
  },
  {
    value: 'Asia/Bangkok',
    label: '( GMT+07:00 ) Бангкок ',
  },
  {
    value: 'Asia/Barnaul',
    label: '( GMT+07:00 ) Барнаул ',
  },
  {
    value: 'Asia/Vientiane',
    label: '( GMT+07:00 ) Вьентьян ',
  },
  {
    value: 'Asia/Jakarta',
    label: '( GMT+07:00 ) Джакарта ',
  },
  {
    value: 'Asia/Krasnoyarsk',
    label: '( GMT+07:00 ) Красноярск ',
  },
  {
    value: 'Asia/Novokuznetsk',
    label: '( GMT+07:00 ) Новокузнецк ',
  },
  {
    value: 'Asia/Novosibirsk',
    label: '( GMT+07:00 ) Новосибирск ',
  },
  {
    value: 'Asia/Phnom_Penh',
    label: '( GMT+07:00 ) Пномпень ',
  },
  {
    value: 'Asia/Tomsk',
    label: '( GMT+07:00 ) Томск ',
  },
  {
    value: 'Asia/Ulaanbaatar',
    label: '( GMT+07:00 ) Улан-Батор ',
  },
  {
    value: 'Asia/Choibalsan',
    label: '( GMT+07:00 ) Чойбалсан ',
  },
  {
    value: 'Asia/Kuala_Lumpur',
    label: '( GMT+07:30 ) Куала-Лумпур ',
  },
  {
    value: 'Asia/Singapore',
    label: '( GMT+07:30 ) Сингапур ',
  },
  {
    value: 'Asia/Brunei',
    label: '( GMT+08:00 ) Бруней ',
  },
  {
    value: 'Asia/Hong_Kong',
    label: '( GMT+08:00 ) Гонконг ',
  },
  {
    value: 'Asia/Irkutsk',
    label: '( GMT+08:00 ) Иркутск ',
  },
  {
    value: 'Asia/Kuching',
    label: '( GMT+08:00 ) Кучинг ',
  },
  {
    value: 'Asia/Macau',
    label: '( GMT+08:00 ) Макао ',
  },
  {
    value: 'Asia/Makassar',
    label: '( GMT+08:00 ) Макасар ',
  },
  {
    value: 'Asia/Manila',
    label: '( GMT+08:00 ) Манила ',
  },
  {
    value: 'Asia/Pontianak',
    label: '( GMT+08:00 ) Понтианак ',
  },
  {
    value: 'Asia/Taipei',
    label: '( GMT+08:00 ) Тайбэй ',
  },
  {
    value: 'Asia/Ho_Chi_Minh',
    label: '( GMT+08:00 ) Хошимин ',
  },
  {
    value: 'Asia/Shanghai',
    label: '( GMT+08:00 ) Шанхай ',
  },
  {
    value: 'Asia/Jayapura',
    label: '( GMT+09:00 ) Джаяпура ',
  },
  {
    value: 'Asia/Dili',
    label: '( GMT+09:00 ) Дили ',
  },
  {
    value: 'Asia/Pyongyang',
    label: '( GMT+09:00 ) Пхеньян ',
  },
  {
    value: 'Asia/Seoul',
    label: '( GMT+09:00 ) Сеул ',
  },
  {
    value: 'Asia/Tokyo',
    label: '( GMT+09:00 ) Токио ',
  },
  {
    value: 'Asia/Ust-Nera',
    label: '( GMT+09:00 ) Усть-Нера ',
  },
  {
    value: 'Asia/Khandyga',
    label: '( GMT+09:00 ) Хандыга ',
  },
  {
    value: 'Asia/Chita',
    label: '( GMT+09:00 ) Чита ',
  },
  {
    value: 'Asia/Yakutsk',
    label: '( GMT+09:00 ) Якутск ',
  },
  {
    value: 'Asia/Vladivostok',
    label: '( GMT+10:00 ) Владивосток ',
  },
  {
    value: 'Asia/Magadan',
    label: '( GMT+11:00 ) Магадан ',
  },
  {
    value: 'Asia/Srednekolymsk',
    label: '( GMT+11:00 ) Среднеколымск ',
  },
  {
    value: 'Asia/Sakhalin',
    label: '( GMT+11:00 ) о-в Сахалин ',
  },
  {
    value: 'Asia/Kamchatka',
    label: '( GMT+12:00 ) Петропавловск-Камчатский ',
  },
  {
    value: 'Asia/Anadyr',
    label: '( GMT+13:00 ) Анадырь ',
  },
];
export {
  TYPE_CARS,
  TYPE_CARS_ADD_FORM,
  CAR_TYPE_LOAD,
  ACCESSIBILTY_CARS,
  FREIGHT_CARS,
  DRIVERS_CARS,
  VISIBILITY_CARS,
  DRIVERS_CATEGORY,
  DRIVER_APPOINTED,
  TIMEZONES,
};
