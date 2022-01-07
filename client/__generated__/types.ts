import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** the name and address of the person or business */
export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  geo?: Maybe<Geo>;
  street?: Maybe<Scalars['String']>;
  suite?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String'];
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: Maybe<Scalars['String']>;
  /** the name by which people know the business of the specialist */
  name: Scalars['String'];
};

/** the coordinates at geographic coordinate system */
export type Geo = {
  __typename?: 'Geo';
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Query to get the information about a specific specialist */
  specialistForAbout: Specialist;
  /** Query to get a list of specialists for the dashboard page */
  specialistsForDashboard: Array<Specialist>;
};


export type QuerySpecialistForAboutArgs = {
  id: Scalars['ID'];
};

/** a member of a profession or any person who earns a living from a specified professional activity */
export type Specialist = {
  __typename?: 'Specialist';
  /** the place where the specialist works */
  address: Address;
  /** an icon, graphic, or other image by which the specialist represents himself or herself */
  avatar?: Maybe<Scalars['String']>;
  /** a business organization that makes, buys, or sells goods or provides services in exchange for money */
  company: Company;
  /** the business email address of the specialist */
  email: Scalars['String'];
  /** the unique identifier of the specialist */
  id: Scalars['ID'];
  /** the first and last name of the specialist */
  name: Scalars['String'];
  /** the business phone number of the specialist */
  phone?: Maybe<Scalars['String']>;
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>;
};

export type GetSpecialistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSpecialistQuery = { __typename?: 'Query', specialistForAbout: { __typename?: 'Specialist', id: string, name: string, email: string, phone?: string | null | undefined, website?: string | null | undefined, address: { __typename?: 'Address', street?: string | null | undefined, suite?: string | null | undefined, city: string, zipcode?: string | null | undefined, geo?: { __typename?: 'Geo', lat: string, lng: string } | null | undefined }, company: { __typename?: 'Company', name: string, catchPhrase?: string | null | undefined, bs: string } } };

export type GetSpecialistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecialistsQuery = { __typename?: 'Query', specialistsForDashboard: Array<{ __typename?: 'Specialist', id: string, name: string, address: { __typename?: 'Address', city: string }, company: { __typename?: 'Company', bs: string } }> };

export type GeolocationFieldsFragment = { __typename?: 'Geo', lat: string, lng: string };

export const GeolocationFieldsFragmentDoc = /*#__PURE__*/ gql`
    fragment GeolocationFields on Geo {
  lat
  lng
}
    `;
export const GetSpecialistDocument = /*#__PURE__*/ gql`
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
    ${GeolocationFieldsFragmentDoc}`;

/**
 * __useGetSpecialistQuery__
 *
 * To run a query within a React component, call `useGetSpecialistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecialistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecialistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSpecialistQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSpecialistQuery, GetSpecialistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSpecialistQuery, GetSpecialistQueryVariables>(GetSpecialistDocument, options);
      }
export function useGetSpecialistLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSpecialistQuery, GetSpecialistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSpecialistQuery, GetSpecialistQueryVariables>(GetSpecialistDocument, options);
        }
export type GetSpecialistQueryHookResult = ReturnType<typeof useGetSpecialistQuery>;
export type GetSpecialistLazyQueryHookResult = ReturnType<typeof useGetSpecialistLazyQuery>;
export type GetSpecialistQueryResult = Apollo.QueryResult<GetSpecialistQuery, GetSpecialistQueryVariables>;
export const GetSpecialistsDocument = /*#__PURE__*/ gql`
    query getSpecialists {
  specialistsForDashboard {
    id
    name
    address {
      city
    }
    company {
      bs
    }
  }
}
    `;

/**
 * __useGetSpecialistsQuery__
 *
 * To run a query within a React component, call `useGetSpecialistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecialistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecialistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpecialistsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSpecialistsQuery, GetSpecialistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSpecialistsQuery, GetSpecialistsQueryVariables>(GetSpecialistsDocument, options);
      }
export function useGetSpecialistsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSpecialistsQuery, GetSpecialistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSpecialistsQuery, GetSpecialistsQueryVariables>(GetSpecialistsDocument, options);
        }
export type GetSpecialistsQueryHookResult = ReturnType<typeof useGetSpecialistsQuery>;
export type GetSpecialistsLazyQueryHookResult = ReturnType<typeof useGetSpecialistsLazyQuery>;
export type GetSpecialistsQueryResult = Apollo.QueryResult<GetSpecialistsQuery, GetSpecialistsQueryVariables>;