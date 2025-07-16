import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import "../css/Home.css"

import { searchMovies, getPopularMovies } from "../services/api";
import { useLocation } from "react-router-dom";



function Home(){
   
const location = useLocation();
 const [searchQuery, setSearchQuery] = useState("")
 const [movies, setMovies] = useState([])
 const [error, setError]:[error:any,setError:any] = useState(null)
 const [loading, setLoading] = useState(true)
 useEffect(()=> {
    const loadPopularMovies = async ()=> {
        try {
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
            setError(null)
        } catch (error) {
            console.log(error)
            setError('Failed to load movies ...')
        }
        finally {
            setLoading(false)
        }
    }
    loadPopularMovies()
 },[])



const handleSearch = async (e:any) => {
  e.preventDefault()
if(!searchQuery.trim()) return 

setLoading(true)
try {
    const searchResults = await searchMovies(searchQuery)
    if(searchResults)setMovies(searchResults)
} catch (error) {
    console.log(error)
    setError("failed to search movies..")
}
finally {
    setLoading(false)
}
setSearchQuery("")}


    return <div className="home">
     <form action="" onSubmit={handleSearch} className='search-form'>
      <input type="text" placeholder='Search for movies..' className='search-input' value={searchQuery}
      onChange={(e)=> setSearchQuery(e.target.value)}/>
      <button type = "submit" className='search-button'> Search</button>
    </form>  
{loading ? (
  <div className="loading">Loading...</div>
) : error ? (
  <div className="error-message">{error}</div>
) : movies.length === 0 ? (
  <div className="no-results">No movies found.</div>
) : (
  <div className="movies-grid">
    {movies.map((movie: any) => (
      <MovieCard movie={movie} key={movie.id} />
    ))}
  </div>
)}

    </div>
    
}
export default Home