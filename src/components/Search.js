import React, { useState, useEffect } from 'react';
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState([]);


  // using useEffect, setting a throttling timer and a debouncing term, so
  // it wont generate an additional request and only after typing and waiting for 1 second
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term)
    }, 1000);
    return () => {
      // during cleanup, clear the timer, just when user changes the input
      clearTimeout(timerId)
    };
  }, [term])

  // you can use useEffect more than once!

  // alternative way to use useEffect with promises, this will run the request using the debouncedTerm
  useEffect(() => {
    if (!debouncedTerm) return; // only search if there is a term
    // setting a throttle/debouce timer
    axios.get('https://en.wikipedia.org/w/api.php',
      {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          origin: '*',
          srsearch: debouncedTerm
        }
      })
      .then(({ data }) => { // destructuring to reach the response
        setResults(data?.query?.search);
      }).catch((err) => {
        console.log(err.message);
      });

  }, [debouncedTerm]); // only search if the term has changed!

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`http://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div >
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;
