import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import { isEmpty } from "../Checks";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  headingdiv: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    padding: 3,
    border: "1 solid #000000",
  },
  maindiv: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",

    padding: 20,
    marginTop: 20,
    width: 600,
    backgroundColor: "#ecf0f1",
  },
  input: {
    display: "none",
  },
  large: {
    width: 70,
    height: 70,
    margin: 5,
    padding: 3,
  },
}));

export default function StateCityArea() {
  const classes = useStyles();
  const [getStateName, setStateName] = useState("");
  const [getErrorPic, setErrorPic] = useState({ sn: "tp.png" });
  const [getMessage, setMessage] = useState("");

  const handleSubmit = async () => {
    var error = false;
    var sn = isEmpty(getStateName);
    if (sn.err) {
      error = sn.err;
    }
    setErrorPic({ sn: sn.img });

    if (!error) {
      const body = { statename: getStateName };
      var result = await postData("statecityarea/stateAdd", body);
      if (result) {
        setMessage("Record Submtted....");
      } else {
        setMessage("Fail to Record Submit");
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.maindiv}>
        <div className={classes.headingdiv}>
          <h3>State</h3>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={`/${getErrorPic.sn}`} />
            <TextField
              id="outlined-basic"
              label="State Name"
              variant="outlined"
              fullWidth
              onChange={(event) => setStateName(event.target.value)}
            />
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
            xs={12}
            sm={6}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
            xs={12}
            sm={6}
          >
            <Button variant="contained" color="primary">
              Reset
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            width: 550,
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <b>{getMessage}</b>
        </div>
      </div>
    </div>
  );
}
