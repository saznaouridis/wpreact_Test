import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
import TablePosts from "./Table";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
      TypographyStyle: {
        primary: teal,
      },
    },
  },
}));
const PageViewPosts = (props) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid>
        <Typography
          component="div"
          align="center"
          color="primary"
          className={classes.TypographyStyle}
          style={{ fontSize: 30 }}
        >
          Λίστα Δημοσιεύσεων
          <TablePosts editRowPost={props.editRowPost} />
        </Typography>
      </Grid>
    </Grid>
  );
};
export default PageViewPosts;
