import { components } from 'react-select';

import DropdownIcon from 'images/arrow-down.svg?react';

function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon />
    </components.DropdownIndicator>
  );
}

export default DropdownIndicator;
