import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult, Favourites } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleRemoveFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((item) => item.id !== id));
  };

  const isAddFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleRemoveFavourite}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetails
          characters={characters}
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddFavourite={isAddFavourite}
        />
      </div>
    </div>
  );
}

export default App;
