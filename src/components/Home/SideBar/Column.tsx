import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { LinkColumnType, LinkComponentType } from './LinkComponent'
import ColumnBoxComponent from './ColumnBox'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

declare type ColumnComponentProps = {
  column: LinkColumnType
  link: LinkComponentType
  setLink: React.Dispatch<React.SetStateAction<LinkComponentType>>
  thirdColumnFirstIndex: number
  setThirdColumnFirstIndex: React.Dispatch<React.SetStateAction<number>>
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
}

export default function ColumnComponent(props: ColumnComponentProps) {
  const {
    column,
    link,
    setLink,
    thirdColumnFirstIndex,
    setThirdColumnFirstIndex,
    links,
    setLinks,
  } = props

  const viewThirdBox = (column: LinkColumnType) => {
    setThirdColumnFirstIndex(column.groupedColumns[0])
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              Column {column.groupedColumns[0]}
              {column.groupedColumns.length > 1 &&
                `-${column.groupedColumns[column.groupedColumns.length - 1]}`}
              <IconButton
                size='small'
                color='inherit'
                onClick={() => {
                  viewThirdBox(column)
                }}
              >
                {thirdColumnFirstIndex === column.groupedColumns[0] ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Typography>
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
