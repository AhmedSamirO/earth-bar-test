import React, { useEffect } from 'react'
import { FormControl, Select } from '@material-ui/core'

declare type SelectProps = {
  defaultValue?: string
  options: string[]
}

export default function SelectBox(props: SelectProps) {
  const { options, defaultValue } = props
  const [selectedValue, setSelectedValue] = React.useState<string>('')

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    console.log(event.target.value)

    setSelectedValue(event.target.value as string)
  }

  return (
    <div>
      <FormControl fullWidth>
        <Select native value={selectedValue} onChange={handleChange} fullWidth>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
