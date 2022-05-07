import * as React from 'react'

import {
  GetSpecialistQuery,
  useIncrementRecommendationsMutation,
} from '/__generated__/types'

import {SpecialistCard} from '@/screens/specialist/card'
import {Star} from 'react-feather'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useAddRecommendation} from '@/hooks/useAddRecommendation'

export const SpecialistDetails = ({
  specialistForAbout,
}: GetSpecialistQuery): JSX.Element => {
  const id = specialistForAbout.id
  const [incrementRecommendationsMutation] =
    useIncrementRecommendationsMutation({
      variables: {id},
    })
  const [addRecommendationMutation] = useAddRecommendation(specialistForAbout)

  const handleClick = (): void => {
    addRecommendationMutation()
    incrementRecommendationsMutation()
  }

  return (
    <Wrapper>
      <Icon size={40} onClick={handleClick} />
      <SpecialistCard {...specialistForAbout} />
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
