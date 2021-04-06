import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import SelectBox from '../../shared/SelectBox'
import { LinkComponentType, ColumnRowType } from './LinkComponent'

declare type RowBoxComponentProps = {
  row: ColumnRowType
  link: LinkComponentType
  setLink: React.Dispatch<React.SetStateAction<LinkComponentType>>
  links: Array<LinkComponentType>
  setLinks: React.Dispatch<React.SetStateAction<Array<LinkComponentType>>>
  columnFirstIndex: number
  rowIndex: number
  removeLink: Function
}

export default function RowBoxComponent(props: RowBoxComponentProps) {
  const {
    row,
    link,
    setLink,
    links,
    setLinks,
    columnFirstIndex,
    rowIndex,
    removeLink,
  } = props

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

  const linksOptions = [
    'None',
    'Single Link',
    'Twin Links',
    'Multiple Links',
    '90-degree link',
  ]

  const linkTypeOptions = ['Lift off', 'Slide off', 'Swing']

  const updateRowValues = (
    link: LinkComponentType,
    updatedRow: ColumnRowType,
    columnFirstIndex: number,
    rowIndex: number
  ) => {
    const newLink = { ...link }

    newLink.columns = newLink.columns.map(currentColumn => {
      if (currentColumn.groupedColumns[0] === columnFirstIndex) {
        const updatedColumn = { ...currentColumn }
        updatedColumn.rows[rowIndex] = { ...updatedRow }
        return updatedColumn
      }
      return currentColumn
    })

    setLink(newLink)
  }

  const removeRowLinks = (
    links: Array<LinkComponentType>,
    linkIndex: number,
    newRow: ColumnRowType,
    columnFirstIndex: number,
    rowIndex: number
  ) => {
    if (linkIndex !== -1) {
      const removedLinksIndex = [linkIndex]
      removeLink(links, linkIndex, removedLinksIndex)

      newRow = { ...newRow, linkIndex: -1 }
      updateRowValues(link, newRow, columnFirstIndex, rowIndex)

      const newLinks = links.filter(
        newLink => !removedLinksIndex.includes(newLink.linkIndex)
      )

      setLinks(newLinks)
    }
  }

  return (
    <Grid container justify='space-between'>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>Row {rowIndex + 1}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant='subtitle1'>Fitting Type</Typography>
      </Grid>
      <Grid item xs={5}>
        <SelectBox
          options={fittingTypeOptions}
          value={row.fittingType}
          onChange={(value: string) => {
            let newRow = { ...row, fittingType: value }

            if (value === 'Link') {
              const newLinks = [...links]
              const newLinkIndex = newLinks[newLinks.length - 1].linkIndex + 1
              newLinks.push({
                positionOfFeet: 0,
                holes: 0,
                columns: [],
                linkIndex: newLinkIndex,
                quantity: 1,
              })
              newRow = {
                ...newRow,
                linkIndex: newLinkIndex,
              }
              updateRowValues(link, newRow, columnFirstIndex, rowIndex)

              setLinks(newLinks)
            } else {
              removeRowLinks(
                links,
                row.linkIndex,
                newRow,
                columnFirstIndex,
                rowIndex
              )
            }
          }}
        />
      </Grid>

      {row.fittingType === 'Link' && (
        <>
          <Grid item xs={7}>
            <Typography variant='subtitle1'>Links</Typography>
          </Grid>
          <Grid item xs={5}>
            <SelectBox
              options={linksOptions}
              value={row.links}
              onChange={(value: string) => {
                const newRow = { ...row, links: value }
                updateRowValues(link, newRow, columnFirstIndex, rowIndex)
              }}
            />
          </Grid>

          <Grid item xs={7}>
            <Typography variant='subtitle1'>Link Type</Typography>
          </Grid>
          <Grid item xs={5}>
            <SelectBox
              options={linkTypeOptions}
              value={row.linkType}
              onChange={(value: string) => {
                const newRow = { ...row, linkType: value }
                updateRowValues(link, newRow, columnFirstIndex, rowIndex)
              }}
            />
          </Grid>
        </>
      )}

      <Grid item xs={7}>
        <Typography variant='subtitle1'>Terminations Size</Typography>
      </Grid>
      <Grid item xs={5}>
        {
          <SelectBox
            options={terminationsSizeOptions}
            value={row.terminationsSize}
            onChange={(value: string) => {
              const newRow = { ...row, terminationsSize: value }
              updateRowValues(link, newRow, columnFirstIndex, rowIndex)
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
          value={row.terminationsSpacing}
          onChange={(value: string) => {
            const newRow = { ...row, terminationsSpacing: value }
            updateRowValues(link, newRow, columnFirstIndex, rowIndex)
          }}
        />
      </Grid>
    </Grid>
  )
}
