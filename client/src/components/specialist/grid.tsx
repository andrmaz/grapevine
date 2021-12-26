import * as React from 'react'

import QueryResult from '@/lib/results/query-result'
import {SpecialistItem} from '@/components/specialist/item'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {getSpecialists_specialistsForDashboard} from '/__generated__/getSpecialists'
import {ApolloError} from '@apollo/client'

interface SpecialistGridProps {
  loading: boolean
  error?: ApolloError
  specialists?: getSpecialists_specialistsForDashboard[]
}

const Wrapper = styled.section`
  position: relative;
  width: 568px;
  height: 100%;
  padding-top: 64px;
  margin: 8px 0;
  isolation: isolate;
  ${theme.breakpoints.medium} {
    width: 100%;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 8px;
`

export const SpecialistGrid = ({
  loading,
  error,
  specialists,
}: SpecialistGridProps): JSX.Element => {
  return (
    <Wrapper>
      {specialists && specialists.length < 1 && (
        <>No results match your search criteria. Try with supply-chains</>
      )}
      <QueryResult loading={loading} error={error} data={specialists}>
        <Grid>
          {specialists?.map(specialist => (
            <SpecialistItem key={specialist.id} {...specialist} />
          ))}
        </Grid>
      </QueryResult>
    </Wrapper>
  )
}
