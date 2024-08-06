import PropTypes from 'prop-types';

import s from './backdrop.module.css';

function Backdrop({ children }) {
  return <div className={s.backdrop}>{children}</div>;
}

export default Backdrop;

Backdrop.propTypes = {
  children: PropTypes.node.isRequired,
};
