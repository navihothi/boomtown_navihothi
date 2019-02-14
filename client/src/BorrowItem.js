import React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";

import { Query } from "react-apollo";

const BorrowItem = () => (
  <div>
    <h1>borrow an item</h1>
      <Query
          query={gql`
          query {
            viewer {
              borrowed {
                id
                title
                description
              }
            }
          }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>Test There was an error</p>
            }
            console.log(data);
            return data.viewer.borrowed.map(({id, title, description}) => (
              <div key={id}>
                <p>Item {id}: {title} AND {description}</p>
              </div>
            ));
          }}
        </Query>
    </div>
)

export default BorrowItem;