const axios = require('axios');
const config = require('../config');

module.exports = {
  products: {
    getProducts: (req, res) => {
      axios.get(`${config.ALTELIER_API}/products`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getProductById: (req, res) => {
      axios.get(`${config.ALTELIER_API}/products/${req.params.product_id}`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getStyles: (req, res) => {
      axios.get(`${config.ALTELIER_API}/products/${req.params.product_id}/styles`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getRelated: (req, res) => {
      axios.get(`${config.ALTELIER_API}/products/${req.params.product_id}/related`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
  },
  reviews: {
    getReviews: (req, res) => {
      axios.get(`${config.ALTELIER_API}/reviews?product_id=42366`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getMetadata: (req, res) => {
      axios.get(`${config.ALTELIER_API}/reviews/meta`, {
        headers: {
          Authorization: `${config.API_KEY}`,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    postReviews: () => {},
    putReviewHelpful: () => {},
    putReviewReport: () => {},
  },
  QandA: {
    getQuestions: () => {},
    getAnswers: () => {},
    postQuestion: () => {},
    postAnswer: () => {},
    putQuestionHelpful: () => {},
    putAnswerHelpful: () => {},
    putQuestionReport: () => {},
    putAnswerReport: () => {},
  },
};