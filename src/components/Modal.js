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
  const [selectedUnitsId, setSelectedUnitsId] = useState(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [selectedDoseId, setSelectedDoseId] = useState(null);
  const [selectedConcentrationId, setSelectedConcentrationId] = useState(null);


  // Retrieve dosage
  useEffect(() => {
    api.get(`/dosages/${dosageValues.dosage_id}`)
      .then(response => {
        const dosage = response.data;
        const dosageOptions = {
          animal_id: dosage.animal_id,
          dosage_id: dosage.dosage_id,
          dose_high: dosage.dose_high,
          dose_low: dosage.dose_low,
          dose_unit_id: dosage.dose_unit_id,
          drug_id: dosage.drug_id,
          notes: dosage.notes,
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, []);

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

  // DEBUG FOR DELETING BAD DOSAGES
  // useEffect(() => {
  //   api.delete('https://vaddb.liamgombart.com/dosages/250')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // Function for updating dosage DB entry
  function updateDosage(dosage_id, formData) {
    //console.log(formData)
    return api.put(`/dosages/${dosage_id}`, formData);
  }

  // Function for handling form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (selectedDrugId !== null) {
      formData.append('drug_id', selectedDrugId);
    } else {
      formData.append('drug_id', dosageValues.drug.drug_id);
    }
    if (selectedUnitsId !== null) {
      formData.append('dose_unit_id', selectedUnitsId);
    } else {
      formData.append('dose_unit_id', dosageValues.dose_unit.unit_id);
    }
    formData.append('animal_id', dosageValues.animal.animal_id);
    formData.append('dosage_id', dosageValues.dosage_id);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    updateDosage(dosageValues.dosage_id, formData)
      .then(response => {
        console.log("Dosage updated successfully.", response.data);
        setOpen(false);
      })
      .catch(error => {
        console.error("Error: updating dosage data.", error);
      })
  }

  // const handleDropdownChange = (event, { value }) => {
  //   setSelectedDrugId(value);
  // };


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
          <Form onSubmit={handleSubmit}>
            <Form.Group width="equal">
              <Form.Dropdown
                label="Drug Name:   "
                placeholder={dosageValues.drug.name}
                search
                style={{ width: "700px" }}
                selection
                options={drugs.map(drug => ({ text: drug.name, value: drug.drug_id }))}
                name="drug_id"
                value={selectedDrugId}
                onChange={(e, { value }) => setSelectedDrugId(value)}
              />
              <br />
            </Form.Group>
            {/* <Form.Group>
              <label><u>Methods</u></label>
              {methods.map(method => (
                <Form.Input
                  key={method.method_id}
                  label={method.name}
                  control='input'
                  type='checkbox'
                  checked={dosageValues.methods.some((value) => value.method_id === method.method_id)}
                />
              ))}
            </Form.Group> */}
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
              <Form.Input
                control={Input}
                type='number'
                style={{ width: 100 }}
                name="dose_low"
                label="Dosage Range:   "
                placeholder="Dosage Low"
                defaultValue={dosageValues.dose_low}
                value={dosageValues.doseLow}
              />
              <Form.Field>to</Form.Field>
              <Form.Input
                control={Input}
                type='number'
                style={{ width: 100 }}
                name="dose_high"
                label="&nbsp;"
                placeholder="Dosage High"
                defaultValue={dosageValues.dose_high}
                value={dosageValues.doseHigh}
              />
              <Form.Dropdown
                search
                name="dose_unit_id"
                label="Dosage Unit"
                placeholder={dosageValues.dose_unit.name}
                selection
                options={units.map(unit => ({ text: unit.name, value: unit.unit_id }))}
                onChange={(e, { value }) => setSelectedUnitsId(value)}
                value={selectedUnitsId}
              />
            </Form.Group>
            <br />
            <Form.Input
              control={Input}
              style={{ width: 700 }}
              name="notes"
              label="Notes:   "
              placeholder="Notes"
              defaultValue={dosageValues.notes}
            />
            <Form.Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Form.Button>
            <Form.Button
              type='submit'
              content="Submit"
              labelPosition='right'
              icon='checkmark'
              positive
            />
          </Form>

        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default EditDosageModal