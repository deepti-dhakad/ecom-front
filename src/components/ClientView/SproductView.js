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

const useStyles = makeStyles((theme) => ({}));

export default function ProductView(props) {
  const classes = useStyles();
  const [getList, setList] = useState(null);
  const [getProductPictureList, setProductPictureList] = useState([]);
  const [cartRender, setCartRender] = useState(false);
  var params = useParams();
  var dispatch = useDispatch();
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  useEffect(function () {
    fetchProduct();
    fetchProductPictures(params.pid);
  }, []);
  const fetchProduct = async () => {
    var list = await getData("product/fetchproductbyid/" + params.pid);
    console.log("IIIIITEM>>>>", list);
    setList(list[0]);
  };

  const fetchProductPictures = async (pid) => {
    let body = { productid: pid };
    var list = await postData("productpicture/productpicturedisplaybyid", body);

    setProductPictureList(list);
  };
  const handleChangeQty = (item, value) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!cartRender);
  };

  const showAllProducts = (item) => {
    console.log("ITEM", item);
    return (
      <div>
        {item != null ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <img
                src={ServerURL + "/images/" + item.picture}
                width="50%"
                style={{ borderRadius: "2%", elevation: 20 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return <div>{showAllProducts(getList)}</div>;
}
