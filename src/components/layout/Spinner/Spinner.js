import './Spinner.css';
import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ size }) => {
  return (
    <div className='spinner-wrapper'>
      <sl-spinner style={{ fontSize: `${size}rem` }}></sl-spinner>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 3,
};

export default Spinner;
