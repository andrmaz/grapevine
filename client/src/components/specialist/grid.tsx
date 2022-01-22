import * as React from 'react'

import {ApolloError} from '@apollo/client'
import {GetSpecialistsQuery} from '/__generated__/types'
import QueryResult from '@/lib/results/query-result'
import {SpecialistItem} from '@/components/specialist/item'
import styled from '@emotion/styled'
import {theme} from '@/themes'

interface SpecialistGridProps {
  loading: boolean
  error?: ApolloError
  specialists?: GetSpecialistsQuery['specialistsForDashboard']
}

const Wrapper = styled.section`
  position: relative;
  width: 568px;
  height: 100%;
  padding: 4px;
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
const Text = styled.span`
  ${theme.mode.dark} {
    color: var(--color-gray-10);
  }
`

export const SpecialistGrid = ({
  loading,
  error,
  specialists,
}: SpecialistGridProps): JSX.Element => {
  return (
    <Wrapper>
      {specialists && specialists.length < 1 && (
        <Text>
          No results match your search criteria. Try with supply-chains
        </Text>
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
