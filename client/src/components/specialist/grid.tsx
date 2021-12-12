import * as React from 'react'

import {gql, useQuery} from '@apollo/client'

import QueryResult from '@/lib/results/query-result'
import SpecialistItem from '@/components/specialist/item'
import {getSpecialists} from '/__generated__/getSpecialists'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const GET_SPECIALISTS = gql`
  query getSpecialists {
    specialistsForDashboard {
      id
      name
      address {
        city
      }
      company {
        bs
      }
    }
  }
`

const Grid = styled.div`
  position: relative;
  width: 568px;
  height: auto;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 8px;
  padding-top: 100px;
  margin: 8px 0;
  isolation: isolate;
  ${theme.breakpoints.medium} {
    width: 100%;
  }
`

const SpecialistGrid = (): JSX.Element => {
  const {loading, error, data} = useQuery<getSpecialists>(GET_SPECIALISTS)
  return (
    <Grid>
      <QueryResult loading={loading} error={error} data={data}>
        {data?.specialistsForDashboard.map(specialist => (
          <SpecialistItem key={specialist.id} {...specialist} />
        ))}
      </QueryResult>
    </Grid>
  )
}

export default SpecialistGrid
