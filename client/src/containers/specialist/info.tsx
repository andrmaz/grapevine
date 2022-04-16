import * as React from 'react'

import {
  Geo,
  GetSpecialistQueryVariables,
  useGetSpecialistQuery,
} from '/__generated__/types'

import {QueryResult} from '@/components/results/query-result'
import {SpecialistDetails} from './details'
import {SpecialistLocation} from '@/containers/specialist/location'
import {filter} from 'graphql-anywhere'
import styled from '@emotion/styled'

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
          <Avatar>
            <Image
              src={`https://avatars.dicebear.com/api/personas/${data?.specialistForAbout.name}.svg`}
            />
          </Avatar>
          {data?.specialistForAbout.address.geo ? (
            <SpecialistLocation
              geo={filter<Geo>(
                SpecialistLocation.fragments.specialist,
                data.specialistForAbout.address.geo
              )}
            />
          ) : null}
        </Column>
        <SpecialistDetails id={id} data={data} />
      </QueryResult>
    </Wrapper>
  )
}

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
