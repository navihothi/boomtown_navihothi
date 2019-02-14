import React from 'react'
import { Link } from 'react-router-dom'
import gql from "graphql-tag";

import { Query } from "react-apollo";


const MyItems = () => (
  <div>
    <h1>my items</h1>
      <Query
        query={gql`
          query {
            viewer {
              id
              username
              items {
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
          //console.log(data);
          return data.viewer.items.map(({id, title}) => (
            <div key={id}>
              <p>Item {id}: {title}</p>
            </div>
          ));
        }}
      </Query>
  </div>
);

export default MyItems;