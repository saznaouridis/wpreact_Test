import React from "react";
import UpdateForm from "./UpdateForm";
import InsertForm from "./InsertForm";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

function Copyright() {
  return (
    <Typography
      component={"span"}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://wpchamber.knowledge.gr/wp-admin/index.php/"
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 1200,
  },
}));

const PageAddMedias = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3}>
        {}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <div className={classes.root}>
              <Grid
                item
                xs={12}
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {props.editMedia ? (
                  <Grid item>
                    <Typography
                      variant="body2"
                      align="center"
                      color="primary"
                      className={classes.TypographyStyle}
                      style={{ fontSize: 25 }}
                    >
                      Επεξεργασία Εικόνας
                    </Typography>
                    <UpdateForm
                      setEditMedia={props.setEditMedia}
                      curMedia={props.curMedia}
                    />
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography
                      variant="body2"
                      align="center"
                      color="primary"
                      className={classes.TypographyStyle}
                      style={{ fontSize: 25 }}
                    >
                      Προθέστε Εικόνα
                    </Typography>
                    <InsertForm />
                  </Grid>
                )}
              </Grid>
            </div>
          </Paper>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PageAddMedias;
