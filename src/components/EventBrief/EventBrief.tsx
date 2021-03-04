import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EventBrief.css';
import { APIUrlImage } from '../../store/actionCreators';
import { faMapMarkedAlt, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

interface EventBriefProps {
  event: IEvent;
}

function EventBrief({ event }: EventBriefProps) {
  return (
    <Card className="card-root">
      <CardHeader className="header" title={event.title} />
      <CardContent>
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
          <FontAwesomeIcon icon={faTheaterMasks} />
          {event.eventType}
        </div>
      </CardContent>
    </Card>
  );
}

export default EventBrief;
