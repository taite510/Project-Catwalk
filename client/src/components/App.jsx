/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails/ProductDetails';
import QandA from './QandA/QandA';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import Reviews from './Reviews/Reviews';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productsData: null,
      currentID: '',
    };

    this.getProducts = this.getProducts.bind(this);
    this.IDchanger = this.IDchanger.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('/products')
      .then((res) => {
        console.log(res.data);
        this.setState({
          productsData: res.data,
          currentID: res.data[0].id,
        });
      })
      .catch((err) => console.log('error', err));
  }

  IDchanger(targetID) {
    this.setState({
      currentID: targetID,
    });
  }

  render() {
    if (!this.state.productsData) { return null; }
    console.log('currentID', this.state.currentID);
    return (
      <div>
        <p>Hello Cat Trap</p>
        <ProductDetails productId={this.state.currentID} />
        <RelatedProducts productId={this.state.currentID} IDchanger={this.IDchanger} />
        <QandA productId={this.state.currentID} />
        <Reviews productId={this.state.currentID} />
      </div>
    );
  }
}

export default App;