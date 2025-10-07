import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = menuItems.find(
      (item) => item.name.toLowerCase() === search.toLowerCase()
    );
    if (found) {
      navigate(found.path);
      setSearch("");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "«" : "»"}
      </button>

      {isOpen && (
        <>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
          </form>

          <ul className="menu-list">
            {filteredItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className="menu-btn"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
