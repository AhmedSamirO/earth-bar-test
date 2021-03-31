import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import LinkComponent, { LinkComponentType } from './LinkComponent'
import SelectBox from '../../shared/SelectBox'

const useStyles = makeStyles({
  root: {
    maxHeight: '99vh',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  button: {
    height: 40,
    fontSize: 12,
    marginBottom: 30,
  },
  mainContainer: {
    border: 'solid 2px black',
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  },
  note: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
})

export default function SideBar() {
  const classes = useStyles()

  const [baseMaterial, setBaseMaterial] = useState('')
  const [feetMaterial, setFeetMaterial] = useState('')
  const [copperBarSize, setCopperBarSize] = useState('')
  const [barFinish, setBarFinish] = useState('')
  const [insulatorMaterial, setInsulatorMaterial] = useState('')
  const [insulatorSize, setInsulatorSize] = useState('')
  const [terminationMaterial, setTerminationMaterial] = useState('')
  const [linkConfiguration, setLinkConfiguration] = useState(0)

  const [links, setLinks] = useState<Array<LinkComponentType>>([
    { positionOfFeet: 0, holes: 0, columns: [], linkIndex: 0, quantity: 1 },
  ])

  const baseMaterialOptions = [
    'Black PVC (full length)',
    'AVG Galvanised Steel (full length)',
    'Stainless Steel SS316 (full length)',
    'ACHAN1 Galvanised Mild Steel (full length)',
    'Bright Zinc Plated (full length)',
    'Hot Dipped Galvanised (full length)',
    'Feet',
    'None',
  ]

  const feetMaterialOptions = [
    'Black PVC',
    'AVG Galvanised Steel',
    'Stainless Steel SS316',
    'ACHAN1 Galvanised Mild Steel',
    'Bright Zinc Plated',
    'Hot Dipped Galvanised',
  ]

  const copperBarSizeOptions = ['50x6mm']

  const barFinishOptions = [
    'Hard drawn plain copper',
    'Hard drawn Tinned copper',
    'Stainless steel',
    'Copper Nickel Plated',
    'Aluminium',
    'Bright Zinc Plated',
    'Hot Dipped Galvanised',
  ]

  const insulatorMaterialOptions = ['Standard', 'LSF']

  const insulatorSizeOptions = ['Standard', 'Hexagonal', 'Other', 'None ']

  const terminationMaterialOptions = [
    'Phosphor Bronze',
    'Brass (non-compliant)',
    'Stainless Steel – (non-compliant)',
    'Nickel Plated Phosphor Bronze – (non-compliant)',
  ]
  return (
    <Grid container className={classes.root}>
      <Grid container justify='space-between' spacing={2}>
        <Grid item xs={6}>
          <Button
            className={classes.button}
            variant='contained'
            onClick={() => {}}
            fullWidth
          >
            Save Earth Bar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.button}
            variant='contained'
            onClick={() => {}}
            fullWidth
          >
            Search existing
          </Button>
        </Grid>
      </Grid>

      <Grid container justify='space-between' className={classes.mainContainer}>
        <Grid item xs={7}>
          <Typography variant='subtitle1'>Base Material</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={baseMaterialOptions}
              value={baseMaterial}
              onChange={setBaseMaterial}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Fixing Holes in Base</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant='subtitle2' className={classes.note}>
            Number of fixing holes – Jason to recommend.
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Fixing Holes Diameter</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant='subtitle2' className={classes.note}>
            Diameter will include a drop-down menu
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Feet Material</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={feetMaterialOptions}
              value={feetMaterial}
              onChange={setFeetMaterial}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Copper Bar Size</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={copperBarSizeOptions}
              value={copperBarSize}
              onChange={setCopperBarSize}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Bar Finish</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={barFinishOptions}
              value={barFinish}
              onChange={setBarFinish}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Insulator Material</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={insulatorMaterialOptions}
              value={insulatorMaterial}
              onChange={setInsulatorMaterial}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Insulator Size</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={insulatorSizeOptions}
              value={insulatorSize}
              onChange={setInsulatorSize}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Termination Material</Typography>
        </Grid>
        <Grid item xs={5}>
          {
            <SelectBox
              options={terminationMaterialOptions}
              value={terminationMaterial}
              onChange={setTerminationMaterial}
            />
          }
        </Grid>

        <Grid item xs={7}>
          <Typography variant='subtitle1'>Link Configuration</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type='number'
            value={linkConfiguration}
            onChange={event => {
              setLinkConfiguration(Number(event.target.value))
            }}
          />
        </Grid>
      </Grid>
      {links.map(link => (
        <Grid
          container
          justify='space-between'
          className={classes.mainContainer}
          key={link.linkIndex}
        >
          <LinkComponent
            linkIndex={link.linkIndex}
            links={links}
            setLinks={setLinks}
          />
        </Grid>
      ))}
    </Grid>
  )
}
