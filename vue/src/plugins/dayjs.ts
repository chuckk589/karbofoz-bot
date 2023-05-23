import 'dayjs/locale/es';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

dayjs.updateLocale('ru', {
  calendar: {
    lastDay: '[Вчера]',
    sameDay: '[Сегодня]',
  },
});
dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
  },
});
dayjs.updateLocale('uk', {
  calendar: {
    lastDay: '[Вчора]',
    sameDay: '[Сьогодні]',
  },
});
dayjs.updateLocale('es', {
  calendar: {
    lastDay: '[Ayer]',
    sameDay: '[Hoy]',
  },
});
export default dayjs;
