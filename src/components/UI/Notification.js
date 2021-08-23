import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetNotification } from '../../store/notification-slice';
import classes from './Notification.module.css';

const Notification = (props) => {
  const dispatch = useDispatch();
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  let cssClasses = `${classes.notification} ${specialClasses}`;


  useEffect(() => {
    setTimeout(() => {
      dispatch(resetNotification());
    }, 2000)
  }, [props, dispatch])



  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;