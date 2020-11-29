/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Messages
// ====================================================

export interface Messages_recent_author {
  __typename: "author";
  id: number;
  name: string;
  image: string;
}

export interface Messages_recent {
  __typename: "recent";
  id: number | null;
  text: string | null;
  /**
   * An object relationship
   */
  author: Messages_recent_author | null;
}

export interface Messages {
  /**
   * fetch data from the table: "recent"
   */
  recent: Messages_recent[];
}
