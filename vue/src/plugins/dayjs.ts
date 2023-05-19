import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';

dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default dayjs;
