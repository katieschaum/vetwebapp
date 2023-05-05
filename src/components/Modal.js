import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Modal, Dropdown } from 'semantic-ui-react'
import api from "../services/api";
import axios from 'axios';


// Creates the popup element to edit a particular dosage
function EditDosageModal({ dosage, editDosage }) {
  const [open, setOpen] = React.useState(false)
  const [dosageValues, setDosageValues] = useState(dosage)
  const [newValues, setNewValues] = useState([]);
  const [units, setUnits] = useState([]);
  const [methods, setMethods] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [concentrations, setConcentrations] = useState([]);

  // Variables for currently selected options
  const [selectedDrugId, setSelectedDrugId] = useState(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [selectedDoseId, setSelectedDoseId] = useState(null);
  const [selectedConcentrationId, setSelectedConcentrationId] = useState(null);

  // Retrieve the units from api
  useEffect(() => {
    axios.get('https://vaddb.liamgombart.com/units')
      .then(response => {
        setUnits(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Retrieve the methods from api
  useEffect(() => {
    axios.get('https://vaddb.liamgombart.com/methods')
      .then(response => {
        setMethods(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Retrieve the drugs from api
  useEffect(() => {
    axios.get('https://vaddb.liamgombart.com/drugs')
      .then(response => {
        setDrugs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Retrieve the concentrations from api
  useEffect(() => {
    axios.get('https://vaddb.liamgombart.com/concentrations')
      .then(response => {
        setConcentrations(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function onSubmit() {
    api.put(`https://vaddb.liamgombart.com/dosages/${dosageValues.dosage_id}`, dosageValues);
    setOpen(false)
  }

  function handleDropdownChange(value) {
    this.dosageValues({
      doseUnit: value,
      concentrationUnit: value
    });
  };

  function updateValue(input) {
    let newData = Object.assign({}, dosageValues, input)

    setNewValues(newData)
  }

  console.log(newValues)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<i className="edit outline icon"
        style={{ color: "blue", marginTop: "7px" }}></i>}
    >
      <Modal.Header>Edit Drug Information</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form.Group width="equal">
            <Form.Field
              control={Dropdown}
              name="name"
              label="Drug Name:   "
              placeholder={dosageValues.drug.name}
              style={{ width: "700px" }}
              selection
              options={drugs.map(drug => ({ text: drug.name, value: drug.drug_id }))}
              onChange={(e, { value, text }) => {
                setSelectedDrugId(value);
                updateValue({ drug_id: e.target.value })
              }}
            />
            <br />
          </Form.Group>
          <Form.Group>
            <label><u>Methods</u></label>
            {methods.map(method => (
              <Form.Field 
              key={method.method_id}
              label={method.name}
              control='input'
              type='checkbox'
              checked={dosageValues.methods.some((value) => value.method_id === method.method_id)}
              onChange={(e) => {
                const checked = e.target.checked;
                const methodId = method.method_id;
                const methodName = method.name;

                if (checked) {
                  updateValue({
                    methods: [
                      ...dosageValues.methods,
                      {method_id: methodId, name: methodName}
                    ]
                  })
                }
                else {
                  updateValue({
                    methods: dosageValues.methods.filter(value => value.method_id !== methodId)
                  })
                }
              }}
            />
            ))}
          </Form.Group>
          <br />
          {/* <Form.Group> */}
            {/* <label><u>Add New Concentration</u></label>
            <Form.Field
            label='Amount'
            control={Input}
            type='number'
            />
            <Form.Field
            control={Dropdown}
            name="concentrationUnit"
            label="Concentration Unit"
            placeholder={dosageValues.dose_unit.name}
            selection
            options={units.map(unit => ({ text: unit.name, value: unit.unit_id }))}
            onChange={(e, { value, text }) => {
              setSelectedConcentrationId(value);
            }}
            />
            <Button>Add Concentration</Button>
            <br></br>
            <label><u>Concentrations</u></label>
            {dosageValues.concentrations.map(concentration => (
              <Form.Field
              key={concentration.concentration_id}
              label={concentration.value + ' ' + concentration.unit.name}
              control='input'
              type='checkbox'
              checked={dosageValues.concentrations.some((value) => value.concentration_id === concentration.concentration_id)}
              onChange={(e) => {
                const checked = e.target.checked;
                const concentrationId = concentration.concentration_id;
                const concentrationValue = concentration.value;
                const unitId = concentration.unit.unit_id;
                const unitName = concentration.unit.name;

                if (checked) {
                  updateValue({
                    concentrations: [
                      ...dosageValues.concentrations,
                      {concentration_id: concentrationId, value: concentrationValue}
                    ]
                  })
                }
                else {
                  updateValue({
                    concentrations: dosageValues.concentrations.filter(value => value.concentration_id !== concentrationId)
                  })
                }
              }}
              />
            ))}
          </Form.Group> */}
          <br />
          <Form.Group>
            <Form.Field
              control={Input}
              type='number'
              style={{ width: 100 }}
              name="doseLow"
              label="Dosage Range:   "
              placeholder="Dosage Low"
              defaultValue={dosageValues.dose_low}
              value={dosageValues.doseLow}
              onChange={(e) => updateValue({ dose_low: parseFloat(e.target.value) })}
            />
            <Form.Field>to</Form.Field>
            <Form.Field
              control={Input}
              type='number'
              style={{ width: 100 }}
              name="doseHigh"
              label="&nbsp;"
              placeholder="Dosage High"
              defaultValue={dosageValues.dose_high}
              value={dosageValues.doseHigh}
              onChange={(e) => updateValue({ dose_high: parseFloat(e.target.value) })} />

            <Form.Field
              control={Dropdown}
              name="doseUnit"
              label="Dosage Unit"
              placeholder={dosageValues.dose_unit.name}
              selection
              options={units.map(unit => ({ text: unit.name, value: unit.unit_id }))}
              onChange={(e, { value, text }) => {
                setSelectedDoseId(value);
                updateValue({ dose_unit: { unit_id: value, name: units.find(unit => unit.unit_id === value).name}});
              }}
            />
          </Form.Group>
          <br />
          <Form.Field
            control={Input}
            style={{ width: 700 }}
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