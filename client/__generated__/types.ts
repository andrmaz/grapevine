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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** the name and address of the person or business */
export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  /** the coordinates at geographic coordinate system */
  geo?: Maybe<Geo>;
  street?: Maybe<Scalars['String']>;
  /** the location of a business within a shopping mall or office building */
  suite?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  /** the name of the city to which the address is located */
  city: Scalars['String'];
  /** the coordinates at geographic coordinate system */
  geo?: InputMaybe<GeoInput>;
  /** the name of the street to which the address is located */
  street?: InputMaybe<Scalars['String']>;
  /**  the location of a business within a shopping mall or office building */
  suite?: InputMaybe<Scalars['String']>;
  /** the postal code to which the address is located */
  zipcode?: InputMaybe<Scalars['String']>;
};

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
  /** Authenticated user after a successful mutation */
  user?: Maybe<AuthenticationResult>;
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  /** the expiration date of the authorization token */
  expiresAt?: Maybe<Scalars['Int']>;
  /** the jsonwebtoken represents the user information */
  token: Scalars['String'];
  /** the primary authentication information */
  userInfo: User;
};

/** a business organization that makes, buys, or sells goods or provides services in exchange for money */
export type Company = {
  __typename?: 'Company';
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String'];
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: Maybe<Scalars['String']>;
  /** the name by which people know the business of the specialist */
  name: Scalars['String'];
};

export type CompanyInput = {
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String'];
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: InputMaybe<Scalars['String']>;
  /** the name by which people know the business of the specialist */
  name: Scalars['String'];
};

/** individuals and businesses that purchase goods and services from another business */
export type Customer = User & {
  __typename?: 'Customer';
  /** the place where the customer lives */
  address?: Maybe<Address>;
  /** the email address of the customer */
  email: Scalars['String'];
  /** the unique identifier of the customer */
  id: Scalars['ID'];
  /** the first and last name of the customer */
  name: Scalars['String'];
  /** the permissions granted to the customer */
  role: Role;
  /** a list of specialists who have been recommended by the customer */
  specialists: Array<Maybe<Scalars['String']>>;
};

export type CustomerInput = {
  /** the place where the customer lives */
  address: AddressInput;
  /** the email address of the customer */
  email: Scalars['String'];
  /** the first and last name of the customer */
  name: Scalars['String'];
};

export type CustomerResponse = {
  __typename?: 'CustomerResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Newly updated customer after a successful mutation */
  customer?: Maybe<Customer>;
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

/** the coordinates at geographic coordinate system */
export type Geo = {
  __typename?: 'Geo';
  /** the latitude of a certain point on the surface of the Earth */
  lat: Scalars['String'];
  /** the longitude of a certain point on the surface of the Earth */
  lng: Scalars['String'];
};

export type GeoInput = {
  /** the latitude of a certain point on the surface of the Earth */
  lat: Scalars['String'];
  /** the longitude of a certain point on the surface of the Earth */
  lng: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  /** the text of the message */
  content: Scalars['String'];
  /** the unique identifier of the sender of the message */
  from: Scalars['String'];
  /** the unique identifier of the message */
  id: Scalars['ID'];
  /** the unique identifier of the recipient of the message */
  to: Scalars['String'];
};

export type MessageInput = {
  /** the text of the message */
  content: Scalars['String'];
  /** the unique identifier of the sender of the message */
  from: Scalars['String'];
  /** the unique identifier of the recipient of the message */
  to: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Newly created message after a successful mutation */
  output?: Maybe<Message>;
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to add a specialist to the user recommendation list */
  addRecommendation: CustomerResponse;
  /** Mutation to authorize an existing customer */
  authorizeCustomer: AuthenticationResponse;
  /** Mutation to send a text message */
  createMessage: MessageResponse;
  /** Mutation to increment the specialist's recommendations property */
  incrementRecommendations: SpecialistResponse;
  /** Mutation to create a new customer */
  registerCustomer: AuthenticationResponse;
  /** Mutation to create a new specialist */
  registerSpecialist: AuthenticationResponse;
  /** Mutation to remove a specific customer */
  removeCustomer: CustomerResponse;
  /** Mutation to remove a specific specialist */
  removeSpecialist: SpecialistResponse;
};


export type MutationAddRecommendationArgs = {
  id: Scalars['ID'];
};


export type MutationAuthorizeCustomerArgs = {
  input: UserInput;
};


export type MutationCreateMessageArgs = {
  input: MessageInput;
};


export type MutationIncrementRecommendationsArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterCustomerArgs = {
  input: CustomerInput;
};


export type MutationRegisterSpecialistArgs = {
  input: SpecialistInput;
};


export type MutationRemoveCustomerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationRemoveSpecialistArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Query to get the information about a specific customer */
  customerForProfile: Customer;
  /** Query to get the specialist chat messages */
  messagesForChat: Array<Message>;
  /** Query to get the customer's recommendation list */
  recommendationsForDashboard: Array<Specialist>;
  /** Query to get the information about a specific specialist */
  specialistForAbout: Specialist;
  /** Query to get a list of specialists for the dashboard page */
  specialistsForDashboard: Array<Specialist>;
};


