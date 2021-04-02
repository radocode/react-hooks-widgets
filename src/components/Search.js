import React, { useState, useEffect } from 'react';
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  // alternative way to use useEffect with promises
  useEffect(() => {
    if (!term) return;
    // setting a throttle/debouce timer
    const timeoutId = setTimeout(() => {
      axios.get('https://en.wikipedia.org/w/api.php',
        {
          params: {
            action: 'query',
            format: 'json',
            list: 'search',
            origin: '*',
            srsearch: term
          }
        })
        .then(({ data }) => { // destructuring to reach the response
          setResults(data?.query?.search);
        }).catch((err) => {
          console.log(err.message);
        });
    }, 500); // throttle timer of 500 ms

    // during cleanup, clear the timer, just when user changes the input
    return () => {
      clearTimeout(timeoutId);
    };

  }, [term]);

  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: debouncedTerm,
  //       },
  //     });

  //     setResults(data.query.search);
  //   };
  //   if (debouncedTerm) {
  //     search();
  //   }
  // }, [debouncedTerm]);

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
