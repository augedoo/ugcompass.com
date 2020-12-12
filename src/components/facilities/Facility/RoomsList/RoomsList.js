import './RoomsList.css';
import React from 'react';

const Rooms = ({ rooms }) => {
  const renderedRoomsList = rooms.map((room) => {
    const { _id, name, description } = room;

    return (
      <div key={_id} className='rooms-list__item'>
        <a href={`/rooms/${room._id}`}>
          <p className='name'>{name}</p>
          <p className='desc'>
            {description} <span>Discover more</span>
          </p>
        </a>
      </div>
    );
  });

  return <div className='rooms-list'>{renderedRoomsList}</div>;
};

export default Rooms;
