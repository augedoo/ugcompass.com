import './Room.css';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import Spinner from '../layout/Spinner/Spinner';
import ImageList from '../layout/ImageList/ImageList';

import FacilityContext from '../../context/facilities/facilitiesContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Room = (props) => {
  const facilityContext = useContext(FacilityContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { room, getRoom, loading, error, clearErrors } = facilityContext;
  const { user, loadUser } = authContext;
  const { setAlert } = alertContext;

  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    loadUser();

    if (currentRoom === null) {
      getRoom(props.match.params.roomId);
    }

    if (room !== null) {
      setCurrentRoom(room);
    }

    if (error) {
      setAlert(error, 'warning', 'exclamation-triangle');
    }

    return () => {
      clearErrors();
    };

    //eslint-disable-next-line
  }, [error, room]);

  console.log(currentRoom);

  return (
    <Fragment>
      {currentRoom !== null && user !== null && !loading ? (
        <main className='room-wrapper'>
          <div className='l-content'>
            <div className='facility'>
              <div id='details'>
                <section className='facility__heading'>
                  <h1>{currentRoom.name}</h1>
                  <p>{`${currentRoom.category} room`}</p>
                </section>

                <section className='facility__details'>
                  <h3>Description</h3>
                  <Fragment>
                    <p className='desc'>{currentRoom.description}</p>
                    <div>
                      <div className='more-info'>
                        <h4>More Info</h4>

                        <ul>
                          {currentRoom.phone && (
                            <li>
                              <span className='type'>Phone:</span>{' '}
                              {currentRoom.phone}
                            </li>
                          )}
                          {currentRoom.email && (
                            <li>
                              <span className='type'>Email:</span>{' '}
                              {currentRoom.email}
                            </li>
                          )}
                          {currentRoom.website && (
                            <li>
                              <span className='type'>Website:</span>
                              <a
                                target='_blank'
                                rel='noreferrer'
                                href={`${currentRoom.website}`}
                              >
                                {currentRoom.website}
                              </a>
                            </li>
                          )}
                          {currentRoom.address && (
                            <li>
                              <span className='type'>Address:</span> &nbsp;{' '}
                              {currentRoom.address}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Fragment>
                </section>
              </div>
            </div>
          </div>
          {/* {currentRoom.photos.length > 0 ? ( */}
          <div className='r-content'>
            <div className='r-content-wrapper'>
              <section className='facility__images'>
                <h3>Photos</h3>
                <ImageList
                  entity={{
                    name: currentRoom.name,
                    photos: currentRoom.photos,
                  }}
                />
              </section>
            </div>
          </div>
          {/* ) : null} */}
        </main>
      ) : (
        <Spinner size={4} />
      )}
    </Fragment>
  );
};

export default Room;
