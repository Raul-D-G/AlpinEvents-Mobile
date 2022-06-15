import {EvenimentModel} from './../redux/actions/evenimentActions';
import {MONTHS, DAYS} from './AppConst';
import NetInfo from '@react-native-community/netinfo';

export const checkConnected = async () => {
  return await NetInfo.fetch();
};

export const formateazaDataToString = (data: Date) => {
  const year = data.getFullYear(); // 2019
  const date = data.getDate(); // 23

  const monthName = MONTHS[data.getMonth()];

  const dayName = DAYS[data.getDay()];

  return `${dayName}, ${date} ${monthName} ${year}`;
};

export const verificaData = (evenimente: EvenimentModel[], data: Date) => {
  let ok = true;

  evenimente.forEach(eveniment => {
    if (eveniment.data.getDate() === data.getDate()) {
      ok = false;
    }
  });
  return ok;
};
