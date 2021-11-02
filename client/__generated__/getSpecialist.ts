/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSpecialist
// ====================================================

export interface getSpecialist_specialistForAbout_address {
  city: string;
}

export interface getSpecialist_specialistForAbout_company {
  /**
   * the name by which people know the business of the specialist
   */
  name: string;
  /**
   * the sector of the economy the specialist operates in
   */
  bs: string;
}

export interface getSpecialist_specialistForAbout {
  /**
   * the unique identifier of the specialist
   */
  id: string;
  /**
   * the first and last name of the specialist
   */
  name: string;
  /**
   * the business email address of the specialist
   */
  email: string;
  /**
   * the place where the specialist works
   */
  address: getSpecialist_specialistForAbout_address;
  /**
   * a business organization that makes, buys, or sells goods or provides services in exchange for money
   */
  company: getSpecialist_specialistForAbout_company;
}

export interface getSpecialist {
  /**
   * Query to get the information about a specific specialist
   */
  specialistForAbout: getSpecialist_specialistForAbout;
}

export interface getSpecialistVariables {
  id: string;
}
