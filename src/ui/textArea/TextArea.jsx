import PropTypes from 'prop-types';

import s from './textArea.module.css';

function TextArea({
  id,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength,
  autoCorrect,
  readOnly,
  required,
  disabled,
  pattern,
}) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      readOnly={readOnly}
      minLength={minLength}
      maxLength={maxLength}
      autoCorrect={autoCorrect}
      required={required}
      disabled={disabled}
      pattern={pattern}
      className={disabled ? s.textarea_disabled : s.textarea}
    />
  );
}

export default TextArea;

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  autoCorrect: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: '',
  onChange: () => {},
  autoCorrect: 'true',
  minLength: 0,
  maxLength: 1024,
  readOnly: false,
  required: false,
  disabled: false,
  pattern: null,
  // pattern: '(.*?)',
};
