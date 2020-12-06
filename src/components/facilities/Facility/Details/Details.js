import './Details.css';
import moment from 'moment';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Details = ({ facility }) => {
  const { description, hours, email, website, address, phone } = facility;

  return (
    <Fragment>
      <p className='desc'>{description}</p>
      <div>
        {hours.length > 0 && (
          <div className='wrk-hrs'>
            <h4>Working Hours</h4>
            <ul>
              {hours.map((hour, index) => {
                return (
                  <li key={index}>
                    <span className='day type'>{hour.day}:</span>
                    <span className='time'>
                      {moment(`${hour.open}`, 'hh:mm').format('hh:mm A')} -{' '}
                      {moment(`${hour.close}`, 'hh:mm').format('hh:mm A')}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {!phone && !address && !email && !website ? null : (
          <div className='more-info'>
            <h4>More Info</h4>
            <ul>
              {phone && (
                <li>
                  <span className='type'>Phone:</span> {phone}
                </li>
              )}
              {email && (
                <li>
                  <span className='type'>Email:</span> {email}
                </li>
              )}
              {website && (
                <li>
                  <span className='type'>Website:</span>
                  <a target='_blank' rel='noreferrer' href={`${website}`}>
                    {website}
                  </a>
                </li>
              )}
              {address && (
                <li>
                  <span className='type'>Address:</span> &nbsp; {address}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Details.propTypes = {
  facility: PropTypes.object.isRequired,
};

export default Details;
