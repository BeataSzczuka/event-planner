import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEvents } from '../../store/actionCreators';
import './Events.css';

type EventsStateType = {
  eventsReducer: EventsState
}

interface EventsProps {
  events: IEvent[]
  getEvents: typeof getEvents
}


class Events extends Component<EventsProps, EventsStateType> {

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return(
      <div className="Events">
        Events
        <div>
          {this.props.events.map((event: IEvent, i) => (<div key={i}>{event.title}</div>) )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: EventsStateType) => {
  return {
    events: state.eventsReducer.events
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getEvents: getEvents
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
