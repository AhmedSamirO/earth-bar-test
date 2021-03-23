import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Typography } from '@material-ui/core'
import SelectBox from '../../shared/SelectBox'

const useStyles = makeStyles({
  subContainer: {
    border: 'solid 2px black',
    borderRadius: 3,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
})

export declare type LinkComponentType = {
  positionOfFeet: number
  holes: number
  column3: number
  fittingType: string
  terminationsSize: string
  terminationsSpacing: string
  repeatCount: number
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
    column3: 0,
    fittingType: 'Insulator',
    terminationsSize: 'M10',
    terminationsSpacing: '50mm',
    repeatCount: 0,
  })

  const [firstTime, setFirstTime] = useState(true)

  const fittingTypeOptions = ['Link', 'Insulator']
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
        <Typography variant='subtitle1'>Holes</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          type='number'
          value={link.holes}
          onChange={event => {
            setLink({
              ...link,
              holes: Number(event.target.value),
            })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Column 1</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Column 2</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant='subtitle1'>Column 3</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          type='number'
          value={link.column3}
          onChange={event => {
            setLink({
              ...link,
              column3: Number(event.target.value),
            })
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} className={classes.subContainer}>
            <Grid container justify='space-between'>
              <Grid item xs={12}>
                <Typography variant='subtitle1'>Column 4-6</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle1'>Rows</Typography>
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
                          column3: 0,
                          fittingType: 'Insulator',
                          terminationsSize: 'M10',
                          terminationsSpacing: '50mm',
                          repeatCount: 0,
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
                {
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
                }
              </Grid>

              <Grid item xs={7}>
                <Typography variant='subtitle1'>Repeat Count</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  type='number'
                  value={link.repeatCount}
                  onChange={event => {
                    setLink({
                      ...link,
                      repeatCount: Number(event.target.value),
                    })
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='subtitle1'>Column 7</Typography>
      </Grid>
    </Grid>
  )
}
