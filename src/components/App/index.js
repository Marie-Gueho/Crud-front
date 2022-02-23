import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

import Card from '../Card';
import Input from '../Input';
import Button from '../Button';

function App() {
  const form = useRef(null);
  const [members, setMembers] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMembers();
  })

  const getMembers = () => {
    axios.get('http://localhost:3003/')
      .then(res => {
        setMembers(res.data);
      })
      .catch(err => console.log("erreur:", err.message))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(form.current.name.value, form.current.email.value)
    axios.post('http://localhost:3003/member',
      {
        name: form.current.name.value,
        email: form.current.email.value,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        console.log(res.data);
        form.current.name.value = "";
        form.current.email.value = "";
      })
      .catch(err => console.log("erreur:", err.message))
  }
  return (
    <div className="App">
      <h1>Nos membres</h1>
      <h2>Ajoutez un nouveau membre</h2>
      <form className="main-form" ref={form} onSubmit={handleFormSubmit}>
        <Input className="input" name="name" type="text" placeholder="Nom" />
        <Input className="input" name="email" type="email" placeholder="Email" />
        <Button className="button main-button" type="submit" content="Valider" />
      </form>
      <label htmlFor="recherche">Rechercher</label>
      <Input name="recherche" type="text" onChangeField={(e) => setSearch(e.target.value)} />
      <div className="cards-container">
        {members &&
          members
            .filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
            .map(member =>
              <Card key={member.id} data={member} />
            )}
      </div>
    </div>
  );
}

export default App;
