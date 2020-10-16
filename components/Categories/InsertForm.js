import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addCategory } from "../DatabaseCrud/CategoryCrud";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCategoryData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/categories"
    );
    const data = await res.json();
    setCategories(data);
    setLoading(false);
    return;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !slug) {
        alert("Invalid Input");
      } else {
        await addCategory(name, description, slug);
        console.log("ok");
        //setLoading(true);

        await getCategoryData();
        history.push("/category/view");
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
              label="Όνομα"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Συμπληρώστε Όνομα"
              type="text"
              name="Όνομα"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          {/* <Grid item xs={12}>
            <CKEditor
              config={{ placeholder: "Συμπληρώστε Περιγραφή" }}
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();

                setDescription(data);
              }}
            />
             </Grid> */}
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Περιγραφή"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Περιγραφή"
              type="text"
              name="Περιγραφή"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Προσθεστε Κατηγορια
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/category/view");
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
