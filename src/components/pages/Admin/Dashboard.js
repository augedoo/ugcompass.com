import { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Dashboard is under construction.</h1>
      <h4 style={{ color: '#D2A969' }}>Please come back later</h4>
    </div>
  );
};

export default Dashboard;
