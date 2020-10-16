import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PagesIcon from "@material-ui/icons/Pages";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import BackupIcon from "@material-ui/icons/Backup";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(1),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
}));
const ListItems = () => {
  const classes = useStyles();
  const history = useHistory({ forceRefresh: true });
  //const history = createBrowserHistory();
  const [openOrg1, setOrg1] = React.useState(false);
  const [openOrg2, setOrg2] = React.useState(false);
  const [openOrg3, setOrg3] = React.useState(false);
  const [openOrg4, setOrg4] = React.useState(false);
  const [openOrg5, setOrg5] = React.useState(false);
  const [openOrg6, setOrg6] = React.useState(false);
  const [openOrg7, setOrg7] = React.useState(false);

  const handleOrg1Click = () => {
    setOrg1(!openOrg1);
  };
  const handleOrg2Click = () => {
    setOrg2(!openOrg2);
  };
  const handleOrg3Click = () => {
    setOrg3(!openOrg3);
  };
  const handleOrg4Click = () => {
    setOrg4(!openOrg4);
  };
  const handleOrg5Click = () => {
    setOrg5(!openOrg5);
  };
  const handleOrg6Click = () => {
    setOrg6(!openOrg6);
  };
  const handleOrg7Click = () => {
    setOrg7(!openOrg7);
  };

  return (
    <div>
      <ListItem button onClick={handleOrg1Click}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Πίνακας" />
        {openOrg1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/dashboard")}>
                <HomeIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/dashboard")}>
              <ListItemText primary="Αρχική" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleOrg2Click}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Μενού" />
        {openOrg2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/menu/view")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/menu/view")}>
              <ListItemText primary="Σύνολο Μενού" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/menu/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/menu/add")}>
              <ListItemText primary="Προσθήκη Μενού" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleOrg3Click}>
        <ListItemIcon>
          <PagesIcon />
        </ListItemIcon>
        <ListItemText primary="Σελίδες" />
        {openOrg3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/page/view")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/page/view")}>
              <ListItemText primary="Σύνολο Σελίδων" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/page/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/page/add")}>
              <ListItemText primary="Προσθήκη Σελίδας" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleOrg4Click}>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Δημοσιεύσεις" />
        {openOrg4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/post/view")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/post/view")}>
              <ListItemText primary="Σύνολο Δημοσιέυσεων" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/post/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/post/add")}>
              <ListItemText primary="Προσθήκη Δημοσίευσης" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleOrg5Click}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Κατηγορίες" />
        {openOrg5 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/category/view")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/category/view")}>
              <ListItemText primary="Σύνολο Κατηγοριών" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/category/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/category/add")}>
              <ListItemText primary="Προσθήκη Κατηγορίας" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleOrg6Click}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Eγγραφα" />
        {openOrg6 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/doc/post")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/doc/post")}>
              <ListItemText primary="Σύνολο Εγγράφων" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/doc/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/doc/add")}>
              <ListItemText primary="Προσθήκη Εγγράφων" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleOrg7Click}>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary="Αρχεία" />
        {openOrg7 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openOrg7} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/media/view")}>
                <TrendingFlatIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/media/view")}>
              <ListItemText primary="Σύνολο Αρχείων" />
            </ListItem>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListItem button onClick={() => history.push("/media/add")}>
                <AddIcon />
              </ListItem>
            </ListItemIcon>
            <ListItem button onClick={() => history.push("/media/add")}>
              <ListItemText primary="Φόρτωση Αρχείων" />
            </ListItem>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};
export default ListItems;
