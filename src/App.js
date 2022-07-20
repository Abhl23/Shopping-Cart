import React from 'react';

import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component{

  constructor(){
    super();
    this.state={
        products : [
            {
                price : 999,
                title : 'Mobile Phone',
                qty : 3,
                img : 'https://images.unsplash.com/photo-1620049185596-1f16f414c448?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
                id : 1
            },
            {
                price : 99,
                title : 'Watch',
                qty : 4,
                img : 'https://images.unsplash.com/photo-1639006570490-79c0c53f1080?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                id : 2
            },
            {
                price : 9999,
                title : 'Laptop',
                qty : 2,
                img : 'https://images.unsplash.com/photo-1532198528077-0d9e4ca9bb40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80',
                id : 3
            }
        ]
    };
  }

  handleIncreaseQuantity = (product) => {
      console.log('Hey increase the qty of', product);

      const {products}=this.state;
      const index=products.indexOf(product);

      products[index].qty+=1;

      this.setState({
          products
      });
  };

  handleDecreaseQuantity = (product) => {
      console.log('Hey decrease the qty of', product);

      if(product.qty===0)
          return;

      const {products}=this.state;
      const index=products.indexOf(product);

      products[index].qty-=1;

      this.setState({
          products
      });
  };

  handleDeleteProduct = (id) => {             //can also be passed the product itself for filtering the array
      console.log('Hey delete the product with id', id);

      const {products}=this.state;

      const items=products.filter((item) => item.id!==id);       //this will return an array with the products not having the id

      this.setState({
          products : items
      });
  };

  getCartCount= () => {
    const {products}=this.state;

    let count=0;

    products.forEach((product) => {
      count+=product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const {products}=this.state;

    let cartTotal=0;

    products.forEach((product) => {
      cartTotal+=product.qty*product.price;
    });

    return cartTotal;
  };

  render(){

    const {products}=this.state;

    return (
      <div className="App">
        <Navbar
          count={this.getCartCount()}
        />
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{padding : 10, fontSize : 20}}>Total : {this.getCartTotal()}</div>
      </div>
    );
  }
  
}

export default App;
