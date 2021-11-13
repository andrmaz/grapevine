import * as React from 'react'

import {
  getSpecialist,
  getSpecialistVariables,
} from '/__generated__/getSpecialist'
import {gql, useQuery} from '@apollo/client'

import {GeolocationFields} from '/__generated__/GeolocationFields'
import QueryResult from '@/lib/results/query-result'
import {SpecialistCard} from '@/components/specialist/card'
import {SpecialistLocation} from '@/containers/specialist/location'
import {filter} from 'graphql-anywhere'
import styled from '@emotion/styled'

/*
 * Query to get all the information about the specialist
 * (exported for tests)
 */
export const GET_SPECIALIST = gql`
  query getSpecialist($id: ID!) {
    specialistForAbout(id: $id) {
      id
      name
      email
      address {
        street
        suite
        city
        zipcode
        geo {
          ...GeolocationFields
        }
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
  ${SpecialistLocation.fragments.specialist}
`

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
}: {
  id: getSpecialistVariables['id']
}): JSX.Element => {
  const {loading, error, data} = useQuery<getSpecialist>(GET_SPECIALIST, {
    variables: {id},
  })
  return (
    <Wrapper>
      <QueryResult loading={loading} error={error} data={data}>
        <Column>
          <Picture />
          {data?.specialistForAbout.address.geo ? (
            <SpecialistLocation
              geo={filter<GeolocationFields>(
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
