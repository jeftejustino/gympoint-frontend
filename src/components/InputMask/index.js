import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import { useField } from '@rocketseat/unform';

export default function DatePicker({ name, mask, maskPlaceholder, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.input',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <InputMask
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        name={fieldName}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.oneOf(PropTypes.array, PropTypes.string).isRequired,
  maskPlaceholder: PropTypes.string,
};

DatePicker.defaultProps = {
  maskPlaceholder: '',
};
