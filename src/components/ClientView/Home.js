import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL, getData, postData } from "../FetchNodeServices";
import { width } from "@material-ui/system";
import MainPage from "./MainPage";
import QtyCtrl from "./QtyCtrl";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "88%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [getBrandList, setBrandList] = useState([]);
  const [getTopBrandList, setTopBrandList] = useState([]);
  const [getNewBrandList, setNewBrandList] = useState([]);
  const [getDiscountProduct, setDiscountProduct] = useState([]);
  const [cartRender, setCartRender] = useState(false);
  var dispatch = useDispatch();

  const fetchBrand = async () => {
    var result = await getData("brand/fetchbrandsads");
    setBrandList(result);
  };
  const fetchTopBrand = async () => {
    var result = await getData("brand/fetchTopBrand");
    setTopBrandList(result);
  };
  const fetchNewBrand = async () => {
    var result = await getData("brand/fetchNewBrand");
    setNewBrandList(result);
  };
  const fetchDiscontedProduct = async () => {
    var result = await getData("product/fetchProductByDiscount");
    setDiscountProduct(result);
  };
  useEffect(function () {
    fetchBrand();
    fetchTopBrand();
    fetchNewBrand();
    fetchDiscontedProduct();
  }, []);

  const handleChangeQty = (item, value) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!cartRender);
  };

  const showBrand = () => {
    return getBrandList.map((item, index) => {
      return (
        <div>
          <img
            src={ServerURL + "/images/" + item.ad}
            width="100%"
            height="30%"
          />
        </div>
      );
    });
  };

  const TopProducts = () => {
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} spacing={20} className={classes.gridList}>
          {getTopBrandList.map((tile) => (
            <GridListTile key={tile.brandid}>
              <img
                src={ServerURL + "/images/" + tile.ad}
                onClick={() => {
                  props.history.push({
                    pathname: "/ListProducts",
                    state: { brandid: tile.brandid },
                  });
                }}
                width="100%"
                height="100%"
                style={{ borderRadius: "2%", elevation: 20 }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  const NewProducts = () => {
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} spacing={20} className={classes.gridList}>
          {getNewBrandList.map((tile) => (
            <GridListTile key={tile.brandid}>
              <img
                src={ServerURL + "/images/" + tile.ad}
                width="100%"
                onClick={() => {
                  props.history.push({
                    pathname: "/ListProducts",
                    state: { brandid: tile.brandid },
                  });
                }}
                style={{ borderRadius: "2%", elevation: 20 }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };
  const showDiscountProducts = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", padding: 5 }}>
        {getDiscountProduct.map((item) => (
          <div
            style={{
              width: 200,
              padding: 10,
              margin: 5,
              border: "1px solid #ecf0f1",
            }}
          >
            <img
              src={ServerURL + "/images/" + item.picture}
              width="100%"
              style={{ borderRadius: "2%", elevation: 20 }}
              onClick={() =>
                props.history.push({
                  pathname: `/SproductView/${item.productid}`,
                })
              }
            />
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
              {item.productname.length > 45 ? (
                <div>{item.productname.substring(0, 45) + "..."}</div>
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
                fontSize: "16px",
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

  return (
    <div>
      <div>
        <MainPage props={props} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "96%" }}>
          <Slider {...settings}>{showBrand()}</Slider>
        </div>
      </div>
      <div
        style={{
          fontSize: 30,
          color: "#636e72",
          fontWeight: "normal",
          display: "flex",
          letterSpacing: "3.9px",
          fontFamily: 'Georgia,Times,"Times New Roman",serif',
          justifyContent: "center",
          padding: 10,
          paddingTop: 30,
        }}
      >
        IN THE SPOTLIGHT
      </div>

      {TopProducts()}

      <div
        style={{
          fontSize: 30,
          color: "#636e72",
          fontWeight: "normal",
          display: "flex",
          letterSpacing: "3.9px",
          fontFamily: 'Georgia,Times,"Times New Roman",serif',
          justifyContent: "center",
          padding: 10,
          paddingTop: 30,
        }}
      >
        SPECIAL SELECTION FOR YOU
      </div>

      {NewProducts()}

      <div
        style={{
          fontSize: 30,
          color: "#636e72",
          fontWeight: "normal",
          display: "flex",
          letterSpacing: "3.9px",
          fontFamily: 'Georgia,Times,"Times New Roman",serif',
          justifyContent: "center",
          padding: 10,
          paddingTop: 30,
        }}
      >
        FEATURE BRANDS
      </div>

      {showDiscountProducts()}
      <Footer />
    </div>
  );
}
