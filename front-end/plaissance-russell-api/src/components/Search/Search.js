import React from "react";
import search from "./Search.css";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <BiSearch size={20} className="ico" />
      <input
        type="text"
        placeholder="Rechercher un catway"
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
};

export default Search;