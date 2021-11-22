/* eslint-disable react/no-did-update-set-state */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import ProductStyle from './productStyle';
import ProductSlogan from './productSlogan';
import PhotoGallery from './PhotoGallery';

// import config from '../../../../config';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      currentID: this.props.productId,
      style: null,
      currentStyle: null,
      currentReviews: null,
    };

    this.setCurrentStyle = this.setCurrentStyle.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  componentDidUpdate() {
    if (this.props.productId !== this.state.currentID) {
      this.setState({
        currentID: this.props.productId,
      });
      this.getProductInfo();
      // console.log('this.state.currentID', this.state.currentID);
    }
  }

  getProductInfo() {
    axios.get(`/products/${this.props.productId}`)
      .then((response) => {
        console.log('product info', this.state.currentID, response.data);
        this.setState({
          product: response.data,
        });
      })
      .then(axios.get(`/products/${this.props.productId}/styles`)
        .then((response) => {
          console.log('product style', response.data);
          this.setState({
            style: response.data,
            currentStyle: response.data.results[0],
          });
        }))
      .then(axios.get(`/reviews/${this.props.productId}`)
        .then((response) => {
          console.log('product reviews', response.data);
          this.setState({
            currentReviews: response.data,
          });
        }))
      .catch((err) => {
        throw err;
      });
  }

  setCurrentStyle(val) {
    this.setState({
      currentStyle: val,
    });
  }

  render() {
    if (!this.state.product
      || !this.state.style
      || !this.state.currentStyle
      || !this.state.currentReviews) { return null; }
    return (
      <div className="productDetails">
        <PhotoGallery currentStyle={this.state.currentStyle} />
        <ProductStyle
          style={this.state.style}
          product={this.state.product}
          setCurrentStyle={this.setCurrentStyle}
          currentReviews={this.state.currentReviews}
        />
        <ProductSlogan product={this.state.product} />
      </div>
    );
  }
}

export default ProductDetails;
