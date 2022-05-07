import * as React from 'react'

import {Link} from 'react-router-dom'
import {QueryResult} from '@/components/results/query-result'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useRecommendationsForDashboardQuery} from '/__generated__/types'

export const RecommendationList = (): JSX.Element => {
  const {data, loading, error} = useRecommendationsForDashboardQuery()
  const recommendations = data?.recommendationsForDashboard
  return (
    <SideBar>
      <Title>Your recommendations list</Title>
      <QueryResult loading={loading} data={data} error={error}>
        {recommendations && recommendations?.length > 0 ? (
          <List>
            {recommendations.map(({id, name}) => (
              <Item key={id}>
                <NavLink to={`/about/${id}`}>{name}</NavLink>
              </Item>
            ))}
          </List>
        ) : (
          'You have not recommended any specialists yet'
        )}
      </QueryResult>
    </SideBar>
  )
}

const SideBar = styled.nav`
  width: 200px;
  height: 100%;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  overflow-x: hidden; /* Disable horizontal scroll */
  border-right: 2px solid;
  border-left: 2px solid;
  padding: 8px 4px;
  ${theme.breakpoints.medium} {
    display: none;
  }
  ${theme.mode.dark} {
    color: var(--color-gray-10);
    border-right-color: var(--color-blue);
    border-left-color: var(--color-blue);
  }
`
const Title = styled.h4`
  margin-bottom: 16px;
`
const List = styled.div`
  list-style-type: circle;
`
const Item = styled.li`
  margin-bottom: 8px;
`
const NavLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: revert;
  }
  ${theme.mode.dark} {
    color: var(--color-yellow);
  }
`