export type QueryCustomerForProfileArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesForChatArgs = {
  from: Scalars['String'];
  to: Scalars['String'];
};


export type QueryRecommendationsForDashboardArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySpecialistForAboutArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  User = 'USER'
}

/** a member of a profession or any person who earns a living from a specified professional activity */
export type Specialist = User & {
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
  /** number of times the specialist has been recommended by customers */
  recommendations?: Maybe<Scalars['Int']>;
  /** the permissions granted to the specialist */
  role: Role;
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>;
};

export type SpecialistInput = {
  /** the place where the specialist works */
  address: AddressInput;
  /** an icon, graphic, or other image by which the specialist represents himself or herself */
  avatar?: InputMaybe<Scalars['String']>;
  /** the company where the specialist works */
  company: CompanyInput;
  /** the business email address of the specialist */
  email: Scalars['String'];
  /** the first and last name of the specialist */
  name: Scalars['String'];
  /** the business phone number of the specialist */
  phone?: InputMaybe<Scalars['String']>;
  /** a central location of web pages that are related and accessed using a browser */
  website?: InputMaybe<Scalars['String']>;
};

export type SpecialistResponse = {
  __typename?: 'SpecialistResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Newly updated specialist after a successful mutation */
  specialist?: Maybe<Specialist>;
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Message>;
};

/** Basis interface for customer and specialist database types */
export type User = {
  /** the email address of the user */
  email: Scalars['String'];
  /** the unique identifier of the user */
  id: Scalars['ID'];
  /** the first and last name of the user */
  name: Scalars['String'];
  /** the permissions granted to the user */
  role: Role;
};

export type UserInput = {
  /** the email address of the user */
  email: Scalars['String'];
};

export type CustomerForProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CustomerForProfileQuery = { __typename?: 'Query', customerForProfile: { __typename?: 'Customer', id: string, name: string } };

export type AuthorizeCustomerMutationVariables = Exact<{
  input: UserInput;
}>;


export type AuthorizeCustomerMutation = { __typename?: 'Mutation', authorizeCustomer: { __typename?: 'AuthenticationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'AuthenticationResult', token: string, expiresAt?: number | null | undefined, userInfo: { __typename?: 'Customer', name: string, id: string, email: string, role: Role } | { __typename?: 'Specialist', name: string, id: string, email: string, role: Role } } | null | undefined } };

export type AddRecommendationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AddRecommendationMutation = { __typename?: 'Mutation', addRecommendation: { __typename?: 'CustomerResponse', code: number, success: boolean, message: string, customer?: { __typename?: 'Customer', id: string, name: string, email: string, specialists: Array<string | null | undefined> } | null | undefined } };

export type RecommendationsForDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendationsForDashboardQuery = { __typename?: 'Query', recommendationsForDashboard: Array<{ __typename?: 'Specialist', id: string, name: string }> };

export type RegisterCustomerMutationVariables = Exact<{
  input: CustomerInput;
}>;


export type RegisterCustomerMutation = { __typename?: 'Mutation', registerCustomer: { __typename?: 'AuthenticationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'AuthenticationResult', token: string, expiresAt?: number | null | undefined, userInfo: { __typename?: 'Customer', name: string, id: string, email: string, role: Role } | { __typename?: 'Specialist', name: string, id: string, email: string, role: Role } } | null | undefined } };

export type IncrementRecommendationsMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IncrementRecommendationsMutation = { __typename?: 'Mutation', incrementRecommendations: { __typename?: 'SpecialistResponse', code: number, success: boolean, message: string, specialist?: { __typename?: 'Specialist', id: string, recommendations?: number | null | undefined } | null | undefined } };

export type GetSpecialistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSpecialistQuery = { __typename?: 'Query', specialistForAbout: { __typename?: 'Specialist', id: string, name: string, email: string, phone?: string | null | undefined, website?: string | null | undefined, address: { __typename?: 'Address', street?: string | null | undefined, suite?: string | null | undefined, city: string, zipcode?: string | null | undefined, geo?: { __typename?: 'Geo', lat: string, lng: string } | null | undefined }, company: { __typename?: 'Company', name: string, catchPhrase?: string | null | undefined, bs: string } } };

export type GetSpecialistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecialistsQuery = { __typename?: 'Query', specialistsForDashboard: Array<{ __typename?: 'Specialist', id: string, name: string, address: { __typename?: 'Address', city: string }, company: { __typename?: 'Company', bs: string } }> };

export type GeolocationFieldsFragment = { __typename?: 'Geo', lat: string, lng: string };

export type CreateMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'MessageResponse', code: number, success: boolean, message: string, output?: { __typename?: 'Message', from: string, to: string, content: string } | null | undefined } };

export type MessagesForChatQueryVariables = Exact<{
  from: Scalars['String'];
  to: Scalars['String'];
}>;


export type MessagesForChatQuery = { __typename?: 'Query', messagesForChat: Array<{ __typename?: 'Message', id: string, from: string, to: string, content: string }> };

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded?: { __typename?: 'Message', id: string, from: string, to: string, content: string } | null | undefined };

export const GeolocationFieldsFragmentDoc = /*#__PURE__*/ gql`
    fragment GeolocationFields on Geo {
  lat
  lng
}
    `;
export const CustomerForProfileDocument = /*#__PURE__*/ gql`
    query CustomerForProfile($id: ID!) {
  customerForProfile(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useCustomerForProfileQuery__
 *
 * To run a query within a React component, call `useCustomerForProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerForProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerForProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerForProfileQuery(baseOptions: ApolloReactHooks.QueryHookOptions<CustomerForProfileQuery, CustomerForProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CustomerForProfileQuery, CustomerForProfileQueryVariables>(CustomerForProfileDocument, options);
      }
export function useCustomerForProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerForProfileQuery, CustomerForProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CustomerForProfileQuery, CustomerForProfileQueryVariables>(CustomerForProfileDocument, options);
        }
