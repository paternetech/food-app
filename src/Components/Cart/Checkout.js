import { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveCharacters = value => value.trim().length !== 5;

const Checkout = props => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const postalInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enterdNameIsValid = !isEmpty(enteredName);
    const enteredPostalIsValid = !isNotFiveCharacters(enteredPostal);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enterdNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enterdNameIsValid &&
      enteredPostalIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  const nameControlClass = `${styles.control} ${
    formInputValidity.name ? '' : styles.invalid
  }`;
  const addressControlClass = `${styles.control} ${
    formInputValidity.address ? '' : styles.invalid
  }`;
  const postalControlClass = `${styles.control} ${
    formInputValidity.postalCode ? '' : styles.invalid
  }`;
  const cityControlClass = `${styles.control} ${
    formInputValidity.city ? '' : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter valid a name!</p>}
      </div>
      <div className={addressControlClass}>
        <label htmlFor="street">Street</label>
        <input ref={addressInputRef} type="text" id="street" />
        {!formInputValidity.address && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code! (5 charecters)</p>
        )}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
