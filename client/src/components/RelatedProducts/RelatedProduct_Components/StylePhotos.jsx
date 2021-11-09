import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const StylePhotos = ({ styleId, IDchanger }) => {
  // const [styleID, setStyleId] = useState(styleId)
  const isMountedRef = useRef(null);

  const [style, setStyle] = useState([]);
  let imgUrl;
  let name;

  useEffect(() => {
    isMountedRef.current = true;

    if (isMountedRef.current) {
      if (styleId) {
        axios.get(`products/${styleId}/styles`)
          .then((results) => {
            setStyle(results.data.results);
          })
          .catch((err) => console.error(err));
      }
    }

    return () => isMountedRef.current = false;
  }, []);

  if (style[0]) {
    const photosArr = style[0].photos;

    if (photosArr[0].url === null) {
      name = style[0].name;
      imgUrl = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    } else {
      name = style[0].name;
      imgUrl = photosArr[0].url;
    }
  }

  return (
    <div onClick={IDchanger} aria-hidden="true">
      <img className="product-card__image" src={imgUrl} alt={name} />
    </div>
  );
};

export default StylePhotos;