import React, { Fragment } from 'react';
import MealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeal</h1>
                <button>Cart</button>
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImage} alt='a table full of delicious food' /> 
            </div>
        </Fragment>
    )
}

export default Header;