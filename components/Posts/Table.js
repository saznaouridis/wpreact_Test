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
import { deletePost } from "../DatabaseCrud/PostCrud";
import Fab from "@material-ui/core/Fab";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import moment from "moment";
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

const TablePosts = (props) => {
  const initialState = { id: null, title: "", content: "" };
  const [posts, setPosts] = useState([]);
  const [curPost, setCurPost] = useState(initialState);
  const [editPost, setEditPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const getPostData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/posts"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
    return;
  };
  useEffect(() => {
    getPostData();
  }, []);
  const editRowPost = async (post) => {
    setEditPost(true);
    setCurPost(post);
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
            <TableContainer className={classes.paper}>
              <Table aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Τίτλος</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Περιεχόμενο
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      fontWeight="fontWeightBold"
                      m={1}
                    >
                      Ημερομηνία
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
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <Fragment key={post.id}>
                        <StyledTableRow>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ verticalAlign: "top" }}
                          >
                            {post.title.rendered.replace(regex, "")}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            style={{ verticalAlign: "top" }}
                            dangerouslySetInnerHTML={{
                              __html: post.content.rendered,
                            }}
                          />
                          <StyledTableCell
                            align="center"
                            style={{ verticalAlign: "top" }}
                          >
                            {moment(post.date.getdate)
                              .locale("el")
                              .format("dddd, MMMM Do YYYY, h:mm:ss a")}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                            style={{ verticalAlign: "top" }}
                          >
                            <Fab
                              color="default"
                              aria-label="edit"
                              className={classes.margin}
                              type="submit"
                              size="small"
                              style={{ verticalAlign: "top" }}
                              onClick={() => {
                                props.editRowPost(post);
                                history.push("/post/add");
                              }}
                            >
                              <EditTwoToneIcon />
                            </Fab>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                            style={{ verticalAlign: "top" }}
                          >
                            <Fab
                              style={{ verticalAlign: "top" }}
                              color="default"
                              aria-label="edit"
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
                                    await deletePost(post.id);
                                  console.log("ok");
                                  await getPostData();
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
export default TablePosts;