export type CustomerForProfileQueryHookResult = ReturnType<typeof useCustomerForProfileQuery>;
export type CustomerForProfileLazyQueryHookResult = ReturnType<typeof useCustomerForProfileLazyQuery>;
export type CustomerForProfileQueryResult = Apollo.QueryResult<CustomerForProfileQuery, CustomerForProfileQueryVariables>;
export const AuthorizeCustomerDocument = /*#__PURE__*/ gql`
    mutation AuthorizeCustomer($input: UserInput!) {
  authorizeCustomer(input: $input) {
    code
    success
    message
    user {
      userInfo {
        name
        id
        email
        role
      }
      token
      expiresAt
    }
  }
}
    `;
export type AuthorizeCustomerMutationFn = Apollo.MutationFunction<AuthorizeCustomerMutation, AuthorizeCustomerMutationVariables>;

/**
 * __useAuthorizeCustomerMutation__
 *
 * To run a mutation, you first call `useAuthorizeCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeCustomerMutation, { data, loading, error }] = useAuthorizeCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthorizeCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthorizeCustomerMutation, AuthorizeCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AuthorizeCustomerMutation, AuthorizeCustomerMutationVariables>(AuthorizeCustomerDocument, options);
      }
export type AuthorizeCustomerMutationHookResult = ReturnType<typeof useAuthorizeCustomerMutation>;
export type AuthorizeCustomerMutationResult = Apollo.MutationResult<AuthorizeCustomerMutation>;
export type AuthorizeCustomerMutationOptions = Apollo.BaseMutationOptions<AuthorizeCustomerMutation, AuthorizeCustomerMutationVariables>;
export const AddRecommendationDocument = /*#__PURE__*/ gql`
    mutation AddRecommendation($id: ID!) {
  addRecommendation(id: $id) {
    code
    success
    message
    customer {
      id
      name
      email
      specialists
    }
  }
}
    `;
export type AddRecommendationMutationFn = Apollo.MutationFunction<AddRecommendationMutation, AddRecommendationMutationVariables>;

/**
 * __useAddRecommendationMutation__
 *
 * To run a mutation, you first call `useAddRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecommendationMutation, { data, loading, error }] = useAddRecommendationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddRecommendationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddRecommendationMutation, AddRecommendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddRecommendationMutation, AddRecommendationMutationVariables>(AddRecommendationDocument, options);
      }
export type AddRecommendationMutationHookResult = ReturnType<typeof useAddRecommendationMutation>;
export type AddRecommendationMutationResult = Apollo.MutationResult<AddRecommendationMutation>;
export type AddRecommendationMutationOptions = Apollo.BaseMutationOptions<AddRecommendationMutation, AddRecommendationMutationVariables>;
export const RecommendationsForDashboardDocument = /*#__PURE__*/ gql`
    query RecommendationsForDashboard {
  recommendationsForDashboard {
    id
    name
  }
}
    `;

