import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"
function MovieCard({movie}:any) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext() as any
    const favorite = isFavorite(movie.id)
    function onLike(e:any) {
e.preventDefault()
if(favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
    }
    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={image} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active": ''}`} onClick={onLike}>
                    ♡
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}
export default MovieCard