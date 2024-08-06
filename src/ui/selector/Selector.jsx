import PropTypes from 'prop-types';

import s from './selector.module.css';

function Selector({ label, value, onChange, disabled }) {
  const handleClick = () => onChange(!value);

  return (
    <div className={s.selector}>
      {label && <p>{label}</p>}
      <button
        type="button"
        onClick={handleClick}
        className={value ? s.toggler_active : s.toggler}
        aria-label="selector"
        disabled={disabled}
      />
    </div>
  );
}

export default Selector;

Selector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Selector.defaultProps = {
  label: '',
  onChange: () => {},
  disabled: false,
};
