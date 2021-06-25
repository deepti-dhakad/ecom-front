import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL, getData, postData } from "../FetchNodeServices";
import { width } from "@material-ui/system";
import MainPage from "./MainPage";
import QtyCtrl from "./QtyCtrl";
import Footer from "./Footer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Height } from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Filter from "./Filter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  main_div: {
    // width:'100%',
    // height:'100%',

    // flexDirection:'row',
    // justifyContent:'center',
    // alignItems:'center',
    display: "flex",
    background: "#ebebeb",
  },
  gridList: {
    width: "88%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  filter: {
    marginBottom: "20%",
    marginTop: "1px",
    marginRight: "60%",
    paddingBottom: "2px",
    marginLeft: "150px",
    paddingLeft: "20px",
    backgroundColor: "ebebeb",
    boxShadow: "2px 2px 8px #0000001f",
    fontSize: "12px",
    paddingTop: "5px",
    position: "absolute",
    width: "200px",
    top: "200px",
  },
  root1: {
    width: "50%",

    // marginTop:'20px',
    // marginLeft:'20px',
    // fontSize:'12px',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    background: "white", //#fc2779
    height: "auto",
    maxWidth: 400,
    marginRight: 50,
    elevation: 60,
  },
}));
// ((props) => <Radio color="default" {...props} />);

function ListProducts(props) {
  const classes = useStyles();

  const [getProduct, setProduct] = useState([]);
  const [cartRender, setCartRender] = useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [Range, setRange] = React.useState([100, 10000]);
  const [getFisrtValue, setFisrtValue] = React.useState("100");
  const [getSecondValue, setSecondValue] = React.useState("10000");

  const handlePrice = (event, newValue) => {
    setRange(newValue);
    setFisrtValue(newValue[0]);
    setSecondValue(newValue[1]);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  var dispatch = useDispatch();
  // console.log('data',props.history.location.state.brandid)
  //console.log('props',props.location)
  const fetchByBrand = async () => {
    // console.log("sakdkhb",props)
    var body = { brandid: props.location.state.brandid };

    var result = await postData("product/fetchbrandbyid", body);
    setProduct(result);
  };

  useEffect(
    function () {
      fetchByBrand();
    },
    [props]
  );

  const handleChangeQty = (item, value) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!cartRender);
  };

  const showAllProducts = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
          flexWrap: "wrap",
        }}
      >
        {getProduct.map((item) => (
          <div
            style={{
              width: 250,
              padding: 10,
              margin: 10,
              border: "1px solid #ecf0f1",
              backgroundColor: "#FFF",
            }}
          >
            <img
              src={ServerURL + "/images/" + item.picture}
              width="100%"
              style={{ borderRadius: "2%", elevation: 20 }}
              onClick={() =>
                props.history.push({
                  pathname: `/ProductView/${item.productid}`,
                })
              }
            />
            <div
              style={{
                display: "flex",
                padding: 5,
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "normal",
                lineHeight: 1.5,
                color: "#3f414d",
              }}
            >
              {item.productname.length > 45 ? (
                <div>{item.productname.substring(0, 45) + "...."}</div>
              ) : (
                <div>
                  <div>{item.productname}</div>
                  <div>&nbsp;</div>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "normal",
                lineHeight: 1.5,
                color: "#3f414d",
              }}
            >
              {item.offerprice == 0 ? (
                <div> &#8377;{item.price}</div>
              ) : (
                <div>
                  {" "}
                  <span style={{ textDecorationLine: "line-through" }}>
                    {" "}
                    &#8377;{item.price}
                  </span>{" "}
                  &#8377; {item.offerprice}{" "}
                  <span style={{ color: "#fc2779", fontWeight: "bold" }}>
                    {" "}
                    &nbsp;Save &#8377;{item.offerprice}
                  </span>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <QtyCtrl
                value={0}
                onChange={(value) => handleChangeQty(item, value)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const showFilter = () => {
    return (
      <div
        className={classes.root1}
        style={{ background: "#fff", border: "1px solid #d1ccc0" }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold", height: 35 }}>
          {" "}
          Filter
        </div>
        <div style={{ marginTop: "2px" }}>
          <Typography
            id="range-slider"
            gutterBottom
            style={{ fontSize: "14px" }}
          >
            Price
          </Typography>
          <Slider
            value={Range}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            style={{ color: "#fc2779" }}
          />
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} style={{ fontSize: "14px" }}>
              Min
            </Grid>
            <Grid xs={12} sm={6} style={{ fontSize: "14px" }}>
              Max
            </Grid>
            <Grid xs={12} sm={6} style={{ fontSize: "14px" }}>
              {getFisrtValue}
            </Grid>
            <Grid xs={12} sm={6} style={{ fontSize: "14px" }}>
              {getSecondValue}
            </Grid>
          </Grid>
        </div>

        <div style={{ marginTop: "2px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Sort By</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl
                component="fieldset"
                error={error}
                className={classes.formControl}
              >
                {/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="Law to High"
                    control={<Radio />}
                    label="Law to High"
                  />
                  <FormControlLabel
                    value="High to Law"
                    control={<Radio />}
                    label="High to Law"
                  />
                  <FormControlLabel
                    value="Oldest to Newest"
                    control={<Radio />}
                    label="Oldest to Newest"
                  />
                  <FormControlLabel
                    value="Newest to Oldest"
                    control={<Radio />}
                    label="Newest to Oldest"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>
        <div style={{ marginTop: "1px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Discount</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <FormControl component="fieldset" error={error} className={classes.formControl}> */}
              {/* <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel> */}
              {/* <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}> */}

              <div>
                <div style={{ marginTop: 5 }}>
                  <input
                    type="radio"
                    value="40% or more"
                    style={{ fontSize: "16px", color: "#fc2779" }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "initial",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    40% or more
                  </span>
                </div>
                <div style={{ marginTop: 5 }}>
                  <input type="radio" value="30% or more" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "initial",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    30% or more
                  </span>
                </div>
                <div style={{ marginTop: 5 }}>
                  <input type="radio" value="20% or more" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "initial",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    20% or more
                  </span>
                </div>
                <div style={{ marginTop: 5 }}>
                  <input type="radio" value="10% or more" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "initial",
                      textAlign: "center",
                      margin: "10px",
                    }}
                  >
                    10% or more
                  </span>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div style={{ fontSize: "16px", fontWeight: "bold", height: 35 }}>
            Availability
          </div>
          <div style={{ marginRight: 122, width: "100%" }}>
            <Checkbox
              inputProps={{ "aria-label": "uncontrolled-checkbox" }}
              style={{ color: "red" }}
            />
            in Stock
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <MainPage props={props} />

      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={4}
          // style={{ background: "#ebebeb", height: "200%" }}
        >
          <Filter />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          // style={{ background: "#ebebeb", height: "100%" }}
        >
          {showAllProducts()}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>

      {/* <div style={{display:'flex',justifyContent:'flex-end',position:'fixed'}}>
    <Footer/>
    </div> */}
    </>
  );
}

export default ListProducts;
