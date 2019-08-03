import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import './Movie.css';

const Movie = ({match}) => {
  const [data, setData] = useState([]);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    const {baseUrl, api_key, language} = api;
    const getUrl = (id) => `${baseUrl}/movie/${id}?api_key=${api_key}&language=${language}`;
    const fetchData = async () => {
      const response = await fetch(getUrl(match.params.id));
      return await response.json();
    };
    fetchData().then((e) => {
      setData(e);
      setBackgroundUrl(api.imageBaseUrl + e.backdrop_path);
    })
  }, [match]);

  return (
    <>
      {data &&
      <>
        <div className='movie-background' style={{backgroundImage: `url(${backgroundUrl})`}}></div>
        <Link to="/">back to list of movies</Link>
        <h1>Movie: {data.title}</h1>
        <p>
          <img className='movie-poster' src={api.imageBaseUrl + data.poster_path} alt='poster'/>
        </p>
        <div>
          {data.genres && data.genres.length &&
          <ul>{data.genres.map(genre => (<li className='genre' key={genre.id}>{genre.name}</li>))}</ul>
          }
        </div>
        <p className='movie-description'>{data.overview}</p>
      </>
      }
    </>
  )
};

export default Movie;
