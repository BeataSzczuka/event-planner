import React, { Component } from 'react';
import { Button, MenuItem, Snackbar, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { addEvent, clearMessage } from '../../store/actionCreators';
import './AddEvent.css';

type AddEventStateType = {
  eventReducer: EventState;
};

interface AddEventProps {
  message: string | undefined;
  addEvent: typeof addEvent;
  clearMessage: typeof clearMessage;
}

const phoneRegExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

class AddEvent extends Component<AddEventProps, AddEventStateType> {
  typesOfEvent = ['Sport', 'Kultura', 'Zdrowie', 'Inne'];

  showErrors = (error: string | undefined, touched: boolean | undefined) =>
    error && touched && <div className="input-feedback">{error}</div>;

  initialValues: IEventForm = {
    title: '',
    description: '',
    datetime: '',
    eventType: '',
    phoneNumber: '',
    email: '',
    place: '',
  };

  render() {
    return (
      <div className="AddEvent">
        <h1>Dodawanie wydarzenia</h1>
        <Formik
          initialValues={this.initialValues}
          onSubmit={async (values, { resetForm }) => {
            await this.props.addEvent(values);
            resetForm();
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('To pole jest wymagane'),
            datetime: Yup.string().required('To pole jest wymagane'),
            description: Yup.string().required('To pole jest wymagane'),
            eventType: Yup.string().required('To pole jest wymagane'),
            phoneNumber: Yup.string()
              .matches(phoneRegExp, 'Niepoprawny numer')
              .required('To pole jest wymagane'),
            email: Yup.string().email('Niepoprawny adres email').required('To pole jest wymagane'),
            place: Yup.string().required('To pole jest wymagane'),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Tytuł"
                  type="text"
                  value={values.title}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.title && touched.title ? 'text-input error' : 'text-input'}
                  helperText={errors.title && touched.title ? errors.title : ''}
                />

                <TextField
                  fullWidth
                  id="datetime"
                  name="datetime"
                  label="Data i czas"
                  type="datetime-local"
                  value={values.datetime}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: true }}
                  className={
                    errors.datetime && touched.datetime ? 'text-input error' : 'text-input'
                  }
                  helperText={errors.datetime && touched.datetime ? errors.datetime : ''}
                />

                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Opis"
                  multiline
                  rows={3}
                  type="text"
                  value={values.description}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.description && touched.description ? 'text-input error' : 'text-input'
                  }
                  helperText={errors.description && touched.description ? errors.description : ''}
                />

                <TextField
                  fullWidth
                  id="eventType"
                  name="eventType"
                  label="Rodzaj wydarzenia"
                  select
                  value={values.eventType}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.eventType && touched.eventType ? 'text-input error' : 'text-input'
                  }
                  helperText={errors.eventType && touched.eventType ? errors.eventType : ''}
                >
                  {this.typesOfEvent.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Numer telefonu kontaktowego"
                  type="text"
                  value={values.phoneNumber}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phoneNumber && touched.phoneNumber ? 'text-input error' : 'text-input'
                  }
                  helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
                />

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Adres email kontaktowy"
                  type="email"
                  value={values.email}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                  helperText={errors.email && touched.email ? errors.email : ''}
                />

                <TextField
                  fullWidth
                  id="place"
                  name="place"
                  label="Miejsce wydarzenia"
                  type="text"
                  value={values.place}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.place && touched.place ? 'text-input error' : 'text-input'}
                  helperText={errors.place && touched.place ? errors.place : ''}
                />

                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Wyczyść
                </Button>

                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                  Zapisz wydarzenie
                </Button>
              </form>
            );
          }}
        </Formik>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!this.props.message}
          onClose={() => this.props.clearMessage()}
          autoHideDuration={6000}
          message={this.props.message}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AddEventStateType) => {
  return {
    message: state.eventReducer.message,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addEvent,
      clearMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
