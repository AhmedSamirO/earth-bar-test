import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { LinkColumnType, LinkComponentType } from './LinkComponent'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ColumnBoxComponent from './ColumnBox'

declare type ColumnComponentProps = {
  column: LinkColumnType
  link: LinkComponentType
  index: number
  setLink: React.Dispatch<React.SetStateAction<LinkComponentType>>
  thirdColumnFirstIndex: number
  setThirdColumnFirstIndex: React.Dispatch<React.SetStateAction<number>>
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
  linkIndex: number
}

export default function ColumnComponent(props: ColumnComponentProps) {
  const {
    column,
    link,
    index,
    setLink,
    thirdColumnFirstIndex,
    setThirdColumnFirstIndex,
    links,
    setLinks,
    linkIndex,
  } = props

  const viewThirdBox = (column: LinkColumnType) => {
    setThirdColumnFirstIndex(column.groupedColumns[0])
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Grid item xs={7}>
            <Typography variant='subtitle1'>
              Column {column.groupedColumns[0]}
              {column.groupedColumns.length > 1 &&
                `-${column.groupedColumns[column.groupedColumns.length - 1]}`}
              <IconButton
                aria-label='ArrowForwardIosIcon'
                size='small'
                color='inherit'
                onClick={() => {
                  viewThirdBox(column)
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type='number'
              value={column.value}
              InputProps={{ inputProps: { min: 0 } }}
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
      {thirdColumnFirstIndex === column.groupedColumns[0] && (
        <ColumnBoxComponent
          column={column}
          link={link}
          setLink={setLink}
          links={links}
          setLinks={setLinks}
        />
      )}
    </>
  )
}
