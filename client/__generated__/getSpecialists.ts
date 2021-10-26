/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSpecialists
// ====================================================

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
   * the name by which people know the business of the specialist
   */
  company: string;
  /**
   * the sector of the economy the specialist operates in
   */
  industry: string;
  /**
   * An icon, graphic, or other image by which the specialist represents himself or herself
   */
  avatar: string;
  /**
   * the business email address of the specialist
   */
  email: string;
  /**
   * the place where the specialist works
   */
  location: string;
}

export interface getSpecialists {
  /**
   * Query to get a list of specialists for the dashboard page
   */
  specialistsForDashboard: getSpecialists_specialistsForDashboard[];
}
