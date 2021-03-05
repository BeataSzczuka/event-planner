import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEvents } from '../../store/actionCreators';
import './Events.css';
import { routes } from '../../routes';
import EventBrief from '../EventBrief/EventBrief';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

type EventsStateType = {
  eventsReducer: EventsState;
};

export interface EventsProps {
  events: IEvent[];
  getEvents: typeof getEvents;
}

export class Events extends Component<EventsProps, EventsStateType> {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div className="Events">
        <div className="header">
          <h1>Wydarzenia</h1>
          <h2>zobacz jakie wydarzenia odbędą się w najbliższym czasie</h2>
        </div>
        <div className="cards-container">
          {this.props.events.map((event: IEvent, i) => (
            <Link
              to={`/event/${event.id}`}
              key={i}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="card"
            >
              <EventBrief event={event} />
              <div className="card-hover">
                <span>
                  Dowiedz się więcej
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </span>
              </div>
            </Link>
          ))}
          {this.props.events.length === 0 && <div id="no-events">Brak wydarzeń</div>}
        </div>
        <div id="add-event-container">
          <span>
            <h2>
              Organizujesz wydarzenie i chcesz, żeby dowiedziało się o nim jak najwięcej osób?
            </h2>
            <h3>Dobrze trafiłeś! Wypełnij formularz i dodaj wydarzenie</h3>
          </span>
          <Link
            to={routes.addEvent}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Button variant="contained" id="add-event-btn" color="primary">
              Dodaj wydarzenie
            </Button>
          </Link>
        </div>
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
