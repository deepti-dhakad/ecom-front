import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { ServerURL, getData, postData } from "../FetchNodeServices";
import { checkMobile, checkRequire } from "../Checks";

//import './index.css'
const useStyles = makeStyles((theme) => ({
  main_div: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    background: "#ebebeb",
  },
  center_div: {
    width: "22%",
    height: "100%",
    borderRadius: "15px",
    backgroundColor: "#fff",
    marginTop: "20px",
    marginRight: "-30px",
    marginLeft: "-30px",
    padding: "0 32px",
  },

  button_hover: {
    backgroundColor: "#20bf6b",
  },

  ol: {
    marginTop: 10,
  },
  ol_li: {
    textAlign: "left",
    fontSize: "20px",
    fontWeight: 500,
    minHeight: "20px",
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    color: "#8566aa",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [getPhoneNumber, setPhoneNumber] = useState("");
  const [getMessage, setMessage] = useState("");

  const handleSubmit = async () => {
    var err = false;

    if (getPhoneNumber.length == 0) {
      err = true;
      setMessage(
        <font color="red" size="2">
          <i>Please enter your mobile no!</i>
        </font>
      );
    } else if (!checkMobile(getPhoneNumber)) {
      err = true;
      setMessage(
        <font color="red" size="2">
          <i>Please enter valid mobile no!</i>
        </font>
      );
    } else if (checkMobile(getPhoneNumber)) {
      setMessage("");
    }

    if (!err) {
      // alert('deepti'+getPhoneNumber)
      var body = { phonenumber: getPhoneNumber };
      var result = await postData("userdetail/chkUserRecord", body);
      console.log(result.RESULT);
      if (result.RESULT == "FOUND") {
        setMessage(result.message);
        props.history.push({ pathname: "/Home" });
      } else {
        props.history.push({ pathname: "/SignIn", getPhoneNumber });
      }
    } else {
      alert("SERVER ERROR");
    }
  };

  return (
    <>
      <div className={classes.main_div}>
        <div className={classes.center_div}>
          {/* <section class="screen-with-header"><header class="common-header"><button class="close-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>back/close</title><path fill="currentColor" d="M1.319 0L0 1.319 6.681 8 0 14.681 1.319 16 8 9.319 14.681 16 16 14.681 9.319 8 16 1.319 14.681 0 8 6.681z"></path></svg></button><!-- react-text: 409 -->login / register<!-- /react-text --></header><div class="container"><form><div class="form-field-plain error"><input name="emailMobile" value="" placeholder="Enter Email ID or Phone Number" class="input text-center"><svg xmlns="http://www.w3.org/2000/svg" class="success-input-icon" width="16" height="13" viewBox="0 0 16 13"><title>success checkmark</title><path fill="#5cd285" d="M14.563.247l-9.51 9.51L1.437 6.14.247 7.332l4.806 4.806 10.7-10.7z"></path></svg><span class="help-msg">Required</span></div><inputfield name="customerId" value="" hidden="" label="Hidden Id for Masked Email"></inputfield><div class="button-separator"><button type="submit" class="button big fill full "><!-- react-text: 421 -->proceed<!-- /react-text --></button></div></form></div></section> */}

          <header
            style={{
              borderBottom: "1px solid #ebebeb",
              fontSize: "16px",
              fonWeight: 800,
              marginRight: "10px",
              marginBottom: "7px",
              marginLeft: "10px",
              padding: "25px 10px 15px",
              position: "relative",
              textAlign: "center",
              color: "#3f414d",
              textTransform: "uppercase",
            }}
          >
            <button
              style={{
                background: "none",
                border: 0,
                cursor: "pointer",
                lineHeight: ".8",
                padding: "2px",
                position: "absolute",
                bottom: "15px",
                left: "5px",
              }}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <title>back/close</title>
                <path
                  fill="currentColor"
                  d="M1.319 0L0 1.319 6.681 8 0 14.681 1.319 16 8 9.319 14.681 16 16 14.681 9.319 8 16 1.319 14.681 0 8 6.681z"
                ></path>
              </svg>
            </button>
            login / register
          </header>

          <div
            style={{
              position: "relative",
              boxSizing: "border-box",
              display: "block",
            }}
          >
            <input
              name="emailMobile"
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter Email ID or Phone Number"
              value={getPhoneNumber}
              style={{
                border: "1px solid red",
                backgroundColor: "#f3f3f3",
                borderRadius: "2px",
                color: "#3f414d",
                marginBottom: "16px",
                padding: "10px 25px 10px 5px",
                width: "100%",
                fontSize: "14px",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                top: "13px",
                right: "10px",
                display: "none",
                position: "absolute",
                overflow: "hidden",
              }}
              width="16"
              height="13"
              viewBox="0 0 16 13"
            >
              <title>success checkmark</title>
              <path
                fill="#5cd285"
                d="M14.563.247l-9.51 9.51L1.437 6.14.247 7.332l4.806 4.806 10.7-10.7z"
              ></path>
            </svg>
            <span
              style={{
                textAlign: "right",
                color: "#3f414d",
                position: "absolute",
                fontSize: "10px",
                fontWeight: 600,
                right: "5px",
                bottom: 0,
                textAlign: "right",
                boxSizing: "border-box",
                textTransform: "uppercase",
              }}
            >
              {getMessage}
            </span>
          </div>

          <div style={{ marginTop: "160px", boxSizing: "border-box" }}>
            <button
              type="submit"
              onClick={() => handleSubmit()}
              style={{
                height: "50px",
                width: "100%",
                fontWeight: 700,
                backgroundColor: "#fc2779",
                backgroundColor: "#fc2779",
                color: "#fff",
                border: "1px solid #fc2799",
                borderRadius: "2px",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
