import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import SelectBox from '../../shared/SelectBox'
import { makeStyles } from '@material-ui/core/styles'
import { LinkColumnType, LinkComponentType } from './LinkComponent'

const useStyles = makeStyles({
  subContainer: {
    border: 'solid 2px black',
    borderRadius: 3,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
})

declare type ColumnBoxComponentProps = {
  column: LinkColumnType
  link: LinkComponentType
  setLink: React.Dispatch<React.SetStateAction<LinkComponentType>>
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
}

export default function ColumnBoxComponent(props: ColumnBoxComponentProps) {
  const classes = useStyles()

  const { column, link, setLink, links, setLinks } = props

  const rowsNumberOptions = [1, 2, 3]

  const fittingTypeOptions = ['Link', 'Insulator', 'Termination']
  const terminationsSizeOptions = [
    'M4',
    'M6',
    'M8',
    'M10',
    'M12',
    'M16',
    'M18',
    'M20',
    'M22',
  ]

  const terminationsSpacingOptions = [
    '10mm',
    '20mm',
    '30mm',
    '40mm',
    '50mm',
    '60mm',
    '70mm',
    'Varying Spacings ',
  ]

  const updateColumnValues = (
    link: LinkComponentType,
    updatedColumn: LinkColumnType
  ) => {
    const columnFirstIndex = updatedColumn.groupedColumns[0]
    const newLink = { ...link }

    newLink.columns = newLink.columns.map(currentColumn => {
      if (currentColumn.groupedColumns[0] === columnFirstIndex) {
        return updatedColumn
      }
      return currentColumn
    })

    setLink(newLink)
  }

  const onChangeRepeatCount = (
    link: LinkComponentType,
    column: LinkColumnType,
    repeatCount: number
  ) => {
    const newLink = { ...link }
    const newColumn = { ...column, repeatCount }

    /*
      1- repeatCount is increased
      
        - add the new numbers to groupedColumns
      
        if the needed one not grouped
          - get the value for the new ones and add it to current value
          - remove the columns
        
        - else
          - remove the columns from the old group
          - get the value for the new ones and add it to current value
      
      2- repeatCount is decreased
        - remove the columns from the last of groupedColumns and set them as new columns
        - set them with the current grouped column values
    */

    if (repeatCount > column.repeatCount) {
      const newAddedCount = repeatCount - column.repeatCount
      const addedColumns: number[] = []

      const theNeededIndex =
        newColumn.groupedColumns[newColumn.groupedColumns.length - 1]

      for (let number = 1; number <= newAddedCount; number++) {
        addedColumns.push(theNeededIndex + number)
      }

      newLink.columns = newLink.columns
        .map((linkColumn, index) => {
          let newLinkColumn: LinkColumnType | null = { ...linkColumn }

          for (let addedColumn of addedColumns) {
            const addedColumnIndex = linkColumn.groupedColumns.indexOf(
              addedColumn
            )

            if (addedColumnIndex > -1) {
              newColumn.value += linkColumn.value
              if (linkColumn.groupedColumns.length === 1) {
                // remove the column
                newLinkColumn = null
                break
              } else {
                // remove the index from column.groupedColumns
                newLinkColumn.groupedColumns.splice(addedColumnIndex, 1)
              }
            }
          }
          return { ...newLinkColumn }
        })
        .filter(
          linkColumn => Object.keys(linkColumn).length !== 0
        ) as LinkColumnType[]

      newColumn.groupedColumns.splice(
        newColumn.groupedColumns.length,
        0,
        ...addedColumns
      )
    } else if (repeatCount < column.repeatCount) {
      const removedColumns = newColumn.groupedColumns.splice(repeatCount)

      removedColumns.forEach(columnIndex => {
        const newColumns = [...newLink.columns]
        newColumns.forEach((linkColumn, index) => {
          if (
            linkColumn.groupedColumns[linkColumn.groupedColumns.length - 1] ===
            columnIndex - 1
          ) {
            newLink.columns.splice(index + 1, 0, {
              ...newColumn,
              repeatCount: 1,
              groupedColumns: [columnIndex],
            })
          }
        })
      })
    }

    let newHolesCount = 0

    newLink.columns = newLink.columns.map(linkColumn => {
      newHolesCount += linkColumn.groupedColumns.length

      if (linkColumn.groupedColumns[0] === newColumn.groupedColumns[0]) {
        return { ...newColumn }
      }
      return { ...linkColumn }
    })

    newLink.holes = newHolesCount

    setLink({
      ...newLink,
    })
  }

  const removeColumnLinks = (
    links: Array<LinkComponentType>,
    linkIndex: number,
    newColumn: LinkColumnType
  ) => {
    if (linkIndex !== -1) {
      const removedLinksIndex = [linkIndex]
      removedLinksIndex.push(...removeLink(links, linkIndex))

      newColumn = { ...newColumn, linkIndex: -1 }
      updateColumnValues(link, newColumn)

      const newLinks = links.filter(
        newLink => !removedLinksIndex.includes(newLink.linkIndex)
      )

      console.log('1111', newLinks)
      setLinks(newLinks)
    }
  }

  const removeLink = (links: Array<LinkComponentType>, linkIndex: number) => {
    const removedLink = links.filter(
      newLink => newLink.linkIndex === linkIndex
    )[0]

    let newLinks = [...links]

    const removedLinksIndex: number[] = []

    removedLink.columns.forEach(removedLinkColumn => {
      if (removedLinkColumn.linkIndex !== -1) {
        removedLinksIndex.push(removedLinkColumn.linkIndex)
        removeLink(newLinks, removedLinkColumn.linkIndex)
      }
    })
    return removedLinksIndex
  }

  return (
    <Grid container justify='space-between'>
      <Grid item xs={2}></Grid>
      <Grid item xs={10} className={classes.subContainer}>
        <Grid container justify='space-between'>
          <Grid item xs={7}>
            <Typography variant='subtitle1'>Rows</Typography>
          </Grid>
          <Grid item xs={5}>
            {
              <SelectBox
                options={rowsNumberOptions}
                value={column.rowsNumber}
                onChange={(value: number) => {
                  const newColumn = { ...column, rowsNumber: Number(value) }
                  updateColumnValues(link, newColumn)
                }}
              />
            }
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Row 1</Typography>
          </Grid>

          <Grid item xs={7}>
            <Typography variant='subtitle1'>Fitting Type</Typography>
          </Grid>
          <Grid item xs={5}>
            {
              <SelectBox
                options={fittingTypeOptions}
                value={column.fittingType}
                onChange={(value: string) => {
                  let newColumn = { ...column, fittingType: value }

                  if (value === 'Link') {
                    const newLinks = [...links]
                    const newLinkIndex =
                      newLinks[newLinks.length - 1].linkIndex + 1
                    newLinks.push({
                      positionOfFeet: 0,
                      holes: 0,
                      columns: [],
                      linkIndex: newLinkIndex,
                    })
                    newColumn = {
                      ...newColumn,
                      linkIndex: newLinkIndex,
                    }
                    updateColumnValues(link, newColumn)

                    console.log('ssss', newLinks)
                    setLinks(newLinks)
                  } else {
                    removeColumnLinks(links, column.linkIndex, newColumn)
                  }
                }}
              />
            }
          </Grid>

          <Grid item xs={7}>
            <Typography variant='subtitle1'>Terminations Size</Typography>
          </Grid>
          <Grid item xs={5}>
            {
              <SelectBox
                options={terminationsSizeOptions}
                value={column.terminationsSize}
                onChange={(value: string) => {
                  const newColumn = { ...column, terminationsSize: value }
                  updateColumnValues(link, newColumn)
                }}
              />
            }
          </Grid>

          <Grid item xs={7}>
            <Typography variant='subtitle1'>Terminations Spacing</Typography>
          </Grid>
          <Grid item xs={5}>
            <SelectBox
              options={terminationsSpacingOptions}
              value={column.terminationsSpacing}
              onChange={(value: string) => {
                const newColumn = { ...column, terminationsSpacing: value }
                updateColumnValues(link, newColumn)
              }}
            />
          </Grid>

          <Grid item xs={7}>
            <Typography variant='subtitle1'>Repeat Count</Typography>
          </Grid>
          <Grid item xs={5}>
            <SelectBox
              options={[1, 2, 3]}
              value={column.repeatCount}
              onChange={(value: number) => {
                onChangeRepeatCount(link, column, Number(value))
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
