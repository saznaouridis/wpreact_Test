import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { deleteCategory } from "../DatabaseCrud/CategoryCrud";
import Fab from "@material-ui/core/Fab";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "moment/locale/el";

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
  margin: {
    margin: theme.spacing(1),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.default,
    color: theme.palette.common.black,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableCategories = (props) => {
  const initialState = { id: null, name: "", description: "", slug: "" };
  const [categories, setCategories] = useState([]);
  const [curCategory, setCurCategory] = useState(initialState);
  const [editCategory, setEditCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCategoryData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/categories"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setCategories(data);
    setLoading(false);
    return;
  };
  useEffect(() => {
    getCategoryData();
  }, []);
  const editRowCategory = async (category) => {
    setEditCategory(true);
    setCurCategory(category);
  };

  const history = useHistory();
  const classes = useStyles();
  const regex = /(<([^>]+)>)/gi;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <TableContainer className={classes.Paper}>
              <Table aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Όνομα</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Περιγραφή
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Slug
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Επεξεργασία{" "}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Διαγραφή
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Fragment key={category.id}>
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            {category.name.replace(regex, "")}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {category.description}
                          </StyledTableCell>
                          {/* <StyledTableCell
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html: category.description,
                            }}
                          /> */}
                          <StyledTableCell align="center">
                            {category.slug.replace(regex, "")}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Fab
                              color="default"
                              aria-label="edit"
                              className={classes.margin}
                              type="submit"
                              size="small"
                              onClick={() => {
                                props.editRowCategory(category);
                                history.push("/category/add");
                              }}
                            >
                              <EditTwoToneIcon />
                            </Fab>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Fab
                              color="default"
                              aria-label="delete"
                              className={classes.margin}
                              type="submit"
                              size="small"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (
                                    window.confirm(
                                      "Are you sure you wish to delete this item?"
                                    )
                                  )
                                    await deleteCategory(category.id);
                                  console.log("ok");
                                  await getCategoryData();
                                  console.log("ok");
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            >
                              <DeleteTwoToneIcon />
                            </Fab>
                          </StyledTableCell>
                        </StyledTableRow>
                      </Fragment>
                    ))
                  ) : (
                    <Typography component="tr" variant="body2" colSpan={6}>
                      <td>There are no Categories.Please insert a Category.</td>
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Box m={1} pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default TableCategories;
