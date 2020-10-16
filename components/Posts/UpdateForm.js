import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updatePost } from "../DatabaseCrud/PostCrud";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
const UpdateForm = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [post, setPost] = useState(props.curPost);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isMountedRef = useRef(null);
  const regex = /(<([^>]+)>)/gi;  

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    if (isMountedRef.current) {
      setTitle(props.curPost.title.rendered);
      setContent(props.curPost.content.rendered);
    }

    return () => (isMountedRef.current = false);
  }, []);

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
  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (!title || !content) {
              alert("Invalid Input");
            } else {
              await updatePost(post.id, title, content);
              //updatePost(post.id, title, content);
              console.log("ok");
              props.setEditPost(false);

              await getPostData();

              history.push("/post/view");
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
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
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
              label="Περιγραφή"
              fullWidth
              variant="outlined"
              placeholder="Συμπληρώστε Περιγραφή"
              type="text"
              name="Περιγραφή"
              value={content}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
            />
          </Grid> */}

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              ΕΝΗΜΕΡΩΣΤΕ ΔΗΜΟΣΙΕΥΣΗ
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.setEditPost(false);
                //props.getPostData();
                history.push("/post/view");
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
