import type {GraphQLResolveInfo} from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>}
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  {[P in K]-?: NonNullable<T[P]>}
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
  geo?: Maybe<Geo>
  street?: Maybe<Scalars['String']>
  suite?: Maybe<Scalars['String']>
  zipcode?: Maybe<Scalars['String']>
}

export type Company = {
  __typename?: 'Company'
  /** the sector of the economy the specialist operates in */
  bs: Scalars['String']
  /** an expression consisting of one or more words slogan a favorite saying of a sector */
  catchPhrase?: Maybe<Scalars['String']>
  /** the name by which people know the business of the specialist */
  name: Scalars['String']
}

/** the coordinates at geographic coordinate system */
export type Geo = {
  __typename?: 'Geo'
  lat: Scalars['String']
  lng: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Mutation to increment the specialist's recommendations property */
  incrementRecommendations: IncrementRecommendationsResponse
}

export type MutationIncrementRecommendationsArgs = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  /** Query to get the information about a specific specialist */
  specialistForAbout: Specialist
  /** Query to get a list of specialists for the dashboard page */
  specialistsForDashboard: Array<Specialist>
}

export type QuerySpecialistForAboutArgs = {
  id: Scalars['ID']
}

/** a member of a profession or any person who earns a living from a specified professional activity */
export type Specialist = {
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
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>
}

export type IncrementRecommendationsResponse = {
  __typename?: 'incrementRecommendationsResponse'
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int']
  /** Human-readable message for the UI */
  message: Scalars['String']
  /** Newly updated specialist after a successful mutation */
  specialist?: Maybe<Specialist>
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean']
}

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
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Company: ResolverTypeWrapper<Company>
  Geo: ResolverTypeWrapper<Geo>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Specialist: ResolverTypeWrapper<Specialist>
  String: ResolverTypeWrapper<Scalars['String']>
  incrementRecommendationsResponse: ResolverTypeWrapper<IncrementRecommendationsResponse>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address
  Boolean: Scalars['Boolean']
  Company: Company
  Geo: Geo
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  Query: {}
  Specialist: Specialist
  String: Scalars['String']
  incrementRecommendationsResponse: IncrementRecommendationsResponse
}

export type AddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']
> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  geo?: Resolver<Maybe<ResolversTypes['Geo']>, ParentType, ContextType>
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  suite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  zipcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CompanyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']
> = {
  bs?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  catchPhrase?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Geo'] = ResolversParentTypes['Geo']
> = {
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  lng?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  incrementRecommendations?: Resolver<
    ResolversTypes['incrementRecommendationsResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationIncrementRecommendationsArgs, 'id'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
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
}

export type SpecialistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Specialist'] = ResolversParentTypes['Specialist']
> = {
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
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type IncrementRecommendationsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['incrementRecommendationsResponse'] = ResolversParentTypes['incrementRecommendationsResponse']
> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  specialist?: Resolver<
    Maybe<ResolversTypes['Specialist']>,
    ParentType,
    ContextType
  >
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>
  Company?: CompanyResolvers<ContextType>
  Geo?: GeoResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Specialist?: SpecialistResolvers<ContextType>
  incrementRecommendationsResponse?: IncrementRecommendationsResponseResolvers<ContextType>
}
