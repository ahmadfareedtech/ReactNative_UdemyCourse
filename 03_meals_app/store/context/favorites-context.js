 import { createContext, useContext, useState } from "react";

 export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {}
 })

 function FavoritesContextProvider({children}) {

    const [favoriteMealIds, setFavoriteMealIds] = useState([])

    const addFavorite = (id) => {
        setFavoriteMealIds(current => [...current, id])
    }

    const removeFavorite = (id) => {
        setFavoriteMealIds(current => 
            current.filter(mealId => mealId !== id)
        )
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
 }

 export default FavoritesContextProvider

 export const useFavorite = () => useContext(FavoritesContext)