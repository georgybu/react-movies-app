import React, {useEffect, useState} from 'react';
import api from '../api';
import {Link} from 'react-router-dom';
import './Movies.css';

const Movies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const {baseUrl, api_key, language} = api;
    const url = `${baseUrl}/movie/now_playing?api_key=${api_key}&language=${language}&page=1`;
    const fetchData = async () => {
      const response = await fetch(url);
      return await response.json();
    };
    fetchData().then((e) => setData(e))
  }, []);

  return (
    <>
      <h1>Now playing movies</h1>

      {data.results && data.results.length > 0 &&
      <ul className='movies-list'>
        {data.results.map(item => (
          <React.Fragment key={item.id}>
            <li>
              <Link to={`/movies/${item.id}`}>
                <img className='movie-image' src={api.imageBaseUrl + item.poster_path}  alt='poster'/>
                <span className='movie-title'>Title: {item.title}</span>
                <span className='movie-overview'>Overview: {item.overview}</span>
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>}
    </>
  )
};

export default Movies;
