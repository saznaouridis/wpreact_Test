import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateMedia } from "../DatabaseCrud/MediaCrud";
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
  const [media, setMedia] = useState(props.curMedia);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [alt_text, setAlt_text] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const isMountedRef = useRef(null);
  const regex = /(<([^>]+)>)/gi;

  const getMediaData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/media"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setMedias(data);
    setLoading(false);
    return;
  };
  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    if (isMountedRef.current) {
      setTitle(props.curMedia.title.rendered);
      setAlt_text(props.curMedia.alt_text.replace(regex, ""));
      setCaption(props.curMedia.caption.rendered.replace(regex, ""));
      setDescription(props.curMedia.description.rendered.replace(/<img .*?>/g,""));
    }

    return () => (isMountedRef.current = false);
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
            if (!title || !alt_text || !caption || !description) {
              alert("Invalid Input");
            } else {
              await updateMedia(
                media.id,
                title,
                alt_text,
                caption,
                description
              );
              console.log("ok");
              props.setEditMedia(false);

              await getMediaData();

              history.push("/media/view");
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
              label="Κείμενο"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Κείμενο"
              type="text"
              name="Κείμενο"
              value={alt_text}
              onChange={(e) => {
                e.preventDefault();
                setAlt_text(e.target.value);
              }}
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
              onChange={(e) => {
                e.preventDefault();
                setCaption(e.target.value);
              }}
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
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
            />
          </Grid> */}
          <Grid item xs={12}>
            <img
              dpr="auto"
              responsive="true"
              width="auto"
              height="auto"
              crop="scale"
              angle="20"
              src={media.guid.rendered.replace(regex, "")}
              mode="fit"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Ενημερώστε Εικόνα
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.setEditMedia(false);
                //props.getPageData();
                history.push("/media/view");
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