/**
 * __useRecommendationsForDashboardQuery__
 *
 * To run a query within a React component, call `useRecommendationsForDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationsForDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationsForDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecommendationsForDashboardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecommendationsForDashboardQuery, RecommendationsForDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RecommendationsForDashboardQuery, RecommendationsForDashboardQueryVariables>(RecommendationsForDashboardDocument, options);
      }
export function useRecommendationsForDashboardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecommendationsForDashboardQuery, RecommendationsForDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RecommendationsForDashboardQuery, RecommendationsForDashboardQueryVariables>(RecommendationsForDashboardDocument, options);
        }
export type RecommendationsForDashboardQueryHookResult = ReturnType<typeof useRecommendationsForDashboardQuery>;
export type RecommendationsForDashboardLazyQueryHookResult = ReturnType<typeof useRecommendationsForDashboardLazyQuery>;
export type RecommendationsForDashboardQueryResult = Apollo.QueryResult<RecommendationsForDashboardQuery, RecommendationsForDashboardQueryVariables>;
export const RegisterCustomerDocument = /*#__PURE__*/ gql`
    mutation RegisterCustomer($input: CustomerInput!) {
  registerCustomer(input: $input) {
    code
    success
    message
    user {
      userInfo {
        name
        id
        email
        role
      }
      token
      expiresAt
    }
  }
}
    `;
export type RegisterCustomerMutationFn = Apollo.MutationFunction<RegisterCustomerMutation, RegisterCustomerMutationVariables>;

/**
 * __useRegisterCustomerMutation__
 *
 * To run a mutation, you first call `useRegisterCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCustomerMutation, { data, loading, error }] = useRegisterCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterCustomerMutation, RegisterCustomerMutationVariables>(RegisterCustomerDocument, options);
      }
export type RegisterCustomerMutationHookResult = ReturnType<typeof useRegisterCustomerMutation>;
export type RegisterCustomerMutationResult = Apollo.MutationResult<RegisterCustomerMutation>;
export type RegisterCustomerMutationOptions = Apollo.BaseMutationOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const IncrementRecommendationsDocument = /*#__PURE__*/ gql`
    mutation IncrementRecommendations($id: ID!) {
  incrementRecommendations(id: $id) {
    code
    success
    message
    specialist {
      id
      recommendations
    }
  }
}
    `;
export type IncrementRecommendationsMutationFn = Apollo.MutationFunction<IncrementRecommendationsMutation, IncrementRecommendationsMutationVariables>;

/**
 * __useIncrementRecommendationsMutation__
 *
 * To run a mutation, you first call `useIncrementRecommendationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementRecommendationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementRecommendationsMutation, { data, loading, error }] = useIncrementRecommendationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIncrementRecommendationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IncrementRecommendationsMutation, IncrementRecommendationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<IncrementRecommendationsMutation, IncrementRecommendationsMutationVariables>(IncrementRecommendationsDocument, options);
      }
export type IncrementRecommendationsMutationHookResult = ReturnType<typeof useIncrementRecommendationsMutation>;
export type IncrementRecommendationsMutationResult = Apollo.MutationResult<IncrementRecommendationsMutation>;
export type IncrementRecommendationsMutationOptions = Apollo.BaseMutationOptions<IncrementRecommendationsMutation, IncrementRecommendationsMutationVariables>;
export const GetSpecialistDocument = /*#__PURE__*/ gql`
    query GetSpecialist($id: ID!) {
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
    query GetSpecialists {
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
export const CreateMessageDocument = /*#__PURE__*/ gql`
    mutation CreateMessage($input: MessageInput!) {
  createMessage(input: $input) {
    code
    success
    message
    output {
      from
      to
      content
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const MessagesForChatDocument = /*#__PURE__*/ gql`
    query MessagesForChat($from: String!, $to: String!) {
  messagesForChat(from: $from, to: $to) {
    id
    from
    to
    content
  }
}
    `;

/**
 * __useMessagesForChatQuery__
 *
 * To run a query within a React component, call `useMessagesForChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesForChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesForChatQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useMessagesForChatQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MessagesForChatQuery, MessagesForChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MessagesForChatQuery, MessagesForChatQueryVariables>(MessagesForChatDocument, options);
      }
export function useMessagesForChatLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesForChatQuery, MessagesForChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MessagesForChatQuery, MessagesForChatQueryVariables>(MessagesForChatDocument, options);
        }
export type MessagesForChatQueryHookResult = ReturnType<typeof useMessagesForChatQuery>;
export type MessagesForChatLazyQueryHookResult = ReturnType<typeof useMessagesForChatLazyQuery>;
export type MessagesForChatQueryResult = Apollo.QueryResult<MessagesForChatQuery, MessagesForChatQueryVariables>;
export const MessageAddedDocument = /*#__PURE__*/ gql`
    subscription MessageAdded {
  messageAdded {
    id
    from
    to
    content
  }
}
    `;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, options);
      }
export type MessageAddedSubscriptionHookResult = ReturnType<typeof useMessageAddedSubscription>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;