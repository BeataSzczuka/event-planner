import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIUrlImage, getEvents } from '../../store/actionCreators';
import './Events.css';
import { routes } from '../../routes';

type EventsStateType = {
  eventsReducer: EventsState;
};

interface EventsProps {
  events: IEvent[];
  getEvents: typeof getEvents;
}

class Events extends Component<EventsProps, EventsStateType> {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div className="Events">
        Wydarzenia
        <div>
          {this.props.events.map((event: IEvent, i) => (
            <div key={i}>
              {event.title}
              <img src={`${APIUrlImage}${event.image}`} alt="event" />
            </div>
          ))}
        </div>
        <Link to={routes.addEvent}>
          <Button variant="contained" color="primary">
            Dodaj
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: EventsStateType) => {
  return {
    events: state.eventsReducer.events,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getEvents: getEvents,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Events);
