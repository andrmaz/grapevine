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
  geo?: Maybe<GeoInput>;
  /** the name of the street to which the address is located */
  street?: Maybe<Scalars['String']>;
  /**  the location of a business within a shopping mall or office building */
  suite?: Maybe<Scalars['String']>;
  /** the postal code to which the address is located */
  zipcode?: Maybe<Scalars['String']>;
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
  /** the permissions granted to the customer */
  role: Role;
  /** a list of specialists who have been recommended by the customer */
  specialists: Array<Maybe<Scalars['ID']>>;
};

export type CustomerInput = {
  /** the place where the customer lives */
  address?: Maybe<AddressInput>;
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

export type Mutation = {
  __typename?: 'Mutation';
  addRecommendation: CustomerResponse;
  /** Mutation to authorize an existing customer */
  authorizeCustomer: AuthenticationResponse;
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
  input?: Maybe<UserInput>;
};


export type MutationIncrementRecommendationsArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterCustomerArgs = {
  input?: Maybe<CustomerInput>;
};


export type MutationRegisterSpecialistArgs = {
  input?: Maybe<SpecialistInput>;
};


export type MutationRemoveCustomerArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationRemoveSpecialistArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Query to get the information about a specific customer */
  customerForProfile: Customer;
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


export type QueryRecommendationsForDashboardArgs = {
  id?: Maybe<Scalars['ID']>;
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
  /** the permissions granted to the specialist */
  role: Role;
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>;
};

export type SpecialistInput = {
  /** the place where the specialist works */
  address: AddressInput;
  /** an icon, graphic, or other image by which the specialist represents himself or herself */
  avatar?: Maybe<Scalars['String']>;
  /** the company where the specialist works */
  company: CompanyInput;
  /** the business email address of the specialist */
  email: Scalars['String'];
  /** the first and last name of the specialist */
  name: Scalars['String'];
  /** the business phone number of the specialist */
  phone?: Maybe<Scalars['String']>;
  /** a central location of web pages that are related and accessed using a browser */
  website?: Maybe<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
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
  /** the first and last name of the user */
  name: Scalars['String'];
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
  role: string,
  specialists: Array<Maybe<string>>,
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
  role: string,
  website?: Maybe<string>,
};
