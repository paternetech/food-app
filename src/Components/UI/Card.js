import Styles from './Card.module.css';

const Card = props => {
  return <div className={Styles.card}>{props.children}</div>;
};

export default Card;
