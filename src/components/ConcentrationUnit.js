import React, {Component, useState} from 'react'
import { _ } from 'lodash';
import { Dropdown, Form, Input } from 'semantic-ui-react'

function ConcentrationUnit(){
  const [unitOptions, setUnits] = useState('mg/kg')
// const concentrationUnit = _.map(unitOptions, (unit, index) => ({
//   key: concentrationUnit[index],
//   text: unit,
//   value: concentrationUnit[index],
// }))

   const handleChange = (e) =>{
      setUnits(e.target.value)
    
  // }   

  // handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

    return(
      <form>
        <select value={unitOptions} onChange={handleChange}>
          <option value="mg/kg">mg/kg</option>
          <option value='µg/kg'>µg/kg</option>
        </select>
        </form>
        )
  }
}
export default ConcentrationUnit;
//     const { searchQuery, value } = this.state

//     return (
      
//       <Dropdown
//         fluid
//         placeholder='mg/kg'
//         name="concentrationUnit"
//         onChange={this.handleChange}
//         onSearchChange={this.handleSearchChange}
//         options={concentrationUnit}
//         search
//         searchQuery={searchQuery}
//         selection
//         value={ value }
//         concentrationUnit = {value}
//       />
//     )
//   }
// }


// const unitOptions = [
//   { key: 'mg/kg', text: 'mg/kg', value: 'mg/kg' },
//   { key: 'µg/kg', text: 'µg/kg', value: 'µg/kg' },
//   { key: 'ml/kg', text: 'ml/kg', value: 'ml/kg' },
// ]


// const ConcentrationUnit = (props) => (
//   <Input
//     label={<Dropdown defaultValue='mg/kg' options={unitOptions} value={props.value} onChange={e => props.onChange({concentration:e.target.value})} />}
//     labelPosition='right'
//     placeholder='Dosage'
//     onChange={(e) => {props.onChange({ dosage: e.target.value });console.log(e.target.value)}}
//     value={props.dosage}
    
//   />
// )

// export default ConcentrationUnit


// import _ from 'lodash'
// import React, { Component } from 'react'
// import { Dropdown} from 'semantic-ui-react'


// const unitOptions = [
//           { key: 'mg/kg', text: 'mg/kg', value: 'mg/kg' },
//           { key: 'µg/kg', text: 'µg/kg', value: 'µg/kg' },
//           { key: 'ml/kg', text: 'ml/kg', value: 'ml/kg' },
//         ]

// const ConcentrationUnit = (props) => (
//   <Dropdown
//     placeholder='mg/kg'
//     fluid
//     search
//     selection
//     options={props.unitOptions}
//     value={props.selectedValues}
//     onChange={(e, data) => {props.setCurrentSelectedValues(e,data)}}
// />
// )

// const mapSTP = (state) => {
//   return{
//     options: state.unitOptions,
//     selectedValues: state.selectedValues
//   }
// }
// export default connect(mapSTP) (ConcentrationUnit)

//   state={
//     data:{
//       units: ''
//     }
//   }
//   handleChange = (e, { value }) => this.setState({ value })

//   onChange = e =>
//     this.setState({
//       data: {...this.state.data, [e.target.unit]: e.target.value }
//     },()=>{
//       console.log(this.state.data);
//     }
//   )
//   render(){
//     const {value}=this.state;
//     const unitOptions = [
//         { key: 'mg/kg', text: 'mg/kg', value: 'mg/kg' },
//         { key: 'µg/kg', text: 'µg/kg', value: 'µg/kg' },
//         { key: 'ml/kg', text: 'ml/kg', value: 'ml/kg' },
//       ]
//   return(
//     <div>
//       <Dropdown
//       placeholder="mg/kg"
//       name="concentraionUnit"
//       onChange={this.handleChange}
//       selection
//       options={unitOptions}
//       value={value}
//       /> 
//     </div>
//   )
//   }
// }
// export default ConcentrationUnit;

// const unitOptions = ["", 'mg/kg', 'µg/kg', 'ml/kg' ];
// const concentrationUnit = _.map(unitOptions, (unit, index) => ({
//   key: concentrationUnit[index],
//   text: unit,
//   value: concentrationUnit[index],
// }))

// export default class ConcentrationUnit extends Component {
//   state = { searchQuery: '' }

//   handleChange = (e, { searchQuery, value }) =>{
//     this.setState({ searchQuery, value })
//   }   

//   handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

//   render() {
//     const { searchQuery, value } = this.state

//     return (
      
//       <Dropdown
//         fluid
//         placeholder='mg/kg'
//         name="concentrationUnit"
//         onChange={this.handleChange}
//         onSearchChange={this.handleSearchChange}
//         options={concentrationUnit}
//         search
//         searchQuery={searchQuery}
//         selection
//         value={ value }
//       />
//     )
//   }
// }

