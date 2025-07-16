import { createContext, useState, useContext, useEffect } from "react";
const MovieContext = createContext({})
export const useMovieContext = () => useContext(MovieContext)
export interface MovieContextType {
    isFavorite: (id: number) => boolean;
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
}
export const MovieProvider = ({children}: {children:any}) => {
    const [favorites, setFavorites ] = useState([])

    useEffect(()=> {
const storedFavs = localStorage.getItem("favorites")
if(storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])
useEffect(()=> {
    localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])
const addToFavorites = (movie:any)=> {

    setFavorites(prev => [...prev, movie] as any)
}
const removeFromFavorites = (movieId:any)=> {

    setFavorites(prev => prev.filter((movie:any)=> movie.id!=movieId)as any)
}
const isFavorite = (movieId:any) => {
    return favorites.some((movie:any) => movie.id === movieId) 
}
const value = {
    favorites, addToFavorites,removeFromFavorites,isFavorite
}
return ( <MovieContext.Provider value={value}>{children}</MovieContext.Provider>)
}