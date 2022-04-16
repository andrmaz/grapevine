import * as React from 'react'

import {
  GetSpecialistQuery,
  GetSpecialistQueryVariables,
  useAddRecommendationMutation,
  useIncrementRecommendationsMutation,
} from '/__generated__/types'

import {SpecialistCard} from '@/screens/specialist/card'
import {Star} from 'react-feather'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import {theme} from '@/themes'

type Props = {
  id: GetSpecialistQueryVariables['id']
  data: GetSpecialistQuery | undefined
}
export const SpecialistDetails: React.FC<Props> = ({id, data}): JSX.Element => {
  const [incrementRecommendationsMutation] =
    useIncrementRecommendationsMutation({
      variables: {id},
    })
  const [addRecommendationMutation] = useAddRecommendationMutation({
    variables: {id},
    update(cache) {
      cache.modify({
        fields: {
          recommendationsForDashboard(
            existingRecommendations = [],
            {readField}
          ) {
            const newRecommendationRef = cache.writeFragment({
              data: data?.specialistForAbout,
              fragment: gql`
                fragment Recommendation on Specialist {
                  id
                  name
                }
              `,
            })
            // Quick safety check - if the new recommendation is already
            // present in the cache, we don't need to add it again.
            if (
              existingRecommendations.some(
                (ref: {id: string}) =>
                  readField('id', ref) === data?.specialistForAbout.id
              )
            ) {
              return existingRecommendations
            }
            return [...existingRecommendations, newRecommendationRef]
          },
        },
      })
    },
  })
  const handleClick = (): void => {
    incrementRecommendationsMutation()
    addRecommendationMutation()
  }
  return (
    <Wrapper>
      <Icon size={40} onClick={handleClick} />
      {data?.specialistForAbout ? (
        <SpecialistCard {...data?.specialistForAbout} />
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  height: 100%;
  width: 60%;
  padding: 16px;
  padding-top: 200px;
  display: flex;
`
const Icon = styled(Star)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: var(--color-green);
  }
  ${theme.mode.dark} {
    color: var(--color-base);
  }
`
