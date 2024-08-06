import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import InfoIcon from 'images/info.svg?react';

import s from './info.module.css';

// Синтаксис <Info text="подсказка Клики" left over />

function Info({ text, left, over, width }) {
  const textRef = useRef(null);

  // Выравнивание блока текста слева от "I"
  useEffect(() => {
    if (left) {
      if (width) textRef.current.style.left = `-${width}px`;
      else textRef.current.style.left = `-250px`;
      textRef.current.style.borderRadius = `12px 0px 12px 12px`;
    }
  }, [left, width]);

  // Выравнивание блока текста по высоте
  useEffect(() => {
    if (over) textRef.current.style.top = '0';
  }, [over]);

  // Изменяю ширину блока текста, если не помещается
  useEffect(() => {
    if (width) textRef.current.style.width = `${width}px`;
  }, [width]);

  return (
    <div className={s.info}>
      <InfoIcon />
      <div className={s.info_text} ref={textRef}>
        {text}
      </div>
    </div>
  );
}

export default Info;

Info.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  left: PropTypes.bool,
  over: PropTypes.bool,
};

Info.defaultProps = {
  width: '',
  left: false,
  over: false,
};
