import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

        if(!formIsValid) {
            return;
        }

        props.onComfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        });
    }

    const nameControlClass = `${classes.control} ${formInputValidity.name ? '' : classes.invalid }`;
    const streetControlClass = `${classes.control} ${formInputValidity.street ? '' : classes.invalid }`;
    const postalCodeControlClass = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid }`;
    const cityControlClass = `${classes.control} ${formInputValidity.city ? '' : classes.invalid }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>pls enter name.</p>}
            </div>
            <div className={streetControlClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>pls enter street.</p>}
            </div>
            <div className={postalCodeControlClass}>
                <label htmlFor='potal'>Postal Code</label>
                <input type='text' id='potal' ref={postalCodeInputRef} />
                {!formInputValidity.postalCode && <p>pls enter valid postal code.(5 characters long)</p>}
            </div>
            <div className={cityControlClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>pls enter city.</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Close</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )

}

export default Checkout;