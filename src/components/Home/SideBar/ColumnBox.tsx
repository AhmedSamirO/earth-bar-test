import React from 'react'
import { Button, Grid, Modal, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { emptyRow, LinkColumnType, LinkComponentType } from './LinkComponent'
import RowBoxComponent from './ColumnRowBox'

const useStyles = makeStyles({
  subContainer: {
    border: 'solid 2px black',
    borderRadius: 3,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  deleteConfirmButton: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '1px solid #000',
    boxShadow: '0px 0px 20px #333',
    top: '35%',
    left: '35%',
    backgroundColor: '#fff',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
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

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function getModalStyle() {
    return {
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    }
  }

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

  const changeColumnRowsNumber = (
    column: LinkColumnType,
    newRowsNumber: number
  ) => {
    /*
      1- if the number is more than the current one add new row
      2- if less remove row and its links 
    */
    let newColumn = {
      ...column,
      rowsNumber: newRowsNumber,
    }

    if (newRowsNumber > column.rowsNumber) {
      for (let index = 0; index < newRowsNumber - column.rowsNumber; index++) {
        newColumn.rows.push(emptyRow)
      }
    } else if (newRowsNumber < column.rowsNumber) {
      for (let index = 0; index < column.rowsNumber - newRowsNumber; index++) {
        const removedRow = newColumn.rows.pop()
        if (removedRow) {
          removeRowLinks(links, removedRow.linkIndex)
        }
      }
    }
    updateColumnValues(link, newColumn)
  }

  const removeRowLinks = (
    links: Array<LinkComponentType>,
    linkIndex: number
  ) => {
    if (linkIndex !== -1) {
      const removedLinksIndex = [linkIndex]
      removeLink(links, linkIndex, removedLinksIndex)

      const newLinks = links.filter(
        newLink => !removedLinksIndex.includes(newLink.linkIndex)
      )

      setLinks(newLinks)
    }
  }

  const removeLink = (
    links: Array<LinkComponentType>,
    linkIndex: number,
    removedLinksIndexes: number[]
  ) => {
    const removedLink = links.filter(
      newLink => newLink.linkIndex === linkIndex
    )[0]

    let newLinks = [...links]

    removedLink.columns.forEach(removedLinkColumn => {
      removedLinkColumn.rows.forEach(removedColumnRow => {
        if (removedColumnRow.linkIndex !== -1) {
          removedLinksIndexes.push(removedColumnRow.linkIndex)
          removeLink(newLinks, removedColumnRow.linkIndex, removedLinksIndexes)
        }
      })
    })
  }

  const removeColumn = (
    links: Array<LinkComponentType>,
    link: LinkComponentType,
    column: LinkColumnType
  ) => {
    const newLink = { ...link }
    const newColumn = { ...column }
    const firstColumn = column.groupedColumns[0]
    const deletedGroupedColumnsNumber = column.groupedColumns.length

    newLink.columns = newLink.columns.filter(
      linkColumn => linkColumn.groupedColumns[0] !== firstColumn
    )

    newLink.columns = newLink.columns.map(linkColumn => {
      if (linkColumn.groupedColumns[0] > firstColumn) {
        linkColumn.groupedColumns = linkColumn.groupedColumns.map(
          groupedColumn => groupedColumn - deletedGroupedColumnsNumber
        )
      }
      return linkColumn
    })

    console.log('ttttt', newLink.columns)

    column.rows.map(row => {
      removeRowLinks(links, row.linkIndex)
    })

    setLink(newLink)
    handleClose()
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
            <TextField
              fullWidth
              type='number'
              value={column.rowsNumber}
              InputProps={{ inputProps: { min: 0, max: 3 } }}
              onChange={event => {
                changeColumnRowsNumber(column, Number(event.target.value))
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant='subtitle1'>Repeat Count</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type='number'
              value={column.repeatCount}
              InputProps={{ inputProps: { min: 1, max: 20 } }}
              fullWidth
              onChange={event => {
                onChangeRepeatCount(link, column, Number(event.target.value))
              }}
            />
          </Grid>

          {column.rows.map((row, index) => (
            <RowBoxComponent
              key={index}
              row={row}
              link={link}
              setLink={setLink}
              links={links}
              setLinks={setLinks}
              columnFirstIndex={column.groupedColumns[0]}
              rowIndex={index}
              removeLink={removeLink}
            />
          ))}

          <Grid item xs={12}>
            <Button
              className={classes.deleteButton}
              variant='contained'
              onClick={() => {
                // removeColumn(links, link, column)
                handleOpen()
              }}
              fullWidth
            >
              Delete Column
            </Button>
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Grid
              container
              justify='space-between'
              className={classes.paper}
              spacing={2}
            >
              <Grid item xs={12}>
                <p>
                  this will delete links attached to this column. do you wish to
                  proceed?
                </p>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.deleteConfirmButton}
                  variant='contained'
                  onClick={() => {
                    removeColumn(links, link, column)
                  }}
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    handleClose()
                  }}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  )
}
