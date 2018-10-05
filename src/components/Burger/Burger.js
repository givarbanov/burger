import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {

    let transformedIngrediemts = null;
    if (props.ingredients) {
        transformedIngrediemts = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, index) => {
                    return <BurgerIngredient key={igKey + index} type={igKey} />
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);

            if (transformedIngrediemts.length <= 0) {
                transformedIngrediemts = <p>Prease start add ingredients!</p>
            }
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngrediemts}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;