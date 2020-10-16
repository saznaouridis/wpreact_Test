import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updatePage } from "../DatabaseCrud/PageCrud";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles((theme) => ({
  root: {
    "& >svg ": {
      margin: theme.spacing(2),
      width: "25ch",
      TypographyStyle: {
        color: "blue",
      },
    },
  },
}));
const UpdateForm = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(props.curPage);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const isMountedRef = useRef(null);
  const regex = /(<([^>]+)>)/gi;
 

  const getPageData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/pages"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setPages(data);
    setLoading(false);

    return;
  };

  useEffect(() => {
    let isMounted = true;
    getPageData().then(data =>{})
    if (isMounted) {
      setTitle(props.curPage.title.rendered);
      setContent(props.curPage.content.rendered);
      setSlug(props.curPage.slug);
    }
     return () => { isMounted = false };
  }, []);

  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!title || !content || !slug) {
              alert("Invalid Input");
            } else {
              await updatePage(page.id, title, content, slug);
              console.log("ok");
              props.setEditPage(false);

              await getPageData();

              history.push("/page/view");
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Τίτλος"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Συμπληρώστε Τίτλο"
              type="text"
              name="Τίτλος"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Slug"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε slug"
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => {
                e.preventDefault();
                setSlug(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CKEditor
              config={{ placeholder: "Συμπληρώστε Περιεχόμενο" }}
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();

                setContent(data);
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Περιεχόμενο"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Περιεχόμενο"
              type="text"
              name="Περιεχόμενο"
              value={content}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
            /> */}

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Ενημερώστε Σελίδα
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.setEditPage(false);
                //props.getPageData();
                history.push("/page/view");
              }}
              className="button muted-button"
            >
              ΑΚΥΡΩΣΗ
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default UpdateForm;
