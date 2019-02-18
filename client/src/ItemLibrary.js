import React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid
} from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    width: 250,
    height: 200,
    margin: 5,
    // border: '2px solid #1B3039'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginbottom: 12,
  },
  description: {
    width: 300,
  }
}

function SimpleCard(props) {
  const {classes} = props;
  const bull = <span className={classes.bullet}>.</span>

  return(
    <div className="itemLibrary">
      <Grid container spacing={32}>
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
            return data.items.map(({ id, title, description }) => (
              <div key={id}>
                <Grid item >
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography className={classes.title} gutterBottom>
                        I T E M :
                      </Typography>
                      <Typography variant="h5" component="h2">
                      {title} 
                      </Typography>
                      <br />

                      <Typography component="p" className={classes.description}>
                      {description}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="secondary" size="small">borrow</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </div>
            ));
          }}
        </Query>
      </Grid>
    </div>
  );
}

SimpleCard.PropTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);


// const ItemLibrary = () => (
//   <div>
//     <h1>library item</h1>
//     <Query
//       query={gql`
//           query {
//             items {
//               id
//               title
//               description
//               tags {
//                 id
//                 title
//               }
//             }
//           }
//         `}
//     >
//       {({ loading, error, data }) => {
//         if (loading) return <p>Loading...</p>;
//         if (error) {
//           console.log(error);
//           return <p>Test There was an error</p>
//         }
//         console.log(data);
//         return data.items.map(({ id, title, description }) => (
//           <div key={id}>
//             <p>Item {id}: {title}</p>
//           </div>
//         ));
//       }}
//     </Query>
//   </div>
// )

// export default ItemLibrary;