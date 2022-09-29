import type {GraphQLResolveInfo} from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & {[P in K]-?: NonNullable<T[P]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

/** the name and address of the person or business */
export type Address = {
  __typename?: 'Address'
  city: Scalars['String']
  /** the coordinates at geographic coordinate system */
  geo?: Maybe<Geo>
  street?: Maybe<Scalars['String']>
  /** the location of a business within a shopping mall or office building */
  suite?: Maybe<Scalars['String']>
  zipcode?: Maybe<Scalars['String']>
}

export type AddressInput = {
  /** the name of the city to which the address is located */
  city: Scalars['String']
  /** the coordinates at geographic coordinate system */
  geo?: Maybe<GeoInput>
  /** the name of the street to which the address is located */
  street?: Maybe<Scalars['String']>
  /**  the location of a business within a shopping mall or office building */
  suite?: Maybe<Scalars['String']>
  /** the postal code to which the address is located */
  zipcode?: Maybe<Scalars['String']>
}

export type AuthenticationResponse = {
  __typename?: 'AuthenticationResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
  /** Authenticated user after a successful mutation */
  user?: Maybe<AuthenticationResult>
}

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult'
  /** the expiration date of the authorization token */
  expiresAt?: Maybe<Scalars['Int']>
  /** the jsonwebtoken represents the user information */
  token: Scalars['String']
  /** the primary authentication information */
  userInfo: User
}

/** a business organization that makes, buys, or sells goods or provides services in exchange for money */
export type Company = {
  __typename?: 'Company'
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String']
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: Maybe<Scalars['String']>
  /** the name by which people know the business of the specialist */
  name: Scalars['String']
}

export type CompanyInput = {
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String']
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: Maybe<Scalars['String']>
  /** the name by which people know the business of the specialist */
  name: Scalars['String']
}

/** individuals and businesses that purchase goods and services from another business */
export type Customer = User & {
  __typename?: 'Customer'
  /** the place where the customer lives */
  address?: Maybe<Address>
  /** the email address of the customer */
  email: Scalars['String']
  /** the unique identifier of the customer */
  id: Scalars['ID']
  /** the first and last name of the customer */
  name: Scalars['String']
  /** the permissions granted to the customer */
  role: Role
  /** a list of specialists who have been recommended by the customer */
  specialists: Array<Maybe<Scalars['String']>>
}

export type CustomerInput = {
  /** the place where the customer lives */
  address: AddressInput
  /** the email address of the customer */
  email: Scalars['String']
  /** the first and last name of the customer */
  name: Scalars['String']
}

export type CustomerResponse = {
  __typename?: 'CustomerResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Newly updated customer after a successful mutation */
  customer?: Maybe<Customer>
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
}

/** the coordinates at geographic coordinate system */
export type Geo = {
  __typename?: 'Geo'
  /** the latitude of a certain point on the surface of the Earth */
  lat: Scalars['String']
  /** the longitude of a certain point on the surface of the Earth */
  lng: Scalars['String']
}

export type GeoInput = {
  /** the latitude of a certain point on the surface of the Earth */
  lat: Scalars['String']
  /** the longitude of a certain point on the surface of the Earth */
  lng: Scalars['String']
}

export type Message = {
  __typename?: 'Message'
  /** the text of the message */
  content: Scalars['String']
  /** the unique identifier of the sender of the message */
  from: Scalars['String']
  /** the unique identifier of the message */
  id: Scalars['ID']
  /** the unique identifier of the recipient of the message */
  to: Scalars['String']
}

export type MessageInput = {
  /** the text of the message */
  content: Scalars['String']
  /** the unique identifier of the sender of the message */
  from: Scalars['String']
  /** the unique identifier of the recipient of the message */
  to: Scalars['String']
}

export type MessageResponse = {
  __typename?: 'MessageResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Newly created message after a successful mutation */
  output?: Maybe<Message>
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Mutation to add a specialist to the user recommendation list */
  addRecommendation: CustomerResponse
  /** Mutation to authorize an existing customer */
  authorizeCustomer: AuthenticationResponse
  /** Mutation to send a text message */
  createMessage: MessageResponse
  /** Mutation to increment the specialist's recommendations property */
  incrementRecommendations: SpecialistResponse
  /** Mutation to create a new customer */
  registerCustomer: AuthenticationResponse
  /** Mutation to create a new specialist */
  registerSpecialist: AuthenticationResponse
  /** Mutation to remove a specific customer */
  removeCustomer: CustomerResponse
  /** Mutation to remove a specific specialist */
  removeSpecialist: SpecialistResponse
}

