import React, { useMemo, useState } from "react";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AddToCart } from "../../../../../actions";
import { useToasts } from "react-toast-notifications";
import { motion } from "framer-motion";
function ProductEntry(props) {
  const {
    name,
    image,
    basePrice,
    vegan,
    vegetarian,
    description,
    glutenFree,
    type,
    id,
  } = props.data;
  const { addToast } = useToasts();
  const match = useRouteMatch();
  const history = useHistory();
  const prodType = props.data.type;
  const sizes = props.sizes;
  const { dips } = props;
  const [selectSize, setSelectSize] = useState(1);
  const [dip, setDip] = useState(0);
  const checkTrigger = (event) => {
    const trgt = event.target;
    if (
      trgt.closest("button") &&
      trgt.closest("button").classList.contains("addButton")
    ) {
      addToast(
        (props.sizes ? props.sizes[selectSize].name + " " : "") +
          name +
          " added to basket",
        {
          appearance: "success",
          autoDismiss: true,
        }
      );
      cartAddProd();
    } else if (trgt.classList.contains("sizeSelector")) {
    } else {
      history.push(match.url + `/customize/` + id);
    }
  };
  const totalprice = useMemo(() => {
    if (prodType === "pizza") {
      return (basePrice * sizes[selectSize].multiplier).toFixed(2);
    } else {
      return basePrice;
    }
  }, [basePrice, selectSize, sizes, prodType]);
  function cartAddProd() {
    let prodSend = {
      id: id,
      name: name,
      amount: 1,
      singlePrice: totalprice,
      price: totalprice,
      size: type === "pizza" ? 1 : null,
      curst: type === "pizza" ? 3 : null,
      dip: dips ? dip : null,
      toppings: null,
    };
    props.AddToCart(prodSend);
  }
  return (
    <motion.div
      onClick={(e) => checkTrigger(e)}
      className="productEntry"
      data-type={prodType}
      initial={{
        x: 100,
        y: -50,
        scale: 1.2,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: 0.15 + props.timing * 0.15,
      }}
    >
      <div className="EntryInner">
        <div className="imageCont">
          <div
            className={`image ${type}`}
            style={{ background: `url(/${image})` }}
          >
            <ul className="paramList">
              {vegetarian && (
                <li>
                  <Tooltip title="Vegetarian">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1000 1000"
                      enableBackground="new 0 0 1000 1000"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path d="M977.9,138C871.7,57.5,708.4,9.5,540.9,9.5C333.8,9.5,165,81.8,77.8,207.9c-40.9,59.2-63.6,129.3-67.3,208.4c-3.3,70.4,8.5,148.3,35.2,232.1c90.9-272.6,344.9-486,637.6-486c0,0-273.9,72.1-446.2,295.4c-0.1,0.1-2.4,3-6.3,8.3c-34.6,46.3-64.7,98.9-87.3,158.5c-38.2,90.9-73.6,215.6-73.6,365.9h122.7c0,0-18.6-117.1,13.8-251.9c53.6,7.2,101.5,10.8,144.6,10.8c112.8,0,193-24.4,252.4-76.8c53.3-46.9,82.6-110,113.7-176.8c47.5-102,101.3-217.6,257.5-306.8c8.9-5.1,14.7-14.4,15.4-24.6C990.6,154.1,986.1,144.2,977.9,138L977.9,138z" />
                        </g>
                      </g>
                    </svg>
                  </Tooltip>
                </li>
              )}
              {vegan && (
                <li>
                  <Tooltip title="Vegan">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1000 1000"
                      enableBackground="new 0 0 1000 1000"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                          <path d="M4622.6,5016.9c-693.8-70.9-1213.2-214.7-1782.4-494.5c-500.2-245.3-856.7-498.3-1263-891.2c-417.8-408.2-722.6-828-981.3-1353.1c-241.5-494.5-389.1-979.4-471.5-1552.4c-32.6-226.2-32.6-981.3,0-1207.5c136.1-950.6,504.1-1803.5,1082.9-2506.9c1353.1-1642.5,3595.5-2229,5571.5-1458.5C8043.7-3952.7,9071-2923.5,9569.3-1650.9C9772.5-1127.7,9876-625.6,9897-41c46,1326.3-446.6,2604.6-1374.2,3562.9c-421.7,435.1-833.7,736-1370.4,998.5c-483,237.7-927.6,377.6-1466.2,460C5492.8,5009.2,4789.4,5034.1,4622.6,5016.9z M5410.4,4547.3c716.8-69,1464.3-331.6,2029.6-713c534.7-360.3,1054.1-900.8,1360.8-1418.3c1142.3-1916.6,714.9-4352.5-1010-5745.9C6686.8-4221,5272.4-4529.6,3896.3-4182.7c-783.9,199.3-1447,580.7-2035.4,1169.1c-345,346.9-544.3,607.6-760.9,998.5c-423.6,766.6-613.3,1684.7-529,2551c128.4,1322.4,829.9,2506.9,1933.8,3263.9c711.1,486.8,1573.5,757.1,2455.1,766.6C5092.2,4566.4,5295.4,4558.8,5410.4,4547.3z" />
                          <path d="M5398.8,3000.6c-103.5-51.8-151.4-159.1-203.1-463.8c-24.9-147.6-59.4-302.8-76.7-345c-44.1-107.3-126.5-172.5-220.4-172.5c-113.1,0-182.1,36.4-358.4,189.7c-193.6,164.8-253,197.4-366.1,199.3c-109.2,1.9-201.2-46-253-126.5c-53.7-86.2-40.3-285.6,38.3-559.6c113.1-385.2,97.7-553.9-55.6-657.4c-86.2-57.5-170.6-46-333.5,42.2c-65.2,36.4-143.7,70.9-178.3,78.6c-95.8,19.2-205.1-21.1-279.8-103.5c-126.5-141.8-115-237.7,78.6-584.6c153.3-276,185.9-385.2,155.3-515.6c-32.6-138-78.6-161-256.8-130.3c-178.2,28.8-235.7,5.8-297.1-122.7c-55.6-115-44.1-203.1,55.6-425.5c118.8-264.5,141.8-368,132.2-569.2c-7.7-136.1-23-205.1-67.1-312.4c-51.7-120.7-356.5-601.8-525.1-824.1c-53.7-70.9-59.4-88.2-40.3-128.4c23-53.7,239.6-212.7,327.7-243.4c99.7-34.5,138-9.6,264.5,180.1c241.5,362.2,433.1,548.2,645.9,632.5c151.4,59.4,460,65.2,764.7,15.3c134.2-23,295.2-40.3,358.4-40.3c99.7,0,122.7,7.7,180.2,57.5c99.7,88.2,103.5,147.6,23,318.2c-63.3,136.1-67.1,147.6-40.3,197.4c61.3,122.6,228.1,126.5,498.3,13.4c333.5-139.9,431.2-168.7,534.7-159.1c80.5,7.7,105.4,19.2,161,80.5c61.3,67.1,65.2,78.6,57.5,180.2c-5.7,88.2-26.8,141.8-107.3,281.7c-113.1,193.6-122.7,256.8-49.8,323.9c93.9,86.2,207,95.8,561.6,47.9c379.5-53.7,471.5-46,571.1,46c53.7,47.9,69,78.6,76.7,153.3c15.3,136.1-26.8,201.2-231.9,352.6c-291.3,212.7-335.4,287.5-264.5,448.5c49.8,113.1,128.4,143.7,429.3,168.7c128.4,11.5,262.6,26.8,300.9,38.3c174.4,47.9,262.6,164.8,245.3,320.1c-15.3,138-99.7,207-368,293.2c-276,90.1-373.7,172.5-373.7,312.4c0,99.7,46,199.3,182.1,408.2c260.6,398.6,277.9,544.3,88.2,722.5c-189.7,178.2-333.5,161-655.4-74.7c-109.2-80.5-226.2-159.1-260.7-172.5c-157.2-67.1-268.3,0-322,195.5c-80.5,291.3-130.3,377.6-247.2,431.2C5598.2,3042.8,5485.1,3044.7,5398.8,3000.6z M6200,1660.9C4896.7,139.2,4266.2-571.9,3524.4-1351.9l-120.7-126.5l99.7,162.9c230,379.5,678.5,996.6,1015.8,1401c228.1,274.1,743.6,805,1086.7,1121.2c237.7,220.4,726.4,640.1,743.6,640.1C6355.2,1846.8,6288.1,1762.5,6200,1660.9z" />
                        </g>
                      </g>
                    </svg>
                  </Tooltip>
                </li>
              )}
              {glutenFree && (
                <li>
                  <Tooltip title="Gluten Free">
                    <svg
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1000 1000"
                      enableBackground="new 0 0 1000 1000"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                          <path d="M4622.6,5016.9c-693.8-70.9-1213.2-214.7-1782.4-494.5c-500.2-245.3-856.7-498.3-1263-891.2c-417.8-408.2-722.6-828-981.3-1353.1c-241.5-494.5-389.1-979.4-471.5-1552.4c-32.6-226.2-32.6-981.3,0-1207.5c136.1-950.6,504.1-1803.5,1082.9-2506.9c1353.1-1642.5,3595.5-2229,5571.5-1458.5C8043.7-3952.7,9071-2923.5,9569.3-1650.9C9772.5-1127.7,9876-625.6,9897-41c46,1326.3-446.6,2604.6-1374.2,3562.9c-421.7,435.1-833.7,736-1370.4,998.5c-483,237.7-927.6,377.6-1466.2,460C5492.8,5009.2,4789.4,5034.1,4622.6,5016.9z M5648,4520.5c845.2-132.2,1623.3-490.6,2261.6-1040.7l67.1-59.4l-659.3-661.2L6658,2099.8l74.7-13.4c40.3-7.7,155.3-34.5,253-61.3l180.2-49.8l563.5,563.5l565.4,563.5l59.4-67.1c789.6-914.2,1178.7-2115.9,1067.5-3315.7C9228.2-2408,7526.2-4109.9,5398.8-4303.5c-1199.8-111.2-2401.5,277.9-3315.7,1067.5l-67.1,59.4l484.9,486.8l484.9,486.8l-28.8,116.9c-17.3,63.3-36.4,170.6-42.2,237.7s-15.3,134.2-19.2,147.6c-5.7,19.2-220.4-180.2-603.7-565.4l-594.1-592.2l-59.4,67.1C739.7-1750.6,371.7-363,638.1,984.4c224.2,1142.3,891.2,2146.6,1866.7,2815.4c586.5,402.5,1318.6,668.9,2050.7,749.4C4785.5,4574.1,5408.4,4556.9,5648,4520.5z" />
                          <path d="M4913.9,3705.9c-187.8-170.6-368-463.8-454.2-737.9c-59.4-189.7-74.7-555.8-28.7-778.1c40.3-205.1,118.8-392.9,239.6-576.9c95.8-145.7,291.3-360.3,327.7-360.3c32.6,0,218.5,199.3,300.9,322c210.8,310.5,293.3,573.1,293.3,946.8c0,429.3-157.2,810.7-467.7,1138.4l-122.7,128.4L4913.9,3705.9z" />
                          <path d="M3424.8,1797c-26.8-3.8-84.3-13.4-128.4-19.2c-101.6-11.5-111.2-46-82.4-293.2c51.8-458.1,268.3-810.7,651.6-1069.5C4120.5,244.6,4385,127.7,4707,45.2c256.8-65.2,239.6-80.5,226.2,207c-21.1,410.2-115,753.2-270.2,987c-161,241.5-465.7,450.4-759,517.5C3771.7,1787.4,3505.3,1810.4,3424.8,1797z" />
                          <path d="M6255.6,1789.3c-277.9-34.5-544.3-155.2-739.8-337.3C5234,1191.4,5088.3,810,5059.6,252.2c-13.4-287.5-30.7-272.2,226.2-207c743.6,189.8,1247.7,584.6,1424,1113.5c53.7,159.1,93.9,458.1,76.7,550c-9.6,49.8-23,59.4-82.4,69C6554.5,1800.8,6380.1,1804.7,6255.6,1789.3z" />
                          <path d="M3294.4,146.8c-93.9-11.5-109.2-61.3-82.4-279.8c57.5-490.6,260.6-822.2,670.8-1096.3c203.1-136.1,391-226.1,624.8-302.8c174.4-57.5,406.3-109.2,421.6-93.9c15.3,17.3,11.5,249.2-9.6,435.1c-42.2,368-178.2,724.5-354.6,923.8c-168.7,191.7-437,339.2-722.6,398.7C3719.9,158.3,3445.9,164.1,3294.4,146.8z" />
                          <path d="M6136.7,133.4C5511.9-12.3,5165-439.6,5075-1171.8c-21.1-180.1-28.8-437-11.5-454.2c32.6-30.7,473.4,97.8,716.8,207c222.3,101.6,498.3,297.1,642.1,450.4c147.6,161,260.6,371.8,318.1,599.9c46,182.1,59.4,458,23,494.5C6729,160.2,6282.4,166,6136.7,133.4z" />
                          <path d="M3325.1-1486.1c-49.8-7.7-97.7-19.2-105.4-28.8c-26.8-26.8-7.7-318.2,32.6-483c59.4-253,210.8-523.2,379.5-674.6c289.4-260.7,659.3-452.3,1067.5-552c105.4-24.9,203.2-46,218.5-46c23,0,24.9,42.2,15.3,245.3c-28.8,536.6-162.9,912.3-419.7,1169.1C4222.1-1562.8,3773.6-1424.8,3325.1-1486.1z" />
                          <path d="M6175.1-1495.7c-266.4-49.8-519.4-182.1-697.6-358.4c-254.9-256.8-392.9-640.1-417.8-1171c-9.6-210.8-7.7-245.3,17.3-245.3c65.2,0,431.2,103.5,586.5,164.8c364.1,145.7,703.4,392.9,864.4,626.7c141.8,208.9,216.6,415.9,253,705.3c21.1,174.4,11.5,256.8-34.5,274.1C6677.2-1472.7,6305.4-1470.8,6175.1-1495.7z" />
                        </g>
                      </g>
                    </svg>
                  </Tooltip>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="body">
          <h3 className="title">{name}</h3>
          <h6 className="desc">{description}</h6>
          {prodType === "pizza" && (
            <select
              className="sizeSelector"
              name="sizeSelector"
              id={`'size_for '${id}`}
              value={selectSize}
              onChange={(e) => setSelectSize(e.target.value)}
            >
              {sizes.map((sizze, index) => {
                return (
                  <option
                    key={index}
                    value={index}
                    data-value={sizze.multiplier}
                  >
                    {sizze.name}
                  </option>
                );
              })}
            </select>
          )}
          {dips && (
            <select
              className="sizeSelector"
              name="dipselector"
              id={`dip_for ${id}`}
              value={dip}
              onChange={(e) => setDip(e.target.value)}
            >
              {dips.map((dippp, index) => {
                return (
                  <option key={index} value={index}>
                    {dippp.name}
                  </option>
                );
              })}
            </select>
          )}
          <button className="addButton">
            <span>Add</span>
            <span>${totalprice}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps, { AddToCart })(ProductEntry);
