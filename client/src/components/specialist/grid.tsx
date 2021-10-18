import * as React from 'react'

import {gql, useQuery} from '@apollo/client'

import {Query} from '/__generated__/Query'
import QueryResult from '@/lib/results/query-result'
import SpecialistItem from '@/components/specialist/item'
import styled from '@emotion/styled'

const GET_SPECIALISTS = gql`
  query Query {
    specialistsForDashboard {
      id
      name
      company
      industry
      avatar
    }
  }
`

const Grid = styled.div`
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
`

const SpecialistGrid = (): JSX.Element => {
  const {loading, error, data} = useQuery<Query>(GET_SPECIALISTS)
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
