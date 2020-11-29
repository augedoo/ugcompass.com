import './Alerts.css';
import React, { Fragment, useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div className='alert-container'>
        <sl-alert key={alert.id} type={alert.type} open>
          {alert.icon !== '' && (
            <sl-icon slot='icon' name={alert.icon}></sl-icon>
          )}
          <strong>{alert.msg}</strong> <br />
        </sl-alert>
      </div>
    ))
  );
};

export default Alerts;
