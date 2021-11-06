import * as React from 'react'

import {
  getSpecialist,
  getSpecialistVariables,
} from '/__generated__/getSpecialist'
import {gql, useQuery} from '@apollo/client'

import QueryResult from '@/lib/results/query-result'
import {SpecialistCard} from '@/components/specialist/card'

const GET_SPECIALIST = gql`
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
    <QueryResult loading={loading} error={error} data={data}>
      {data?.specialistForAbout ? (
        <SpecialistCard {...data.specialistForAbout} />
      ) : null}
    </QueryResult>
  )
}
