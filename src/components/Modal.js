import React from 'react'
import { Form, Button, Input, Modal, Dropdown } from 'semantic-ui-react'

// Creates the popup element to edit a particular drug
function EditDrugModal({drug, editDrug}) {
  const [open, setOpen] = React.useState(false)
  const [drugValues, setDrugValues] = React.useState(drug)

  function onSubmit(){
    if (drugValues.name === "") {
        alert("Drug field is mandatory!");
        return;
    }
    editDrug(drugValues)
    setOpen(false)
  }

  function updateValue(input){
    let newData = Object.assign({}, drugValues, input)
    
    setDrugValues(newData)
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
                    value={drugValues.name}
                    onChange={(e) => updateValue({ name: e.target.value })}
                    />
                    <br/>
                    <Form.Field
                        control={Input}
                        name="method"
                        label="Method:  "
                        placeholder="Method"
                        className="right aligned"
                        value={drugValues.method}
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
                        value={drugValues.concentration}
                        onChange={(e) => updateValue({ concentration: e.target.value })}
                    />
                    <br/>
                    <Form.Field
                        control={Input}
                        options={[
                                      { key: 'mg/kg', text: 'mg/kg', value: 'mg/kg' },
                                      { key: 'µg/kg', text: 'µg/kg', value: 'µg/kg' },
                                      { key: 'ml/kg', text: 'ml/kg', value: 'ml/kg' },
                                    ]}
                        name="concentrationUnit"
                        label="Concentration Unit:   "
                        placeholder="mg/kg"
                        value={drugValues.concentrationUnit}
                        onChange={(e) => updateValue({ concentrationUnit: e.target.value })}
                        
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
                        value={drugValues.doseLow}
                        onChange={(e) => updateValue({ doseLow: e.target.value })}
                    />
                    <Form.Field>to</Form.Field>
                    <Form.Field
                        control={Input} 
                        style={{width: 50}} 
                        name="doseHigh" 
                        label="&nbsp;"
                        placeholder="Dosage High"
                        value={drugValues.doseHigh}
                        onChange={(e) => updateValue({ doseHigh: e.target.value })}/>
                    
                    <Form.Field
                        control={Input} 
                        name="doseUnit" 
                        label="Dosage Unit:   "
                        placeholder="Dosage Unit"
                        value={drugValues.doseUnit}
                        onChange={(e) => updateValue({ doseUnit: e.target.value })}/>
                    </Form.Group>
                    <br/>
                    <Form.Field
                        control={Input}
                        style={{width: 700}}
                        name="notes"
                        label="Notes:   "
                        placeholder="Notes"
                        value={drugValues.notes}
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

export default EditDrugModal
