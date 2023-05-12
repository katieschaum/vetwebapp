import React, {useState} from 'react'
import { Form, Button, Input, Modal, Dropdown } from 'semantic-ui-react'
import api from "../services/api";
import axios from 'axios';


// Creates the popup element to edit a particular dosage
function EditDosageModal({dosage, editDosage}) {
  const [open, setOpen] = React.useState(false)
  const [dosageValues, setDosageValues] = useState(dosage)


  function onSubmit(){
    if (dosageValues.name === "") {
        alert("Drug field is mandatory!");
        return;
    }
    editDosage(dosageValues)
    setOpen(false)
  }

   function handleDropdownChange(value) {
        this.dosageValues({ doseUnit: value, 
                        concentrationUnit: value });
      };

  function updateValue(input){
    let newData = Object.assign({}, dosageValues, input)
    
    setDosageValues(newData)
  }
    
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<i className="edit outline icon"
      style={{color:"blue", marginTop:"7px"}}></i>}
    >
      <Modal.Header>Edit Drug Information</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <Form.Group width="equal">
                    <Form.Field
                    control={Input}
                    name="name"
                    label="Drug Name:   "
                    style= {{width: "700px"}}
                    placeholder="Drug Name"
                    value={dosageValues.name}
                    onChange={(e) => updateValue({ name: e.target.value })}
                    />
                    <br/>
                    <Form.Field
                        control={Input}
                        name="method"
                        label="Method:  "
                        placeholder="Method"
                        className="right aligned"
                        value={dosageValues.method}
                        onChange={(e) => updateValue({ method: e.target.value })}
                    />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                    <Form.Field
                        control={Input}
                        name="concentration"
                        label="Concentration:   "
                        style={{width: 125}}
                        placeholder="Concentration"
                        value={dosageValues.concentration}
                        onChange={(e) => updateValue({ concentration: e.target.value })}
                    />
                    <br/>
                    <Form.Field
                        control={Dropdown}
                        name="concentrationUnit"
                        label="Concentration Unit"
                        placeholder="mg/kg"
                        selection
                        options={dosageValues.unitOptions}
                        value={dosageValues.options}
                        onChange={(e) => handleDropdownChange({ concentrationUnit: e.target.value })}
                    />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                    <Form.Field
                        control={Input}
                        style={{width: 50}}
                        name="doseLow"
                        label="Dosage Range:   "
                        placeholder="Dosage Low"
                        value={dosageValues.doseLow}
                        onChange={(e) => updateValue({ doseLow: e.target.value })}
                    />
                    <Form.Field>to</Form.Field>
                    <Form.Field
                        control={Input} 
                        style={{width: 50}} 
                        name="doseHigh" 
                        label="&nbsp;"
                        placeholder="Dosage High"
                        value={dosageValues.doseHigh}
                        onChange={(e) => updateValue({ doseHigh: e.target.value })}/>
                    
                    <Form.Field
                        control={Dropdown} 
                        name="doseUnit" 
                        label="Dosage Unit"
                        placeholder="Dosage Unit"
                        selection
                        options={dosageValues.unitOptions}
                        value={dosageValues.doseUnit}
                        onChange={(e) => handleDropdownChange({ doseUnit: e.target.value })}
                      />
                    </Form.Group>
                    <br/>
                    <Form.Field
                        control={Input}
                        style={{width: 700}}
                        name="notes"
                        label="Notes:   "
                        placeholder="Notes"
                        value={dosageValues.notes}
                        onChange={(e) => updateValue({ notes: e.target.value })}
                    />
          
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => onSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditDosageModal
