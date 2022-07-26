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
    this.db=firebase.firestore();
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


    this.db
      .collection('products')
      .onSnapshot((snapshot) => {         // attaching a listener to the products collection that listens for any events in the QuerySnapshot object
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products=snapshot.docs.map((doc) => {
          const data=doc.data();

          data['id']=doc.id;        // adding id to the data object which is present is the doc object

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

      // products[index].qty+=1;

      // this.setState({
      //     products
      // });

      const docRef=this.db.collection('products').doc(product.id);

      docRef
        .update({
          qty : products[index].qty+1
        })
        .then(() => {
          console.log('Updated successfully');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
  };

  handleDecreaseQuantity = (product) => {
      console.log('Hey decrease the qty of', product);

      if(product.qty===0)
          return;

      const {products}=this.state;
      const index=products.indexOf(product);

      // products[index].qty-=1;

      // this.setState({
      //     products
      // });

      const docRef=this.db.collection('products').doc(product.id);

      docRef
        .update({
          qty : products[index].qty-1
        })
        .then(() => {
          console.log('Updated successfully');
        })
        .catch((error) => {
          console.log('Error:', error);
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

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img : 'https://images.samsung.com/is/image/samsung/p6pim/in/ww90t604dln-tl/gallery/in-front-loading-washer-ww10t604clhs4-ww90t604dln-tl-383418576?$1300_1038_PNG$',
        price : 8999,
        qty : 2,
        title : 'Washing Machine'
      })
      .then((docRef) => {
        console.log('Product has been added', docRef);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  render(){

    const {products, loading}=this.state;

    return (
      <div className="App">
        <Navbar
          count={this.getCartCount()}
        />
        {/* <button onClick={this.addProduct} style={{padding : 10, fontSize : 20}}>Add Product</button> */}
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
