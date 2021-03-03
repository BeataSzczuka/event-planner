import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEvent } from '../../store/actionCreators';
import './Event.css';

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

  render() {
    if (this.props.event) {
      return (
        <div className="Event">
          <div>{this.props.event.title}</div>
        </div>
      );
    } else {
      return <div>Event not found</div>;
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
