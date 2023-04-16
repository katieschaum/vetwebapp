import get from '../services/get';

const drugUri = `${process.env.REACT_APP_TLD}/drugs`
const unitUri = `${process.env.REACT_APP_TLD}/units`
const methodUri = `${process.env.REACT_APP_TLD}/methods`
const concentrationUri = `${process.env.REACT_APP_TLD}/concentrations`
const deliveryUri = `${process.env.REACT_APP_TLD}/delivery`


const derefById = async (uri, id) => {
  const full_uri = `${uri}/${id}`;
  const response = await get(full_uri);
  return response;
}

const derefConcentrations = async (uri, id) => {
  const concentrations = [];

  const full_uri = `${uri}?dosage_id=${id}`
  const response = await get(full_uri);
  for (const concentration of response) {
    const full_unit_uri = `${unitUri}/${concentration.unit_id}`;
    const unit = await get(full_unit_uri);
    const new_concentration = {
      'value': concentration.value, 
      'name': unit.name
    };
    concentrations.push(new_concentration);
  }
  return concentrations;
}

const derefMethods = async (uri, id) => {
  const methods = [];
  const full_delivery_uri = `${deliveryUri}?dosage_id=${id}`
  const deliveries = await get(full_delivery_uri);

  for (const delivery of deliveries) {
    const full_method_uri = `${uri}/${delivery.method_id}`
    const method = await get(full_method_uri);
    methods.push({'name': method.name});
  }
  return methods;
}

const derefDosage = async (dosage) => {
  const data = {};
  const drug = await derefById(drugUri, dosage.drug_id);
  const doseUnit = await derefById(unitUri,dosage.dose_unit_id);
  const concentrations = await derefConcentrations(concentrationUri, dosage.dosage_id);
  const methods = await derefMethods(methodUri, dosage.dosage_id);

  data['drug'] = drug.name;
  data['doseUnit'] = doseUnit.name;
  data['concentrations'] = concentrations;
  data['methods'] = methods;

  return createDosageString(dosage, data);
} 

const createDosageString = (dosage, derefInfo) => {
  const id = dosage.dosage_id;
  const drugName = `${derefInfo.drug}`;
  
  let method = '';
  for (const item of derefInfo.methods) {
    method += item.name + ":"
  }
  
  let concentration = '';
  for (const pair of derefInfo.concentrations) {
    concentration += `(${pair.value} ${pair.name}):`
  }

  const dose = `${dosage.dose_low} - ${dosage.dose_high} ${derefInfo.doseUnit}`;

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


const derefDosages = async (dosages) => {
    let deref = [];
    for (const dosage of dosages) {
      const data = await derefDosage(dosage);
      deref.push(data);
    }
    return deref;
  }

const combineRawAndDeref = (raw, deref) => {
  let combined = [];
  for (const rawDosage of raw) {
    const derefDosage = deref.find(x => x.id === rawDosage.dosage_id);
    const newDosage = {...rawDosage, deref: derefDosage};
    combined.push(newDosage);
  }

  return combined;
}


const processDosages = async (uri) => {
  const rawDosages = await get(`${uri}`);
  const dereferenced = await derefDosages(rawDosages);
  const combined = combineRawAndDeref(rawDosages, dereferenced);

  return combined
}

export default processDosages;