export type MutationAddRecommendationArgs = {
  id: Scalars['ID']
}

export type MutationAuthorizeCustomerArgs = {
  input: UserInput
}

export type MutationCreateMessageArgs = {
  input: MessageInput
}

export type MutationIncrementRecommendationsArgs = {
  id: Scalars['ID']
}

export type MutationRegisterCustomerArgs = {
  input: CustomerInput
}

export type MutationRegisterSpecialistArgs = {
  input: SpecialistInput
}

export type MutationRemoveCustomerArgs = {
  id?: Maybe<Scalars['ID']>
}

export type MutationRemoveSpecialistArgs = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  /** Query to get the information about a specific customer */
  customerForProfile: Customer
  /** Query to get the specialist chat messages */
  messagesForChat: Array<Message>
  /** Query to get the customer's recommendation list */
  recommendationsForDashboard: Array<Specialist>
  /** Query to get the information about a specific specialist */
  specialistForAbout: Specialist
  /** Query to get a list of specialists for the dashboard page */
  specialistsForDashboard: Array<Specialist>
}

export type QueryCustomerForProfileArgs = {
  id: Scalars['ID']
}

export type QueryMessagesForChatArgs = {
  from: Scalars['String']
  to: Scalars['String']
}

export type QueryRecommendationsForDashboardArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QuerySpecialistForAboutArgs = {
  id: Scalars['ID']
}

export enum Role {
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  User = 'USER',
}

/** a member of a profession or any person who earns a living from a specified professional activity */
export type Specialist = User & {
  __typename?: 'Specialist'
  /** the place where the specialist works */
  address: Address
  /** an icon, graphic, or other image by which the specialist represents himself or herself */
  avatar?: Maybe<Scalars['String']>
  /** a business organization that makes, buys, or sells goods or provides services in exchange for money */
  company: Company
  /** the business email address of the specialist */
  email: Scalars['String']
  /** the unique identifier of the specialist */
  id: Scalars['ID']
  /** the first and last name of the specialist */
  name: Scalars['String']
  /** the business phone number of the specialist */
  phone?: Maybe<Scalars['String']>
  /** number of times the specialist has been recommended by customers */
  recommendations?: Maybe<Scalars['Int']>
  /** the permissions granted to the specialist */
  role: Role
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>
}

export type SpecialistInput = {
  /** the place where the specialist works */
  address: AddressInput
  /** an icon, graphic, or other image by which the specialist represents himself or herself */
  avatar?: Maybe<Scalars['String']>
  /** the company where the specialist works */
  company: CompanyInput
  /** the business email address of the specialist */
  email: Scalars['String']
  /** the first and last name of the specialist */
  name: Scalars['String']
  /** the business phone number of the specialist */
  phone?: Maybe<Scalars['String']>
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>
}

export type SpecialistResponse = {
  __typename?: 'SpecialistResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Newly updated specialist after a successful mutation */
  specialist?: Maybe<Specialist>
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
}

export type Subscription = {
  __typename?: 'Subscription'
  messageAdded?: Maybe<Message>
}

/** Basis interface for customer and specialist database types */
export type User = {
  /** the email address of the user */
  email: Scalars['String']
  /** the unique identifier of the user */
  id: Scalars['ID']
  /** the first and last name of the user */
  name: Scalars['String']
  /** the permissions granted to the user */
  role: Role
}

export type UserInput = {
  /** the email address of the user */
  email: Scalars['String']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>
  AddressInput: AddressInput
  AuthenticationResponse: ResolverTypeWrapper<AuthenticationResponse>
  AuthenticationResult: ResolverTypeWrapper<AuthenticationResult>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Company: ResolverTypeWrapper<Company>
  CompanyInput: CompanyInput
  Customer: ResolverTypeWrapper<Customer>
  CustomerInput: CustomerInput
  CustomerResponse: ResolverTypeWrapper<CustomerResponse>
  Geo: ResolverTypeWrapper<Geo>
  GeoInput: GeoInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Message: ResolverTypeWrapper<Message>
  MessageInput: MessageInput
  MessageResponse: ResolverTypeWrapper<MessageResponse>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Role: Role
  Specialist: ResolverTypeWrapper<Specialist>
  SpecialistInput: SpecialistInput
  SpecialistResponse: ResolverTypeWrapper<SpecialistResponse>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolversTypes['Customer'] | ResolversTypes['Specialist']
  UserInput: UserInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address
  AddressInput: AddressInput
  AuthenticationResponse: AuthenticationResponse
  AuthenticationResult: AuthenticationResult
  Boolean: Scalars['Boolean']
  Company: Company
  CompanyInput: CompanyInput
  Customer: Customer
  CustomerInput: CustomerInput
  CustomerResponse: CustomerResponse
  Geo: Geo
  GeoInput: GeoInput
  ID: Scalars['ID']
  Int: Scalars['Int']
  Message: Message
  MessageInput: MessageInput
  MessageResponse: MessageResponse
  Mutation: {}
  Query: {}
  Specialist: Specialist
  SpecialistInput: SpecialistInput
  SpecialistResponse: SpecialistResponse
  String: Scalars['String']
  Subscription: {}
  User: ResolversParentTypes['Customer'] | ResolversParentTypes['Specialist']
  UserInput: UserInput
}>

