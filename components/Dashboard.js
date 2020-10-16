import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
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
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
  fixedHeight: {
    height: 1200,
  },
}));

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
};
const PageHome = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3}>
        {}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <HomeIcon color="primary" style={{ fontSize: 50 }} />
              <Typography
                align="center"
                color="primary"
                className={classes.TypographyStyle}
                style={{ fontSize: 20 }}
              >
                Welcome to Home Page
                
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        {}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            
          </Paper>
        </Grid>
        {}
        <Grid item xs={12}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default PageHome;
