import gql from "graphql-tag";

export const todoItemsQuery = gql`
  {
    todoItems @client {
      id
      text
      done
    }
  }
`;