export type AuthDirectiveArgs = {
  requires?: Maybe<Array<Maybe<Role>>>
}

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']
> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  geo?: Resolver<Maybe<ResolversTypes['Geo']>, ParentType, ContextType>
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  suite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  zipcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthenticationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationResponse'] = ResolversParentTypes['AuthenticationResponse']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  user?: Resolver<
    Maybe<ResolversTypes['AuthenticationResult']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthenticationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationResult'] = ResolversParentTypes['AuthenticationResult']
> = ResolversObject<{
  expiresAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userInfo?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CompanyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']
> = ResolversObject<{
  bs?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  catchPhrase?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CustomerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']
> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
  specialists?: Resolver<
    Array<Maybe<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CustomerResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CustomerResponse'] = ResolversParentTypes['CustomerResponse']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Geo'] = ResolversParentTypes['Geo']
> = ResolversObject<{
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lng?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MessageResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  output?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  addRecommendation?: Resolver<
    ResolversTypes['CustomerResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAddRecommendationArgs, 'id'>
  >
  authorizeCustomer?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationAuthorizeCustomerArgs, 'input'>
  >
  createMessage?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMessageArgs, 'input'>
  >
  incrementRecommendations?: Resolver<
    ResolversTypes['SpecialistResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationIncrementRecommendationsArgs, 'id'>
  >
  registerCustomer?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterCustomerArgs, 'input'>
  >
  registerSpecialist?: Resolver<
    ResolversTypes['AuthenticationResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterSpecialistArgs, 'input'>
  >
  removeCustomer?: Resolver<
    ResolversTypes['CustomerResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCustomerArgs, never>
  >
  removeSpecialist?: Resolver<
    ResolversTypes['SpecialistResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSpecialistArgs, 'id'>
  >
}>

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  customerForProfile?: Resolver<
    ResolversTypes['Customer'],
    ParentType,
    ContextType,
    RequireFields<QueryCustomerForProfileArgs, 'id'>
  >
  messagesForChat?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    RequireFields<QueryMessagesForChatArgs, 'from' | 'to'>
  >
  recommendationsForDashboard?: Resolver<
    Array<ResolversTypes['Specialist']>,
    ParentType,
    ContextType,
    RequireFields<QueryRecommendationsForDashboardArgs, never>
  >
  specialistForAbout?: Resolver<
    ResolversTypes['Specialist'],
    ParentType,
    ContextType,
    RequireFields<QuerySpecialistForAboutArgs, 'id'>
  >
  specialistsForDashboard?: Resolver<
    Array<ResolversTypes['Specialist']>,
    ParentType,
    ContextType
  >
}>

export type SpecialistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Specialist'] = ResolversParentTypes['Specialist']
> = ResolversObject<{
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  recommendations?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SpecialistResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpecialistResponse'] = ResolversParentTypes['SpecialistResponse']
> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  specialist?: Resolver<
    Maybe<ResolversTypes['Specialist']>,
    ParentType,
    ContextType
  >
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  messageAdded?: SubscriptionResolver<
    Maybe<ResolversTypes['Message']>,
    'messageAdded',
    ParentType,
    ContextType
  >
}>

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Customer' | 'Specialist',
    ParentType,
    ContextType
  >
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>
}>

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>
  AuthenticationResponse?: AuthenticationResponseResolvers<ContextType>
  AuthenticationResult?: AuthenticationResultResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Customer?: CustomerResolvers<ContextType>
  CustomerResponse?: CustomerResponseResolvers<ContextType>
  Geo?: GeoResolvers<ContextType>
  Message?: MessageResolvers<ContextType>
  MessageResponse?: MessageResponseResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Specialist?: SpecialistResolvers<ContextType>
  SpecialistResponse?: SpecialistResponseResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>
}>
