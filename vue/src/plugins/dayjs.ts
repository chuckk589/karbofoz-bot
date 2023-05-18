import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';

dayjs.extend(isToday);
dayjs.extend(relativeTime);

export default dayjs;
