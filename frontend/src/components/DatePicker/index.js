import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import { DatePickerInput } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({
  name,
  setLocalVariableDate,
  initialDate,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(parseISO(initialDate));

  useEffect(() => {
    setSelected(parseISO(initialDate));
  }, [initialDate]);

  useEffect(() => {
    setLocalVariableDate(selected);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]);

  function handleChangeDate(date) {
    setSelected(date);
    setLocalVariableDate(date);
  }

  return (
    <>
      <DatePickerInput
        locale={pt}
        dateFormat="dd/MM/yyyy"
        name={fieldName}
        selected={selected}
        onChange={date => handleChangeDate(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  setLocalVariableDate: PropTypes.func.isRequired,
  initialDate: PropTypes.string.isRequired,
};
