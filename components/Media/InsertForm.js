import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addMedia } from "../DatabaseCrud/MediaCrud";
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
  const initialState = {
    selectedFile: null,
  };
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [alt_text, setAlt_text] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState(initialState);
  const history = useHistory();

  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMediaData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/media"
    );
    const data = await res.json();
    setMedias(data);
    setLoading(false);
    return;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !alt_text || !caption || !description) {
        alert("Invalid Input");
      } else {
        await addMedia(
          title,
          alt_text,
          caption,
          description,
          state.selectedFile
        );
        console.log("ok");
        //setLoading(true);

        await getMediaData();
        history.push("/media/view");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fileSelectedHandler = (event) => {
    setState({ selectedFile: event.target.files[0] });
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
              name="Τίτλο"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Κείμενο"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Κείμενο"
              type="text"
              name="Κείμενο"
              value={alt_text}
              onChange={(e) => setAlt_text(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Λεζάντα"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Λεζάντα"
              type="text"
              name="Λεζάντα"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CKEditor
              config={{ placeholder: "Συμπληρώστε Περιγραφή" }}
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();

                setDescription(data);
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              color="primary"
              size="small"
            >
              Επιλέξτε Αρχείο
              <input
                type="file"
                onChange={fileSelectedHandler}
                style={{ display: "none" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Φορτώστε Αρχείο
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
