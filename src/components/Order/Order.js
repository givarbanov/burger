import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    const ingredientsOut = [];

    for (let ingredientName in props.ingredients) {
        ingredientsOut.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    console.log(ingredientsOut);
    const ingredientsJSX = ingredientsOut.map(id => {
        return (
            <span 
                style={{
                    textTransform: 'capitalise',
                    padding: '5px',
                    margin: '0 8px',
                    display: 'inline-block',
                    border: '1px solid #eee'
                }}
                key={id.name}>{id.name} ({id.amount})</span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsJSX}</p>
            <p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;