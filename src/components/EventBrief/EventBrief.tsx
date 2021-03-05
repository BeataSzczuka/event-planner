import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EventBrief.css';
import { APIUrlImage } from '../../store/actionCreators';
import {
  faFootballBall,
  faHeartbeat,
  faMapMarkedAlt,
  faTheaterMasks,
} from '@fortawesome/free-solid-svg-icons';

export interface EventBriefProps {
  event: IEvent;
}

function EventBrief({ event }: EventBriefProps) {
  const selectIcon = () => {
    if (event.eventType === 'Kultura') return <FontAwesomeIcon icon={faTheaterMasks} />;
    if (event.eventType === 'Sport') return <FontAwesomeIcon icon={faFootballBall} />;
    if (event.eventType === 'Zdrowie') return <FontAwesomeIcon icon={faHeartbeat} />;
  };
  return (
    <Card className="card-root">
      <CardHeader className="header" title={event.title} />
      <CardContent id="description">
        <Typography variant="body2" color="textSecondary" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardMedia image={`${APIUrlImage}${event.image}`} title={event.title} className="media" />
      <CardContent id="details">
        <div className="detail">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
          {event.place}
        </div>
        <div className="detail">
          {selectIcon()}
          {event.eventType}
        </div>
      </CardContent>
    </Card>
  );
}

export default EventBrief;
