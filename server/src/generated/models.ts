export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
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

export type AddressInput = {
  city: Scalars['String'];
  geo?: Maybe<GeoInput>;
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

/** individuals and businesses that purchase goods and services from another business */
export type Customer = {
  __typename?: 'Customer';
  /** the place where the customer lives */
  address?: Maybe<Address>;
  /** the email address of the customer */
  email: Scalars['String'];
  /** the unique identifier of the customer */
  id: Scalars['ID'];
  /** the first and last name of the customer */
  name: Scalars['String'];
  /** a list of specialists who have been recommended by the customer */
  specialists?: Maybe<Array<Maybe<Specialist>>>;
};

export type CustomerInput = {
  address?: Maybe<AddressInput>;
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CustomerResponse = {
  __typename?: 'CustomerResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Newly updated specialist after a successful mutation */
  customer?: Maybe<Customer>;
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

/** the coordinates at geographic coordinate system */
export type Geo = {
  __typename?: 'Geo';
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type GeoInput = {
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type IncrementRecommendationsResponse = {
  __typename?: 'IncrementRecommendationsResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Newly updated specialist after a successful mutation */
  specialist?: Maybe<Specialist>;
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to increment the specialist's recommendations property */
  incrementRecommendations: IncrementRecommendationsResponse;
  /** Mutation to create a new customer */
  registerCustomer: CustomerResponse;
};


export type MutationIncrementRecommendationsArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterCustomerArgs = {
  data?: Maybe<CustomerInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Query to get the information about a specific customer */
  customerForProfile: Customer;
  /** Query to get the information about a specific specialist */
  specialistForAbout: Specialist;
  /** Query to get a list of specialists for the dashboard page */
  specialistsForDashboard: Array<Specialist>;
};


export type QueryCustomerForProfileArgs = {
  id: Scalars['ID'];
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
  /** number of times the specialist has been recommended by customers */
  recommendations?: Maybe<Scalars['Int']>;
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>;
};

import { ObjectId } from 'mongodb';
export type AddressDbObject = {
  city: string,
  geo?: Maybe<GeoDbObject>,
  street?: Maybe<string>,
  suite?: Maybe<string>,
  zipcode?: Maybe<string>,
};

export type CompanyDbObject = {
  bs: string,
  catchPhrase?: Maybe<string>,
  name: string,
};

export type CustomerDbObject = {
  address?: Maybe<AddressDbObject>,
  email: string,
  _id: ObjectId,
  name: string,
  specialists?: Maybe<Array<Maybe<SpecialistDbObject['_id']>>>,
};

export type GeoDbObject = {
  lat: string,
  lng: string,
};

export type SpecialistDbObject = {
  address: AddressDbObject,
  avatar?: Maybe<string>,
  company: CompanyDbObject,
  email: string,
  _id: ObjectId,
  name: string,
  phone?: Maybe<string>,
  website?: Maybe<string>,
};