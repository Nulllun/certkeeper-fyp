import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Datetime from "react-datetime";
import courseJsonData from "../../json/course.json";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";

// material-ui core components
import Paper from "@material-ui/core/Paper";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ViewAllCourse() {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <h4>Display all course info and can edit</h4>
      </Paper>
    </div>
  );
}
