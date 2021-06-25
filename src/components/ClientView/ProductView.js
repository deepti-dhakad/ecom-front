import React, { useEffect, useState, createRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { getData, postData, ServerURL } from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import QtyCtrl from "./QtyCtrl";
import { blue } from "@material-ui/core/colors";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
//import Footer from "../Footer/index";
import MainPage from "./MainPage";
import { IconButton, TextField } from "@material-ui/core";
import Place from "@material-ui/icons/Place";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import renderHTML from "react-render-html";
import Image from "react-image-resizer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

const useStyles = makeStyles((theme) => ({
  grow: {
    //flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 0,
  },
  scardview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  gridRoot: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    outline: "none",
  },
  productpictureMedia: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  mainGrid: {
    // margin: 10,
    // padding: 10
  },
  subGrid: {
    padding: 2,
    justifyContent: "left",
    display: "flex",
  },
  mainDiv: {
    width: window.innerWidth * 0.9,
    margin: 20,
    padding: 10,
  },
  productdiv: {
    padding: 5,
    fontSize: 15,
  },
}));

export default function ProductView(props) {
  const classes = useStyles();
  const [getList, setList] = useState([]);
  const [getProductPictureList, setProductPictureList] = useState([]);
  const [getCount, setCount] = useState(false);
  const [getStatus, setStatus] = useState(false);
  const [getImage, setImage] = useState("");
  const [getPincode, setPincode] = useState("");
  const [getPinStatus, setPinStatus] = useState(false);
  const [getmsgStatus, setmsgStatus] = useState("");
  const [getcolorpin, setcolorpin] = useState("red");
  const [getPincodeData, setPincodeData] = useState([]);
  const [getOpacity, setOpacity] = useState(1);
  const [getColor, setColor] = useState("green");
  const [getProductColor, setProductColor] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  useEffect(function () {
    fetchProduct();
    fetchProductPictures(params.pid);
    window.scrollTo(0, 0);
  }, []);

  var sliderRef = createRef();
  var settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    // vertical: true,
    // verticalSwiping: true,
  };

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };
  const fetchProduct = async () => {
    var list = await getData("product/fetchproductbyid/" + params.pid);
    setImage(list[0].picture);
    setList(list[0]);
  };

  const fetchProductPictures = async (pid) => {
    let body = { productid: pid };
    var list = await postData("productpicture/productpicturedisplaybyid", body);
    if (list) {
      if (list.length > 4) {
        setStatus(true);
      } else {
        setStatus(false);
      }
      setProductPictureList(list);
    }
  };

  const fetchProductColor = async (categoryid, modelid, brandid) => {
    var list = await postData("product1/productitemsbycolor", {
      categoryid: categoryid,
      modelid: modelid,
      brandid: brandid,
    });
    setProductColor(list);
  };

  const CheckSession = async () => {
    if (!localStorage.getItem("user")) {
      props.history.replace({ pathname: `/UserLogin` });
    }
  };
  const Prebook = async () => {
    CheckSession();
    var user = JSON.parse(localStorage.getItem("user"));
    let cd = new Date();
    const data = {
      mobile: user.mobileno,
      productid: getList.productid,
      prebookdate:
        cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate(),
      prebooktime: cd.getHours() + ":" + cd.getMinutes(),
    };
    let result = await postData("prebook/add", data);
    if (result.status) {
      alert("Order Submitted Successfully...");
    } else {
      alert("Server Error!");
    }
  };

  //Count Cart Items//
  const handleQtyChange = (value, item) => {
    if (value >= 1 && value <= item.stock) {
      item["qtydemand"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productid, item] });
      setCount(!getCount);
    } else if (value == 0) {
      item["qtydemand"] = value;
      var list = getList;
      list["cartstatus"] = 0;
      setList(list);
      dispatch({ type: "REMOVE_CART", payload: [item.productid, item] });
      setCount(!getCount);
    } else {
    }
  };

  //ADD To Cart//
  const AddToCart = (item) => {
    item["qtydemand"] = 1;
    var list = getList;
    list["cartstatus"] = 1;
    setList(list);
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCount(!getCount);
  };

  // Show Product Picture//
  const showProductPicture = () => {
    return getProductPictureList.map(function (item, key) {
      return (
        <div className={classes.gridRoot}>
          <div
            className={classes.gridRoot}
            style={{
              width: 70,
              height: 70,
              border: "2px solid #dcdde1",
              borderRadius: 5,
              margin: 2,
              cursor: "pointer",
            }}
            onMouseEnter={() => setImage(item.productpicture)}
          >
            <Image
              width={65}
              height={65}
              src={`${ServerURL}/images/${item.productpicture}`}
            />
          </div>
        </div>
      );
    });
  };

  const handleProductColor = async (product, item) => {
    let body = {
      brandid: product.brandid,
      modelid: product.modelid,
      categoryid: product.categoryid,
      color: item.color,
    };
    var list = await postData("product1/listdetailsbyproductcolor", body);
    setImage(list[0].picture);
    setList(list[0]);
    if (list[0].status == "Coming Soon" || list[0].status == "Pre Booking") {
      setOpacity(0.3);
    }
    fetchProductPictures(item.productid);
  };

  const colorProduct = (product) => {
    return getProductColor.map((item) => {
      return (
        <div
          onClick={() => handleProductColor(product, item)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: 10,
            cursor: "pointer",
            border: "1px solid #ecf0f1",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <div>
            <Image
              width={50}
              height={50}
              src={`${ServerURL}/images/${item.picture}`}
            />
          </div>
          <div className={classes.productdiv}>
            <b>{item.color}</b>
          </div>
        </div>
      );
    });
  };

  const showProductDetails = (item) => {
    console.log("PRIIIIIIIIIIIIIII", item);
    if (item != null) {
      var save = item.price - item.offerprice;

      var discount = Math.ceil((save / item.price) * 100);
      var status = true;
      if (item.stock == 0) {
        status = false;
      }

      return (
        <>
          <Grid conatiner spacing={0}>
            <Grid item xs={12} sm={12} style={{ fontSize: 20, padding: 5 }}>
              <b>{item.productname}</b>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              M.R.P :{" "}
              <s>
                <b> {numberFormat(item.price)}</b>
              </s>{" "}
            </Grid>
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              Price :{" "}
              <big>
                <b> {numberFormat(item.offerprice)}</b>
              </big>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              You Save :{" "}
              <b>
                <font color="green">{numberFormat(save)}</font>
              </b>{" "}
            </Grid>
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              Inclusive of all taxes
            </Grid>
            <Grid item xs={12} sm={12}>
              {status && getList.status != "Coming Soon" ? (
                <>
                  <div
                    className={classes.productdiv}
                    style={{ fontSize: 17, color: "black" }}
                  >
                    <b>Delivery</b>
                  </div>
                  <div className={classes.productdiv}>
                    <FormControl>
                      <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                            <Place />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <div style={{ cursor: "pointer" }}>
                              <font
                                color="red"
                                size="2"
                                onClick={() => checkpincode(getPincode)}
                              >
                                <b>CHECK</b>
                              </font>
                            </div>
                          </InputAdornment>
                        }
                        onChange={(event) => setPincode(event.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div
                    className={classes.productdiv}
                    style={{ color: getcolorpin, fontSize: 13 }}
                  >
                    {getmsgStatus}
                  </div>
                  <div className={classes.productdiv} style={{ fontSize: 14 }}>
                    <b>Usually delivered in 2-3 days</b>
                    <br />
                    Enter pincode for exact delivery dates
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              {item.stock == 0 ? (
                <big>
                  <b>
                    <font color="red">Not Available</font>
                  </b>
                </big>
              ) : item.stock >= 1 && item.stock <= 3 ? (
                <big>
                  <b>
                    <font color="green">
                      Limited Stock {item.stock} item Avaliable
                    </font>
                  </b>
                </big>
              ) : (
                <big>
                  <b>
                    <font color="green">In Stock</font>
                  </b>
                </big>
              )}
            </Grid>
            {item.status == "Coming Soon" ? (
              <Grid item xs={12} sm={12} className={classes.productdiv}>
                <big>
                  <b>
                    <font color="red">Coming Soon</font>
                  </b>
                </big>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={12} sm={12} className={classes.productdiv}>
              Inaugural Offer <b>Free Shipping</b>
            </Grid>

            <QtyCtrl
              value={0}
              onChange={(value) => handleQtyChange(value, item)}
            />
          </Grid>
        </>
      );
    }
  };

  const checkpincode = async (locality) => {
    setPincode(locality);
    if (locality.length == 6) {
      let body = { pincode: locality };
      var list = await postData("statecityarea/checkpincode", body);
      setPincodeData(list);
      //console.log('STATE CITY DATA = ', list);
      if (list.length == 0) {
        setmsgStatus("We are not deliver this product in your area");
        setcolorpin("red");
        //alert("We are not deliver this product in your area")
        await setPinStatus(false);
      } else {
        await setPinStatus(true);
        setcolorpin("green");
        setmsgStatus("Delivery Available in Your Area");
      }
    } else {
      //if(locality.length==6)
      //alert("Invalid Pin Code")
      setmsgStatus("Invalid Pin Code");
      setcolorpin("red");
      await setPinStatus(false);
    }
  };

  const showDescription = (item) => {
    var desc = item.description;
    try {
      if (item.description.length > 0) desc = item.description;
    } catch (error) {
      desc = "";
    }

    if (item != null) {
      return (
        <div>
          <Divider style={{ padding: 0.5 }} />
          <div style={{ fontSize: 20, padding: 10 }}>
            <b>Description</b>
          </div>
          <div style={{ padding: "20px 50px", fontSize: 17 }}>
            <b>{item.productname}</b>
          </div>
          <div style={{ padding: "20px 50px" }}>
            <div style={{ pointerEvents: "none" }}>{renderHTML(desc)}</div>
          </div>
        </div>
      );
    }
  };
  var o = 1;
  return (
    <div className={classes.grow}>
      {/* <MainPage history={props.history} /> */}
      <MainPage props={props} />
      <div className={classes.gridRoot}>
        <div className={classes.mainDiv}>
          <Grid container spacing={2} className={classes.mainGrid}>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div
                  className={classes.gridRoot}
                  style={{
                    width: 300,
                    height: 300,
                    margin: "10px 5px",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    width={260}
                    height={260}
                    src={`${ServerURL}/images/${getImage}`}
                  />
                </div>
                {getStatus ? (
                  <div className={classes.gridRoot}>
                    <div style={{ marginLeft: 20 }}>
                      <KeyboardArrowLeftIcon onClick={() => gotoPrev()} />
                    </div>
                    <div className={classes.gridRoot}>
                      <div style={{ width: 325 }}>
                        <Slider {...settings} ref={sliderRef}>
                          {showProductPicture()}
                        </Slider>
                      </div>
                    </div>
                    <div style={{ marginRight: 20 }}>
                      <KeyboardArrowRightIcon onClick={() => gotoNext()} />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "30px 10px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {showProductPicture()}
                  </div>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                padding: "20px 30px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {showProductDetails(getList)}
            </Grid>
            <Grid item xs={12} sm={12} style={{ padding: 20 }}>
              {showDescription(getList)}
            </Grid>
          </Grid>
        </div>
      </div>
      {/* <Footer history={props.history} /> */}
    </div>
  );
}

// import React from 'react'
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// //import './index.css'
// const useStyles = makeStyles((theme) => ({
//     main_div: {
//       width:'100%',
//       height:'100vh',
//       display:'flex',
//       flexDirection:'row',

//       background: "#ebebeb",
//     },

//     center_div:{

//       width:'25%',
//       height:'65%',
//       borderRadius:'10px',
//       backgroundColor:'#fff',
//       boxShadow:''
//     },
//     footerpaper: {
//         height:'50%',
//         width:'100%',
//         background:'#fff',
//         marginTop:10,
//         marginLeft:10,
//         marginRight:10,

//       },
//       root: {
//         flexGrow: 1,
//       },
//       paper: {

//         textAlign: 'center',
//        // color: '#fff',
//         height:'50%',
//         width:'100%',
//         background:'#fff',
//         marginTop:10,
//         marginLeft:20,
//         marginRight:20,
//       },

//   }));

// function ProductView() {
//     const classes = useStyles()
//         return (
//             <div className={classes.main_div}>
//            <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper className={classes.paper}>
//               hggggggggggg
//           </Paper>
//         </Grid>
//           </Grid>
//           </div>

//     )
// }

// export default ProductView
