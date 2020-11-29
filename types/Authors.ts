/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Authors
// ====================================================

export interface Authors_authors {
  __typename: "author";
  id: number;
  name: string;
  image: string;
}

export interface Authors {
  /**
   * fetch data from the table: "author"
   */
  authors: Authors_authors[];
}
