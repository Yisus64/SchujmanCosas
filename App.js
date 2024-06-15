import React, { useState } from 'react';
import './App.css';

const initialNames = ["Jesus", "Camilo", "Jenaro", "Martina"];
const initialSurnames = ["Pedalino", "Sodo", "Moretti", "Suarez"];
const initialMails = ["Jesus@gmail.com", "URSSZ@hotmail.com", "Jenaro@outlook.com", "Martina@yahoo.com"];
const initialPhones = ["5491234567", "5499876543", "5492345671", "5491345672"];
const initialType = "normal"
const initialPage = 1

function getPageNames(names, page, searchTerm, searchType) {
  var filteredNames = '';
  var start = 0;
  if (searchTerm === '') {
    start = (page - 1) * 7;
    return names.slice(start, start + 7);
  }
  switch (searchType) { 
   case "normal":
      filteredNames = names.filter(name =>
        name.toLowerCase() === searchTerm.toLowerCase()
      );
      start = (page - 1) * 7;
      return filteredNames.slice(start, start + 7);
    case "startWith":
      filteredNames = names.filter(name =>
        name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      start = (page - 1) * 7;
      return filteredNames.slice(start, start + 7);
    case "endWith":
      filteredNames = names.filter(name =>
        name.toLowerCase().endsWith(searchTerm.toLowerCase())
      );
      start = (page - 1) * 7;
      return filteredNames.slice(start, start + 7);
    case "contains":     
      filteredNames = names.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      start = (page - 1) * 7;
      return filteredNames.slice(start, start + 7);
  }
}

function addColumn(setShowAddBox) {
  setShowAddBox(true);
}
function goToPreviousPage(page, setPage) {
  if (page > 1) {
    setPage(page - 1);
  }
}

function goToNextPage(page, names, setPage) {
  if (page < Math.ceil(names.length / 7)) {
    setPage(page + 1);
  }
}

function handleAddBox(names, newName, setNames, setNewName, page, setPage, setShowAddBox) {
  if (names.length / page === 7) {
    setPage(page + 1);
  }
  if (newName.trim() !== '') {
    setNames([...names, newName.trim()]);
    setNewName('');
    setShowAddBox(false);
  }
}

function App() {
  const [names, setNames] = useState(initialNames);
  const [surnames, setSurnames] = useState([]);
  const [mails, setMails] = useState([]);
  const [phones, setPhones] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(initialType);
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAddBox, setShowAddBox] = useState(false);

  return (
    <div className="body" >
      {showAddBox && (
              <div className="add-box">
                <label for = "nombre" >Nombre:</label>
                <input
                  id = "nombre"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                Apellido:
                <input
                  type="text"
                  value={newSurname}
                  onChange={(e) => setNewSurname(e.target.value)}
                />
                email:
                <input
                  type="text"
                  value={newMail}
                  onChange={(e) => setNewMail(e.target.value)}
                />
                Numero:
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <button className = "add-button" onClick={() => handleAddBox(names, newName, setNames, setNewName, page, setPage, setShowAddBox)}>+</button>
              </div>
            )}
      <div className='search-box'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}>
          </input>
        </div>
          <form className="vertical-form">
            <label>
              <input type="radio" id="option1" name="options" value="startWith" onChange={(e) => setSearchType(e.target.value)}/>
               Empezando con 
            </label>
            <label>
              <input type="radio" id="option2" name="options" value="endWith" onChange={(e) => setSearchType(e.target.value)}/>
               Termina con
            </label>
            <label>
              <input type="radio" id="option3" name="options" value="contains" onChange={(e) => setSearchType(e.target.value)}/>
               Contiene
            </label>
        </form>
      </div>
      
        <div className="botones">
            <button className="small-button" onClick={() => addColumn(setShowAddBox)}> + </button>
            <button className="small-button" onClick={() => goToPreviousPage(page, setPage)} disabled={page === 1}>←</button>
            <button className="small-button" onClick={() => goToNextPage(page, names, setPage)} disabled={page === Math.ceil(names.length / 7)}>→</button>
            <span className="page-indicator">Página {page}</span>
          </div>
        <div className="lista">
          {getPageNames(names, page, searchTerm, searchType ).map((name, index) => (
            <button className="cajita" key={index}>{name}</button>
          ))}
        </div>
      </div>
  );
}

export default App;