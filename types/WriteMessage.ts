/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WriteMessage
// ====================================================

export interface WriteMessage_insert_message_one {
  __typename: "message";
  id: number;
}

export interface WriteMessage {
  /**
   * insert a single row into the table: "message"
   */
  insert_message_one: WriteMessage_insert_message_one | null;
}

export interface WriteMessageVariables {
  text: string;
  authorId: number;
}
