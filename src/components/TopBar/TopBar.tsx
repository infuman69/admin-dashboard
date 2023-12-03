import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import DeleteSelected from "../DeleteSelected/DeleteSelected";

const TopBar = () => {
    
  return (
    <div className="flex justify-between w-full">
      <SearchBar />
      <DeleteSelected />
    </div>
  );
};

export default TopBar;
