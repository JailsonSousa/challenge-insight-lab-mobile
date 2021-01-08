/* eslint-disable import/no-duplicates */
import { formatDistanceToNow } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

export const distanceToNow = (date: string): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptbr,
  });
};
