import React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";

import { Query } from "react-apollo";

const ItemLibrary = () => (
  <div>
   <h1>library item</h1>
      <Query
        query={gql`
          query {
            items {
              id
              title
              description
              tags {
                id
                title
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
          return data.items.map(({id, title, description}) => (
            <div key={id}>
              <p>Item {id}: {title}</p>
            </div>
          ));
        }}
      </Query>
  </div>
)

export default ItemLibrary;