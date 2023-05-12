import React, {useState, useEffect, useContext} from 'react'
import { Dropdown } from 'semantic-ui-react'
import get from '../services/get';
import { AnimalContext } from  '../context/animal_context';
import { useNavigate } from 'react-router-dom';

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

  useEffect( () => {
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
    
  const handleChange = (e, {searchQuery, value}) => {
    setState({
      ...state,
      searchQuery: searchQuery,
      value: value,
    });
    context.currentAnimal = getAnimalByName(value);
    navigate(`/dosages/${value}`);
  };   

  const handleSearchChange = (e, { searchQuery }) => {
    setState({ 
      ...state,
      searchQuery: searchQuery 
    });
  };

  return (
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
  )
}

export default DropdownAnimalSearchQuery;
