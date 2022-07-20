import React from 'react';

import CartItem from './CartItem';

const Cart= (props) => {

    const {products}=props;

    return (
        <div className='cart'>
            {products.map((product) => {
                return (<CartItem 
                            product={product}           //shallow copy of product object in props of CartItem 
                            key={product.id}
                            onIncreaseQuantity={props.onIncreaseQuantity}
                            onDecreaseQuantity={props.onDecreaseQuantity}
                            onDeleteProduct={props.onDeleteProduct}
                        />);
            })}
        </div>
    );
};

export default Cart;