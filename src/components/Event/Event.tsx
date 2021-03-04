import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { routes } from '../../routes';
import { APIUrlImage, getEvent } from '../../store/actionCreators';
import './Event.css';
import {
  faArrowLeft,
  faCalendarDay,
  faClock,
  faMapMarkedAlt,
  faFootballBall,
  faTheaterMasks,
  faHeartbeat,
} from '@fortawesome/free-solid-svg-icons';

type EventStateType = {
  eventReducer: EventState;
};

interface EventProps {
  event: IEvent | undefined;
  getEvent: typeof getEvent;
  id: string | undefined;
}

class Event extends Component<EventProps, EventStateType> {
  componentDidMount() {
    const eventId = this.props.id;
    if (eventId) {
      this.props.getEvent(+eventId);
    }
  }

  selectIcon = (eventType: string) => {
    if (eventType === 'Kultura') return <FontAwesomeIcon icon={faTheaterMasks} />;
    if (eventType === 'Sport') return <FontAwesomeIcon icon={faFootballBall} />;
    if (eventType === 'Zdrowie') return <FontAwesomeIcon icon={faHeartbeat} />;
  };

  render() {
    if (this.props.event) {
      return (
        <div className="Event">
          <div id="header">Szczegóły wydarzenia</div>
          <div id="about-event">
            <h1>{this.props.event.title}</h1>
            <img src={`${APIUrlImage}${this.props.event.image}`} alt="ss" />

            <div className="event-details">
              <div className="section-title">czas i miejsce</div>
              <div>
                <FontAwesomeIcon icon={faCalendarDay} />
                <span>{new Date(this.props.event.datetime).toLocaleDateString()}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faClock} />
                <span>
                  {new Date(this.props.event.datetime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                <span>{this.props.event.place}</span>
              </div>
            </div>
            <div className="event-details">
              <div className="section-title">kategoria</div>
              <div>
                {this.selectIcon(this.props.event.eventType)}
                <span>{this.props.event.eventType}</span>
              </div>
            </div>
            <div>
              <div className="section-title">opis</div>
              <div id="description">{this.props.event.description}</div>
            </div>
            <div>
              <div className="section-title">skontaktuj się z organizatorem</div>
              <div className="contact">
                <div>
                  <span>email</span>
                  <span>{this.props.event.email}</span>
                </div>
                <div>
                  <span>telefon</span>
                  <span>{this.props.event.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <Link to={routes.events}>
            <Button id="back-btn">
              <FontAwesomeIcon icon={faArrowLeft} />
              Wroć do listy wydarzeń
            </Button>
          </Link>
        </div>
      );
    } else {
      return <div>Nie znaleziono wydarzenia</div>;
    }
  }
}

const mapStateToProps = (state: EventStateType) => {
  return {
    event: state.eventReducer.event,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getEvent,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Event);
