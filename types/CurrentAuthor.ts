/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentAuthor
// ====================================================

export interface CurrentAuthor_currentAuthor {
  __typename: "author";
  id: number;
  name: string;
  image: string;
}

export interface CurrentAuthor {
  /**
   * fetch data from the table: "author" using primary key columns
   */
  currentAuthor: CurrentAuthor_currentAuthor | null;
}

export interface CurrentAuthorVariables {
  id: number;
}
