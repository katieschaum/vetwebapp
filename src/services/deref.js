import get from '../services/get';


const createDosageString = (dosage) => {

  // making id string
  const id = dosage.dosage_id;

  //making drug name string
  const drugName = `${dosage.drug.name}`;
 
  // making method string
  let method = '';
  for (const item of dosage.methods) {
    method += item.name + ":\n"
  }

  // making concentration string  
  let concentration = '';
  for (const pair of dosage.concentrations) {
    concentration += `(${pair.value} ${pair.unit.name}):\n`
  }

  // making dose string
  const dose = `${dosage.dose_low} - ${dosage.dose_high} ${dosage.dose_unit.name}`;

  // making note string
  const notes = dosage.notes;

  return {
    'id': id,
    'drugName': drugName,
    'method': method,
    'concentration': concentration,
    'dose': dose,
    'notes': notes,
  };
}

const stringifyDosages = (dosages) => {
    let stringified = [];
    for (const dosage of dosages) {
      const data = createDosageString(dosage);
      stringified.push(data);
    }
    return stringified;
  }

const combineDerefAndStringified = (deref, stringified) => {
  let combined = [];
  for (const derefDosage of deref) {
    const stringifiedDosage = stringified.find(x => x.id === derefDosage.dosage_id);
    const newDosage = {...derefDosage, stringified: stringifiedDosage};
    combined.push(newDosage);
  }

  return combined;
}


const processDosages = async (uri) => {
  const derefDosages = await get(`${uri}`);
  const stringified = stringifyDosages(derefDosages);
  const combined = combineDerefAndStringified(derefDosages, stringified);

  return combined
}

export default processDosages;


