import React, { useState, useEffect, useContext } from 'react'
import { Dropdown, List, Header, Icon, Button, Grid } from 'semantic-ui-react'
import get from '../services/get';
import api from "../services/api";
import { AnimalContext } from '../context/animal_context';
import { useNavigate } from 'react-router-dom';
import AddAnimal from './addAnimal';

// Creates the dropdown component on the homepage for the user to select which animal to view.
const animalUri = "https://vaddb.liamgombart.com/animals";

const DropdownAnimalSearchQuery = () => {
  const [state, setState] = useState({
    value: '',
    searchQuery: '',
    animals: [],
    options: [],
  });

  const navigate = useNavigate();
  const context = useContext(AnimalContext);

  useEffect(() => {
    setOptions();
  }, []);

  const setOptions = async () => {
    try {
      const animals = await get(animalUri);
      const options = mapOptions(animals);

      setState({
        ...state,
        animals: animals,
        options: options,
      })

    } catch (e) {
      setState({
        ...state,
        options: [],
      })

    }
  }

  const mapOptions = (animals) => {
    const options = animals.map(animal => ({
      key: animal.animal_id,
      text: animal.name,
      value: animal.name
    }
    ));

    return options;
  }


  const getAnimalByName = (name) => {
    const animal = state.animals.find(element => element.name === name) ?? {};
    return animal;
  }

  const editAnimal = async (animalId) => {
    window.location.href = `/animals/${animalId}`
  }

  const deleteAnimal = async (animalId) => {
    if (window.confirm(`Are you sure you want to delete ANIMAL and its DOSAGES?`) === true) {
      try {
        // First get animal dosages and delete them
        let response = await api.get(`dosages?animal_id=${animalId}`);
        for (let i = 0; i < response.data.length; i++) {
          await api.delete(`/dosages/${response.data[i].dosage_id}`);
        }
        await api.delete(`/animals/${animalId}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (e, { searchQuery, value }) => {
    setState({
      ...state,
      searchQuery: searchQuery,
      value: value,
    });
    context.currentAnimal = getAnimalByName(value);
    //window.location.href = `/dosages/${value}`
    navigate(`/dosages/${value}`);
  };

  const handleSearchChange = (e, { searchQuery }) => {
    setState({
      ...state,
      searchQuery: searchQuery
    });
  };

  return (
    <div>
      <Dropdown
        fluid
        onChange={handleChange}
        onSearchChange={handleSearchChange}
        options={state.options}
        placeholder='Animal'
        search
        searchQuery={state.searchQuery}
        selection
        value={state.value}
      />
      <AddAnimal></AddAnimal>
      <List className='animalList' divided relaxed>
        {state.animals.map(animal => (
          <List.Item className="animalListItem" key={animal.animal_id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Header size="small" style={{ flex: 1 }}>
                {animal.name}
              </Header>
              <Button onClick={() => editAnimal(animal.animal_id)} style={{ marginLeft: '10px' }} icon>
                <Icon name='pencil'></Icon>
              </Button>
              <Button onClick={() => deleteAnimal(animal.animal_id)} style={{ marginLeft: '10px' }} icon>
                <Icon name='delete'></Icon>
              </Button>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default DropdownAnimalSearchQuery;