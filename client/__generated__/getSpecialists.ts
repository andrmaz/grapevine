/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSpecialists
// ====================================================

export interface getSpecialists_specialistsForDashboard_address {
  city: string;
}

export interface getSpecialists_specialistsForDashboard_company {
  /**
   * the sector of the economy the specialist operates in
   */
  bs: string;
}

export interface getSpecialists_specialistsForDashboard {
  /**
   * the unique identifier of the specialist
   */
  id: string;
  /**
   * the first and last name of the specialist
   */
  name: string;
  /**
   * the place where the specialist works
   */
  address: getSpecialists_specialistsForDashboard_address;
  /**
   * a business organization that makes, buys, or sells goods or provides services in exchange for money
   */
  company: getSpecialists_specialistsForDashboard_company;
}

export interface getSpecialists {
  /**
   * Query to get a list of specialists for the dashboard page
   */
  specialistsForDashboard: getSpecialists_specialistsForDashboard[];
}
