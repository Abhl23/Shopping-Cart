import React from 'react';

class CartItem extends React.Component{

    constructor(){
        super();
        this.state={
            price : 999,
            title : 'Mobile Phone',
            qty : 1,
            img : ''
        };
        // this.increaseQuantity=this.increaseQuantity.bind(this);
    }

    increaseQuantity = () => {
        this.setState((prevState) => {
            return {
                qty : prevState.qty+1
            };
        });
    };

    decreaseQuantity = () => {
        if(this.state.qty===0)
            return;
        this.setState((prevState) => {
            // if(prevState.qty===0)
            //     return;
            return {
                qty : prevState.qty-1
            };
        });
    };

    render(){

        const {price, title, qty}=this.state;

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
                            onClick={this.increaseQuantity} 
                        />
                        <img
                            alt='decrease'
                            className='action-icons'
                            src='https://cdn-icons-png.flaticon.com/512/66/66889.png'
                            onClick={this.decreaseQuantity}
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