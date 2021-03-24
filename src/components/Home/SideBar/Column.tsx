import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { LinkColumnType, LinkComponentType } from './LinkComponent'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

declare type ColumnComponentProps = {
  column: LinkColumnType
  link: LinkComponentType
  index: number
  setLink: React.Dispatch<React.SetStateAction<LinkComponentType>>
  thirdColumnIndex: number
  setThirdColumnIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function ColumnComponent(props: ColumnComponentProps) {
  const {
    column,
    link,
    index,
    setLink,
    thirdColumnIndex,
    setThirdColumnIndex,
  } = props

  const setColumnAsThirdIndex = () => {
    const newLink = { ...link }

    if (thirdColumnIndex > -1) {
      let oldThirdItemValue = newLink.columns[thirdColumnIndex].value
      newLink.columns = newLink.columns.map((currentColumn, columnIndex) => {
        if (
          columnIndex > thirdColumnIndex &&
          columnIndex <= thirdColumnIndex + Number(newLink.repeatCount) - 1
        ) {
          oldThirdItemValue = oldThirdItemValue - currentColumn.value
          return {
            ...currentColumn,
            isVisible: true,
          }
        }
        return currentColumn
      })
      newLink.columns[thirdColumnIndex].value = oldThirdItemValue
    }

    let newThirdItemValue = newLink.columns[index].value
    newLink.columns = newLink.columns.map((currentColumn, columnIndex) => {
      if (
        columnIndex > index &&
        columnIndex <= index + Number(newLink.repeatCount) - 1
      ) {
        newThirdItemValue = newThirdItemValue + currentColumn.value
        return {
          ...currentColumn,
          isVisible: false,
        }
      }
      return currentColumn
    })
    newLink.columns[index].value = newThirdItemValue

    setLink(newLink)
    setThirdColumnIndex(index)
  }
  return (
    <Grid item xs={12}>
      <Grid container justify='space-between'>
        <Grid item xs={7}>
          <Typography variant='subtitle1'>
            Column {index + 1}
            {thirdColumnIndex === index &&
              Number(link.repeatCount) > 1 &&
              `-${index + Number(link.repeatCount)}`}
            {thirdColumnIndex !== index && (
              <IconButton
                aria-label='ArrowForwardIosIcon'
                size='small'
                color='inherit'
                onClick={() => {
                  setColumnAsThirdIndex()
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type='number'
            value={column.value}
            onChange={event => {
              const newColumns = [...link.columns]
              newColumns[index].value = Number(event.target.value)

              setLink({
                ...link,
                columns: newColumns,
              })
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
