import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(timerId);
    }
  }, [text])

  useEffect(() => {
    if (!debouncedText) return;
    axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
      params: {
        q: debouncedText,
        target: language.value,
        key: 'XXXX'
      }
    }).then(({ data }) => {
      setTranslated(data?.data?.translations?.pop()?.translatedText);
    }).catch(err => console.log(err.message));
  }, [language, debouncedText])


  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
