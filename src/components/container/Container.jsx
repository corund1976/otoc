import PropTypes, { node } from 'prop-types';

import s from './container.module.css';

function Container({ children = node }) {
  return <div className={s.container}>{children}</div>;
}
export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
