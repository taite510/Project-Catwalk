const axios = require('axios');
// const config = require('../config');
const productsUrl = 'http://54.177.121.5:5000';
const questionsUrl = 'http://18.217.106.186:3001';
const reviewsUrl = 'http://18.218.143.214:5000';

module.exports = {
  products: {
    getProducts: (req, res) => {
      axios.get(`${productsUrl}/products`, {
        headers: {
          Authorization: '431231231231215412',
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
      axios.get(`${productsUrl}/products/${req.params.product_id}`, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          console.log(response.data);
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getStyles: (req, res) => {
      axios.get(`${productsUrl}/products/${req.params.product_id}/styles`, {
        headers: {
          Authorization: '431231231231215412',
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
      axios.get(`${productsUrl}/products/${req.params.product_id}/related`, {
        headers: {
          Authorization: '431231231231215412',
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
      console.log(req.params.product_id);
      const productStr = `?product_id=${req.params.product_id}&count=100`;
      console.log(`${reviewsUrl}/reviews/${productStr}`);
      axios.get(`${reviewsUrl}/reviews/${productStr}`)
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getMetadata: (req, res) => {
      const productStr = `?product_id=${req.params.product_id}`;
      axios.get(`${reviewsUrl}/reviews/meta/${productStr}`, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    postReviews: (req, res) => {
      console.log(req.body);
      axios.post(`${reviewsUrl}/reviews`, req.body, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then(() => {
          res.status(200).send('Successfully made POST review');
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putReviewHelpful: (req, res) => {
      axios.put(`${reviewsUrl}/reviews/${req.params.review_id}/helpful`, {}, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then(() => {
          res.status(200).send('Successfully made PUT request: helpful');
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putReviewReport: (req, res) => {
      axios.put(`${reviewsUrl}/reviews/${req.params.review_id}/report`, {}, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then(() => {
          res.status(200).send('Successfully made PUT request: report');
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
  },
  QandA: {
    getQuestions: (req, res) => {
      // count 3 shows 2 questions. not sure why it's not consistent with the number
      // /?product_id=42366&count=3
      // console.log('req params QA', req.params.product_id);
      axios.get(`${questionsUrl}/qa/questions/?product_id=${req.params.product_id}&count=100`, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    getAnswers: (req, res) => {
      // console.log('get answers params', req.params);
      // remove count `/answers?count=2`
      axios.get(`${questionsUrl}/qa/questions/${req.params.question_id}/answers`, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    postQuestion: (req, res) => {
      // need to send product id with body
      // body: {"body": "Is the sizing accurate?", "name": "fashionista123",
      // "email": "fashionista123@gmail.com", "product_id": 42366}
      axios.post(`${questionsUrl}/qa/questions/`, {
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        product_id: req.body.product_id,
      }, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    postAnswer: (req, res) => {
      // need to send question id with body
      // need to figure out how to get img url from user photo uploads
      // body: {"body": "True to size", "name": "jane",
      // "email": "jane@gmail.com", "photos": []}
      axios.post(`${questionsUrl}/qa/questions/${req.params.question_id}/answers`, {
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        photos: [],
      }, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putQuestionHelpful: (req, res) => {
      axios.put(`${questionsUrl}/qa/questions/${req.params.question_id}/helpful`, {}, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putAnswerHelpful: (req, res) => {
      axios.put(`${questionsUrl}/qa/answers/${req.params.answer_id}/helpful`, {}, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putQuestionReport: (req, res) => {
      axios.put(`${questionsUrl}/qa/questions/${req.params.question_id}/report`, {}, {
        headers: {
          Authorization: '431231231231215412',
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    putAnswerReport: (req, res) => {
      axios.put(`${questionsUrl}/qa/answers/${req.params.answer_id}/report`, {}, {
        headers: {
          Authorization: '431231231231215412',
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
};