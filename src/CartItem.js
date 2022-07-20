import React from 'react';

class CartItem extends React.Component{

    render(){

        console.log(this.props);
        const {price, title, qty}=this.props.product;
        const {product, onIncreaseQuantity, onDecreaseQuantity}=this.props;

        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className='right-block'>
                    <div style={{fontSize : 25}}>{title}</div>
                    <div style={{color : '#777'}}>Rs. {price}</div>
                    <div style={{color : '#777'}}>Qty : {qty}</div>
                    <div className='cart-item-actions'>
                        {/* Buttons */}
                        <img 
                            alt='increase'
                            className='action-icons'
                            src='https://cdn-icons-png.flaticon.com/512/992/992651.png'
                            onClick={() => onIncreaseQuantity(product)} 
                        />
                        <img
                            alt='decrease'
                            className='action-icons'
                            src='https://cdn-icons-png.flaticon.com/512/66/66889.png'
                            onClick={() => onDecreaseQuantity(product)}
                        />
                        <img
                            alt='delete'
                            className='action-icons'
                            src='https://cdn-icons.flaticon.com/png/512/2874/premium/2874796.png?token=exp=1658154666~hmac=8d2368a2d4cdcd0a7fc9269d3b66a955' 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const styles={
    image : {
        height : 110,
        width : 110,
        borderRadius : 4,
        backgroundColor : '#ccc'
    }
};

export default CartItem;