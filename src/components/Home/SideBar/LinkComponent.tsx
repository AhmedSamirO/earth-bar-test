import React from 'react'
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

export default function LinkComponent() {
  const classes = useStyles()
  const fittingTypeOptions = ['Terminations']
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

  return (
    <Grid container justify='space-between'>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Link 1</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant='subtitle1'>Position of Feet</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField type='number' defaultValue={0} />
      </Grid>
      <Grid item xs={7}>
        <Typography variant='subtitle1'>Holes</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField type='number' defaultValue={0} />
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
        <TextField type='number' defaultValue={0} />
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
                {<SelectBox options={fittingTypeOptions} />}
              </Grid>

              <Grid item xs={7}>
                <Typography variant='subtitle1'>Terminations Size</Typography>
              </Grid>
              <Grid item xs={5}>
                {
                  <SelectBox
                    options={terminationsSizeOptions}
                    defaultValue='M10'
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
                    defaultValue='50mm'
                  />
                }
              </Grid>

              <Grid item xs={7}>
                <Typography variant='subtitle1'>Repeat Count</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField type='number' defaultValue={0} />
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
