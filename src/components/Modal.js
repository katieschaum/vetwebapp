import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Modal, Dropdown } from 'semantic-ui-react'
import api from "../services/api";
import axios from 'axios';




// Creates the popup element to edit a particular dosage
function EditDosageModal({ dosage, editDosage }) {
  const [open, setOpen] = React.useState(false)
  const [dosageValues, setDosageValues] = useState(dosage)
  const [units, setUnits] = useState([]);
  const [methods, setMethods] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [concentrations, setConcentrations] = useState([]);

  // Variables for currently selected options
  const [selectedDrugId, setSelectedDrugId] = useState(null);
  const [selectedUnitsId, setSelectedUnitsId] = useState(null);
  const [selectedMethods, setSelectedMethods] = useState(dosage.methods.map(method => method.method_id));
  const [selectedConcs, setSelectedConcs] = useState(dosage.concentrations);
  const [selectedConcUnit, setSelectedConcUnit] = useState(dosage.concentrations[0].unit.unit_id);
  const [newConcs, setNewConcs] = useState();


  const API_KEY = process.env.REACT_APP_API_KEY;

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

  // Function for updating dosage DB entry
  function updateDosage(dosage_id, formData) {
    // console.log(formData)
    // console.log(selectedConcs)
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
    // First delete any entries not in selectedMethods
    api.get(`/delivery?dosage_id=${dosageValues.dosage_id}`)
      .then((response) => {
        response.data.forEach((delivery) => {
          if (!selectedMethods.includes(delivery.method_id)) {
            api.delete(`/delivery`, {
              params: {
                dosage_id: dosageValues.dosage_id,
                method_id: delivery.method_id,
              }
            }).then((response) => {
              // check if the API call was successful
              if (response.status === 200) {
                console.log("Delivery method deleted successfully.");
              } else {
                console.log("Error deleting delivery method.");
              }
            }).catch((error) => {
              console.log(error);
            });
          }
        })
      }).catch((error) => {
        console.log(error);
      })
      // Now add entries from selectedMethods
      .then(() => {
        selectedMethods.forEach((method_id) => {
          api.post(`/delivery`, {
            dosage_id: dosageValues.dosage_id,
            method_id: method_id,
          })
            .then((response) => {
              // check if the response was successful
              if (response.status === 200) {
                console.log(`Delivery method ${method_id} successfully added.`);
              } else {
                console.error(`Error adding delivery method ${method_id}.`);
              }
            })
            .catch((error) => {
              console.error(`Error adding delivery method ${method_id}: ${error.message}`);
            });
        });
      })
      // Delete concentrations not in newConcs
      .then(() => {
        if (newConcs !== undefined) {
          api.get(`/concentrations?dosage_id=${dosageValues.dosage_id}`)
            .then((response) => {
              if (response.status !== 200) {
                throw new Error(`Error getting concentrations for dosage ID ${dosageValues.dosage_id}`);
              }
              response.data.forEach((concentration) => {
                api.delete(`/concentrations/${concentration.concentration_id}`)
                  .then((response) => {
                    if (response.status !== 200) {
                      throw new Error(`Error deleting concentration with ID ${concentration.concentration_id}`);
                    }
                    console.log(`Concentration with ID ${concentration.concentration_id} successfully deleted.`);
                  })
                  .catch((error) => {
                    console.error(`Error deleting concentration with ID ${concentration.concentration_id}: ${error.message}`);
                  });
              })
              newConcs.forEach((concentration) => {
                api.post(`/concentrations`, {
                  value: concentration,
                  unit_id: selectedConcUnit,
                  dosage_id: dosageValues.dosage_id,
                })
                  .then((response) => {
                    if (response.status !== 200) {
                      throw new Error(`Error adding concentration with value ${concentration}`);
                    }
                    console.log(`Concentration with value ${concentration} successfully added.`);
                  })
                  .catch((error) => {
                    console.error(`Error adding concentration with value ${concentration}: ${error.message}`);
                  });
              })
            })
            .catch((error) => {
              console.error(`Error getting concentrations for dosage ID ${dosageValues.dosage_id}: ${error.message}`);
            });
        }
        // If no new concentrations but there are new units
        else if (newConcs === undefined && selectedConcUnit !== undefined) {
          api.get(`/concentrations?dosage_id=${dosageValues.dosage_id}`)
            .then((response) => {
              if (response.status !== 200) {
                throw new Error(`Error getting concentrations for dosage ID ${dosageValues.dosage_id}`);
              }
              response.data.forEach((concentration) => {
                api.put(`/concentrations/${concentration.concentration_id}`, {
                  value: concentration.value,
                  unit_id: selectedConcUnit,
                  dosage_id: concentration.dosage_id,
                })
                  .then((response) => {
                    if (response.status !== 200) {
                      throw new Error(`Error updating concentration with ID ${concentration.concentration_id}`);
                    }
                    console.log(`Concentration with ID ${concentration.concentration_id} successfully updated.`);
                  })
                  .catch((error) => {
                    console.error(`Error updating concentration with ID ${concentration.concentration_id}: ${error.message}`);
                  });
              })
            })
            .catch((error) => {
              console.error(`Error getting concentrations for dosage ID ${dosageValues.dosage_id}: ${error.message}`);
            });
        }

      })
      .then(() => {
        console.log("Dosage updated successfully.");
        setOpen(false);
      })
      .catch(error => {
        console.error("Error: updating dosage data.", error);
      })
  }

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
            <Form.Group>
              <Form.Dropdown
                label="Methods:   "
                search
                style={{ width: "700px" }}
                selection
                options={methods.map(method => ({ text: method.name, value: method.method_id }))}
                name="method_id"
                multiple
                value={selectedMethods}
                onChange={(e, { value }) => setSelectedMethods(value)}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Dropdown
                control={Input}
                search
                type='text'
                name="conc_value"
                label="Concentration Values: "
                placeholder="(separate with commas)"
                defaultValue={selectedConcs.map(obj => obj.value).join(",")}
                onChange={(e) => {
                  const input = e.target.value;
                  const regex = /^[0-9.,]*$/;  // regular expression to match numbers, commas, and whitespace
                  if (regex.test(input)) {
                    const concs = input.replace(/[^0-9.,]/g, '').split(',').map(str => parseFloat(str));  // remove non-numeric characters and split into an array
                    setNewConcs(concs);
                  }
                }}
              />
              <Form.Dropdown
                label="Concentration Units:   "
                search
                style={{ width: 100 }}
                selection
                options={units.map(unit => ({ text: unit.name, value: unit.unit_id }))}
                name="conc_unit"
                defaultValue={dosage.concentrations[0].unit.unit_id}
                onChange={(e, { value }) => setSelectedConcUnit(value)}
                required
              />
            </Form.Group>
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