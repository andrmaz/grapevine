import * as React from 'react'

import {ApolloError} from '@apollo/client'
import {GetSpecialistsQuery} from '/__generated__/types'
import {QueryResult} from '@/components/results/query-result'
import {SpecialistItem} from '@/screens/specialist/item'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export interface SpecialistGridProps {
  loading: boolean
  error?: ApolloError
  specialists?: GetSpecialistsQuery['specialistsForDashboard']
}

export const SpecialistGrid = ({
  loading,
  error,
  specialists,
}: SpecialistGridProps): JSX.Element => {
  return (
    <Wrapper>
      {specialists && specialists.length < 1 && (
        <Text data-testid='retry'>
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

const Wrapper = styled.section`
  position: relative;
  width: 568px;
  height: 100%;
  padding: 4px;
  padding-top: 72px;
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