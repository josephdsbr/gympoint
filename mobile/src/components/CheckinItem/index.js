import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {CheckinContent, CheckinTitle, CheckinHour} from './styles';

export default function CheckinItem({data}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <CheckinContent>
      <CheckinTitle>Check-in #{data.id}</CheckinTitle>
      <CheckinHour>{dateParsed}</CheckinHour>
    </CheckinContent>
  );
}
