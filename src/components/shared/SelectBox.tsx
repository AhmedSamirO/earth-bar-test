import React from 'react'
import { FormControl, Select } from '@material-ui/core'

declare type SelectProps = {
  defaultValue?: string
  options: string[] | number[]
  onChange: Function
  value?: string | number
}

export default function SelectBox(props: SelectProps) {
  const { options, onChange, value } = props

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    onChange(event.target.value as string)
  }

  return (
    <div>
      <FormControl fullWidth>
        <Select native value={value} onChange={handleChange} fullWidth>
          {options.map((option: string | number) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
