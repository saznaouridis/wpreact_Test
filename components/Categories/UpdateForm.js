import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateCategory } from "../DatabaseCrud/CategoryCrud";
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
  const [category, setCategory] = useState(props.curCategory);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setName(props.curCategory.name);
    setDescription(props.curCategory.description);
    setSlug(props.curCategory.slug);
  }, []);

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
  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!name || !description || !slug) {
              alert("Invalid Input");
            } else {
              await updateCategory(category.id, name, description, slug);
              console.log("ok");
              props.setEditCategory(false);

              await getCategoryData();

              history.push("/category/view");
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
              label="Όνομα"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Συμπληρώστε Όνομα"
              type="text"
              name="Όνομα"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
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
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Ενημερώστε Κατηγορία
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.setEditCategory(false);
                //props.getCategoryData();
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
export default UpdateForm;
