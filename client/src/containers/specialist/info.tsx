import * as React from 'react'

import QueryResult from '@/lib/results/query-result'
import {SpecialistCard} from '@/components/specialist/card'
import {SpecialistLocation} from '@/containers/specialist/location'
import {filter} from 'graphql-anywhere'
import styled from '@emotion/styled'
import {
  GetSpecialistQueryVariables,
  useGetSpecialistQuery,
  Geo,
} from '/__generated__/types'

const Wrapper = styled.main`
  isolation: isolate;
  height: 640px;
  width: 100%;
  display: flex;
  margin-bottom: 16px;
`

const Column = styled.aside`
  height: 90%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Picture = styled.section`
  height: 250px;
  width: 100%;
  background-color: red;
  z-index: 2;
`

const Details = styled.section`
  height: 100%;
  width: 60%;
  padding: 16px;
  padding-top: 200px;
  display: flex;
`

export const SpecialistInfo = ({
  id,
}: GetSpecialistQueryVariables): JSX.Element => {
  const {loading, error, data} = useGetSpecialistQuery({
    variables: {id},
  })
  return (
    <Wrapper>
      <QueryResult loading={loading} error={error} data={data}>
        <Column>
          <Picture />
          {data?.specialistForAbout.address.geo ? (
            <SpecialistLocation
              geo={filter<Geo>(
                SpecialistLocation.fragments.specialist,
                data?.specialistForAbout.address.geo
              )}
            />
          ) : null}
        </Column>
        <Details>
          {data?.specialistForAbout ? (
            <SpecialistCard {...data?.specialistForAbout} />
          ) : null}
        </Details>
      </QueryResult>
    </Wrapper>
  )
}
