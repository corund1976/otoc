import PropTypes from 'prop-types';

import s from './input.module.css';

function Input({
  type = 'text',
  id,
  placeholder = '',
  value,
  onChange = () => {},
  onClick = () => {},
  autoComplete = 'off',
  minLength = 0,
  maxLength = 1024,
  readOnly = false,
  required = false,
  disabled = false,
  pattern = false,
}) {
  const emailPattern = null;
  // const emailPattern = '([a-zA-Z0-9_.+-]+@[a-zA-Z_-]+\.[a-zA-Z]{2,6})';
  // имя = любые буквы, цифры, а также - и _
  // почт.сервер = любые буквы, а также - и _
  // домен = любые буквы в количестве от 2 до 6

  const passworPattern = null;
  // const passworPattern = '([a-zA-Z0-9_.,!?+-]+)';
  // любые латинские буквы, цифры, а также - и _
  // знаки пунктуации ?!,.'

  let typicalPattern;

  if (type === 'email') typicalPattern = emailPattern;
  if (type === 'password') typicalPattern = passworPattern;

  const handleChange = (e) => onChange(e.target.value);

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onClick={onClick}
      readOnly={readOnly}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      disabled={disabled}
      className={disabled ? s.input_disabled : s.input}
      pattern={pattern || typicalPattern}
    />
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
};
