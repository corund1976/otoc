import { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import DropdownIndicator from './dropdownIndicator';

import s from './select.module.css';

function ReactSelect({ id, placeholder, value, onChange, options, disabled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (option) => onChange(option.value);

  const classNames = {
    control: () => (isMenuOpen ? s.control_active : s.control),
    singleValue: () => s.single_value,
    dropdownIndicator: () => (isMenuOpen ? s.dropdown_rotate : s.dropdown_init),
    menu: () => s.menu,
    option: () => s.option,
    input: () => s.input,
    placeholder: () => s.placeholder,
  };

  return (
    <Select
      id={id}
      // defaultValue={options[0]}
      placeholder={placeholder}
      value={options.find((item) => item.value === value) || ''}
      onChange={handleChange}
      options={options}
      components={{ DropdownIndicator }}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      classNames={classNames}
      unstyled
      isDisabled={disabled}
      // menuIsOpen
    />
  );
}

export default ReactSelect;

ReactSelect.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape),
  disabled: PropTypes.bool,
};

ReactSelect.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},
  options: [],
  disabled: false,
};
