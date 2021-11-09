import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylePhotos = ({ styleId, IDchanger }) => {
  // const [styleID, setStyleId] = useState(styleId)
  const [style, setStyle] = useState([]);
  let imgUrl;
  let name;

  useEffect(() => {
    if (styleId) {
      axios.get(`products/${styleId}/styles`)
        .then((results) => {
          setStyle(results.data.results);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  if (style[0]) {
    const photosArr = style[0].photos;
    name = style[0].name;
    imgUrl = photosArr[0].url;
  }

  return (
    <div onClick={IDchanger} aria-hidden="true">
      <img className="product-card__image" src={imgUrl} alt={name} />
    </div>
  );
};

export default StylePhotos;