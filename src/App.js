import React from 'react';

import Cart from './Cart';
import Navbar from './Navbar';

import firebase from 'firebase/app';
import 'firebase/firestore';


class App extends React.Component{

  constructor(){
    super();
    this.state={
        products : [],
        loading : true
    };
  }

  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()            // making a http call to the firestore database
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products=snapshot.docs.map((doc) => {
    //       let data=doc.data();

    //       data['id']=doc.id;

    //       return data;
    //     });

    //     this.setState({
    //       products,
    //       loading : false
    //     });
    //   })


    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {         // attaching a listener to the products collection that listens for any events in the QuerySnapshot object
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products=snapshot.docs.map((doc) => {
          let data=doc.data();

          data['id']=doc.id;

          return data;
        });

        this.setState({
          products,
          loading : false
        });
      });
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

    const {products, loading}=this.state;

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
        {loading && <h1>Loading Products...</h1>}
        <div style={{padding : 10, fontSize : 20}}>Total : {this.getCartTotal()}</div>
      </div>
    );
  }
  
}

export default App;
