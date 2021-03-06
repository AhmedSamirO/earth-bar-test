import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import ColumnComponent from './Column'

export declare type ColumnRowType = {
  fittingType: string
  terminationsSize: string
  terminationsSpacing: string
  linkIndex: number
  links: string
  linkType: string
}

export declare type LinkColumnType = {
  value: number
  groupedColumns: number[]
  rowsNumber: number
  rows: ColumnRowType[]
  repeatCount: number
}

export declare type LinkComponentType = {
  positionOfFeet: number
  holes: number
  columns: LinkColumnType[]
  linkIndex: number
}

declare type LinkComponentProps = {
  linkIndex: number
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
}

export const emptyRow: ColumnRowType = {
  fittingType: 'Insulator',
  terminationsSize: 'M10',
  terminationsSpacing: '50mm',
  linkIndex: -1,
  links: 'None',
  linkType: 'Swing',
}

export default function LinkComponent(props: LinkComponentProps) {
  const { linkIndex, links, setLinks } = props

  const [link, setLink] = useState<LinkComponentType>({
    positionOfFeet: 0,
    holes: 0,
    columns: [],
    linkIndex: -1,
  })

  const [firstTime, setFirstTime] = useState(true)

  const emptyColumn: LinkColumnType = {
    value: 0,
    groupedColumns: [],
    rowsNumber: 1,
    repeatCount: 1,
    rows: [{ ...emptyRow }],
  }

  const [thirdColumnFirstIndex, setThirdColumnFirstIndex] = useState(-1)

  const increaseHorizontalHolesNumber = (
    link: LinkComponentType,
    newHoles: number
  ) => {
    const newLink = {
      ...link,
      holes: newHoles,
    }

    const lastColumnGroupedColumns =
      newLink.columns[newLink.columns.length - 1]?.groupedColumns
    const lastIndex = lastColumnGroupedColumns?.length
      ? lastColumnGroupedColumns[lastColumnGroupedColumns.length - 1]
      : 0

    newLink.columns.push({
      ...emptyColumn,
      groupedColumns: [Number(lastIndex) + 1],
    })

    setThirdColumnFirstIndex(Number(lastIndex) + 1)

    setLink(newLink)
  }

  useEffect(() => {
    if (!firstTime) {
      const newLinks = [
        ...links.map(currentLink => {
          if (currentLink.linkIndex === linkIndex) {
            return { ...link }
          }
          return { ...currentLink }
        }),
      ]

      setLinks(newLinks.filter(link => link !== undefined))
    }
  }, [link])

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false)
      const newLink = {
        ...links.filter(link => link.linkIndex === linkIndex)[0],
      }
      setLink(newLink)
    }
  }, [links])

  return (
    <Grid container justify='space-between'>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Link {linkIndex + 1}</Typography>
      </Grid>

      <Grid item xs={7}>
        <Typography variant='subtitle1'>Position of Feet</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          type='number'
          value={link.positionOfFeet}
          onChange={event => {
            setLink({
              ...link,
              positionOfFeet: Number(event.target.value),
            })
          }}
        />
      </Grid>

      {link.columns.map((column, index) => (
        <ColumnComponent
          key={index}
          column={column}
          link={link}
          setLink={setLink}
          thirdColumnFirstIndex={thirdColumnFirstIndex}
          setThirdColumnFirstIndex={setThirdColumnFirstIndex}
          links={links}
          setLinks={setLinks}
        />
      ))}

      <Grid item xs={12}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            increaseHorizontalHolesNumber(link, link.holes + 1)
          }}
          fullWidth
        >
          Add Horizontal Hole
        </Button>
      </Grid>
    </Grid>
  )
}
