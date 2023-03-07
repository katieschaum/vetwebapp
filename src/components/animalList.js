import _ from 'lodash'
import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

// Creates the dropdown component on the homepage for the user to select which animal to view.
const animals = ["", "Camelid", "Cat", "Cattle", "Dog", "Equine", "Goat/Sheep", "Swine" ];
const animalOptions = _.map(animals, (animal, index) => ({
  key: animals[index],
  text: animal,
  value: animals[index],
}))

export default class DropdownAnimalSearchQuery extends Component {
  state = { searchQuery: '' }

  handleChange = (e, { searchQuery, value }) =>{
    if (value === 'Goat/Sheep') {
      value = 'goat_sheep'
    }
    window.location.href = `/drugs/${value}`
    this.setState({ searchQuery, value })
  }   

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const { searchQuery, value } = this.state

    return (
      <Dropdown
        fluid
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={animalOptions}
        placeholder='Animal'
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    )
  }
}