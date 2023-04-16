import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import get from '../services/get';
import api from '../services/api';
const animalUri = "https://vaddb.liamgombart.com/animals";
// const animalUri = `${process.env.REACT_APP_TLD}/animals`

// Creates the dropdown component on the homepage for the user to select which animal to view.

export default class DropdownAnimalSearchQuery extends Component {
  state = { 
    searchQuery: '',
    selectOptions: [],
  }


  componentDidMount() {
    this.setOptions();
  }

  setOptions = async () => {
    try {
      const response = await get(animalUri);
      const options = this.mapOptions(response);

      this.setState({
        ...this.state,
        selectOptions: options,
      })

    } catch (e) {
      this.setState({
        ...this.state,
        selectOptions: [],
      })
    
    }
  }

  mapOptions = (animals) => {
    const options = animals.map(animal => ({
        key: animal.id,
        text: animal.name,
        value: animal.name,
    }));

    return options
  }

  handleChange = (e, { searchQuery, value }) =>{
    const encodedValue = encodeURIComponent(value);
    

    api.get('animals')
            .then(response => {
              
              const selectedOptionKey =0;
            const animals = Object.values(response.data);
            animals.forEach(element => {
           console.log(value);
              if (element.name===value){
                    alert("the element is:"+ element.animal_id);
                    localStorage.setItem("animalId", element.animal_id);
              }
            });
            // selectedOptionKey = animals.find((option) => option.animal_id === value);
       //alert(selectedOptionKey);
      //console.log(animals)
    })
    .catch(error => {
              // console.error("Error: cannot receive drug data from DB")
               console.error(error)
            })
            
      //  console.log(this.state.selectOptions.find(o => o.value ==value)?.key);
alert(encodedValue)
    window.location.href = `/drugs/${encodedValue}`;
    https://vaddb.liamgombart.com/dosages?animal_id=undefined
    

    this.setState({ ...this.state, searchQuery: value });
  }   

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const { searchQuery, value } = this.state

    return (
      <Dropdown
        fluid
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={this.state.selectOptions}
        placeholder='Animal'
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    )
  }
}