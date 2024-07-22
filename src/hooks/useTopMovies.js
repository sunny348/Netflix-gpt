
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constrants";
import { addPopularMovies, addTopMovies } from "../utils/moviesSlice";

import { useEffect } from "react";

const useTopMovies = () => {

    
  const dispatch = useDispatch();

  const getTopMovies = async () => {

    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1',API_OPTIONS)
    const json = await data.json();
    console.log(json.results);
    dispatch(addTopMovies(json.results));


  };

  useEffect(() => {

    getTopMovies();

  },[]);
};

export default useTopMovies;


