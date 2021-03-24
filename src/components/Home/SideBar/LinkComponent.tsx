import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Typography } from '@material-ui/core'
import SelectBox from '../../shared/SelectBox'
import ColumnComponent from './Column'

const useStyles = makeStyles({
  subContainer: {
    border: 'solid 2px black',
    borderRadius: 3,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
})

export declare type LinkColumnType = {
  value: number
  isVisible: boolean
}

export declare type LinkComponentType = {
  positionOfFeet: number
  holes: number
  fittingType: string
  terminationsSize: string
  terminationsSpacing: string
  repeatCount: number
  rowsNumber: number
  columns: LinkColumnType[]
}

declare type LinkComponentProps = {
  index: number
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
}

export default function LinkComponent(props: LinkComponentProps) {
  const classes = useStyles()

  const { index, links, setLinks } = props

  const [link, setLink] = useState<LinkComponentType>({
    positionOfFeet: 0,
    holes: 0,
    fittingType: 'Insulator',
    terminationsSize: 'M10',
    terminationsSpacing: '50mm',
    repeatCount: 1,
    rowsNumber: 1,
    columns: [],
  })

  const [firstTime, setFirstTime] = useState(true)

  const emptyColumn: LinkColumnType = {
    value: 0,
    isVisible: true,
  }

  const [thirdColumnIndex, setThirdColumnIndex] = useState(-1)

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

  const rowsNumberOptions = [1, 2, 3]

  useEffect(() => {
    const newLinks = [...links]
    newLinks[index] = link

    setLinks(newLinks)
  }, [link])

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false)
      setLink(links[index])
    }
  }, [links])

  const onChangeRepeatCount = (link: LinkComponentType, value: number) => {
    const newLink = { ...link, repeatCount: value }

    if (thirdColumnIndex > -1) {
      let oldThirdItemValue = newLink.columns[thirdColumnIndex].value

      newLink.columns = newLink.columns.map((currentColumn, columnIndex) => {
        if (
          columnIndex > thirdColumnIndex &&
          columnIndex <= thirdColumnIndex + Number(link.repeatCount) - 1
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

      let newThirdItemValue = oldThirdItemValue
      newLink.columns = newLink.columns.map((currentColumn, columnIndex) => {
        if (
          columnIndex > thirdColumnIndex &&
          columnIndex <= thirdColumnIndex + Number(newLink.repeatCount) - 1
        ) {
          newThirdItemValue = newThirdItemValue + currentColumn.value
          return {
            ...currentColumn,
            isVisible: false,
          }
        }
        return currentColumn
      })
      newLink.columns[thirdColumnIndex].value = newThirdItemValue
    }

    setLink({
      ...newLink,
    })
  }

  return (
    <Grid container justify='space-between'>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Link {index + 1}</Typography>
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
      <Grid item xs={7}>
        <Typography variant='subtitle1'>Horizontal Holes</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          type='number'
          value={link.holes}
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          onChange={event => {
            const newHoles = Number(event.target.value)

            const newLink = {
              ...link,
              holes: newHoles,
            }

            if (newHoles > link.columns.length) {
              for (
                let index = 0;
                index < newHoles - link.columns.length;
                index++
              ) {
                newLink.columns.push(emptyColumn)
              }
            } else if (newHoles < link.columns.length) {
              for (
                let index = 0;
                index < link.columns.length - newHoles;
                index++
              ) {
                newLink.columns.pop()
              }
            }
            setLink(newLink)
          }}
        />
      </Grid>

      {link.columns.map(
        (column, index) =>
          index < 3 &&
          index !== thirdColumnIndex &&
          column.isVisible && (
            <ColumnComponent
              key={index}
              column={column}
              link={link}
              index={index}
              setLink={setLink}
              thirdColumnIndex={thirdColumnIndex}
              setThirdColumnIndex={setThirdColumnIndex}
            />
          )
      )}

      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} className={classes.subContainer}>
            <Grid container justify='space-between'>
              {thirdColumnIndex !== -1 &&
                link.columns.length > thirdColumnIndex && (
                  <ColumnComponent
                    column={link.columns[thirdColumnIndex]}
                    link={link}
                    index={thirdColumnIndex}
                    setLink={setLink}
                    thirdColumnIndex={thirdColumnIndex}
                    setThirdColumnIndex={setThirdColumnIndex}
                  />
                )}
              <Grid item xs={7}>
                <Typography variant='subtitle1'>Rows</Typography>
              </Grid>
              <Grid item xs={5}>
                {
                  <SelectBox
                    options={rowsNumberOptions}
                    value={link.rowsNumber}
                    onChange={(value: number) => {
                      setLink({
                        ...link,
                        rowsNumber: value,
                      })
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
                    value={link.fittingType}
                    onChange={(value: string) => {
                      setLink({
                        ...link,
                        fittingType: value,
                      })
                      if (value === 'Link') {
                        const newLinks = [...links]
                        newLinks.splice(index + 1, 0, {
                          positionOfFeet: 0,
                          holes: 0,
                          fittingType: 'Insulator',
                          terminationsSize: 'M10',
                          terminationsSpacing: '50mm',
                          repeatCount: 1,
                          rowsNumber: 1,
                          columns: [],
                        })
                        setLinks(newLinks)
                      } else {
                        setLinks(links.splice(0, index + 1))
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
                    value={link.terminationsSize}
                    onChange={(value: string) => {
                      setLink({
                        ...link,
                        terminationsSize: value,
                      })
                    }}
                  />
                }
              </Grid>

              <Grid item xs={7}>
                <Typography variant='subtitle1'>
                  Terminations Spacing
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <SelectBox
                  options={terminationsSpacingOptions}
                  value={link.terminationsSpacing}
                  onChange={(value: string) => {
                    setLink({
                      ...link,
                      terminationsSpacing: value,
                    })
                  }}
                />
              </Grid>

              <Grid item xs={7}>
                <Typography variant='subtitle1'>Repeat Count</Typography>
              </Grid>
              <Grid item xs={5}>
                <SelectBox
                  options={[1, 2, 3]}
                  value={link.repeatCount}
                  onChange={(value: number) => {
                    onChangeRepeatCount(link, Number(value))
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {link.columns.map(
        (column, index) =>
          index > 2 &&
          index !== thirdColumnIndex &&
          column.isVisible && (
            <ColumnComponent
              key={index}
              column={column}
              link={link}
              index={index}
              setLink={setLink}
              thirdColumnIndex={thirdColumnIndex}
              setThirdColumnIndex={setThirdColumnIndex}
            />
          )
      )}
    </Grid>
  )
}
