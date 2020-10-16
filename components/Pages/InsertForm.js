import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPage } from "../DatabaseCrud/PageCrud";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
      textAlign: "center",
      TypographyStyle: {
        color: "blue",
      },
    },
  },
}));

const InsertForm = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const history = useHistory();

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPageData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/pages"
    );
    const data = await res.json();
    setPages(data);
    setLoading(false);
    return;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content || !slug) {
        alert("Invalid Input");
      } else {
        await addPage(title, content, slug);
        console.log("ok");
        //setLoading(true);

        await getPageData();
        history.push("/page/view");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Slug"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Slug"
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid> */}

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Προσθεστε Σελίδα
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
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
export default InsertForm;
