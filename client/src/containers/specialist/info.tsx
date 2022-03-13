import * as React from 'react'

import {
  Geo,
  GetSpecialistQueryVariables,
  useGetSpecialistQuery,
  useIncrementRecommendationsMutation,
} from '/__generated__/types'

import QueryResult from '@/lib/results/query-result'
import {SpecialistCard} from '@/components/specialist/card'
import {SpecialistLocation} from '@/containers/specialist/location'
import {Star} from 'react-feather'
import {filter} from 'graphql-anywhere'
import styled from '@emotion/styled'
import {theme} from '@/themes'

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

const Avatar = styled.div`
  height: 250px;
  width: 100%;
  background-color: var(--color-gray-10);
  border: 1px solid;
  overflow: hidden;
  z-index: 2;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const Details = styled.section`
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

export const SpecialistInfo = ({
  id,
}: GetSpecialistQueryVariables): JSX.Element => {
  const {loading, error, data} = useGetSpecialistQuery({
    variables: {id},
  })
  const [incrementRecommendations] = useIncrementRecommendationsMutation({
    variables: {id},
  })
  const handleClick = (): void => {
    incrementRecommendations()
    // Add specialist to user's list
  }
  return (
    <Wrapper>
      <QueryResult loading={loading} error={error} data={data}>
        <Column>
          <Avatar>
            <Image
              src={`https://avatars.dicebear.com/api/personas/${data?.specialistForAbout.name}.svg`}
            />
          </Avatar>
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
          <Icon size={40} onClick={handleClick} />
          {data?.specialistForAbout ? (
            <SpecialistCard {...data?.specialistForAbout} />
          ) : null}
        </Details>
      </QueryResult>
    </Wrapper>
  )
}
