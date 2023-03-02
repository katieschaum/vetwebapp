import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'


const methodOptions = [
  { key: 'IM', text: 'IM', value: 'IM' },
  { key: 'IV', text: 'IV', value: 'IV' },
  { key: 'PO', text: 'PO', value: 'PO' },
]

const DosageMethod = (props) => (
    <Input
      label={<Dropdown defaultValue='IM' options={methodOptions} value={props.value} onChange={e => props.onChange({method:e.target.value})} />}
      labelPosition='right'
      placeholder='Method'
      onChange={(e) => {props.onChange({ method: e.target.value });console.log(e.target.value)}}
      value={props.method}
    
    />

)

export default DosageMethod