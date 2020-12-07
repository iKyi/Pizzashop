import local from "../apis/local";
import Axios from "axios";
const CONFIG = {
  url: "https://cloud.squidex.io",
  appName: "pizzashop",
  clientId: "pizzashop:reader",
  clientSecret: "fdyfn3rjt1kxzi2aq5hnkxqeibiwhk4juijfiscbazux",
};
function buildUrl(url) {
  if (url.length > 0 && url.startsWith("/")) {
    url = url.substr(1);
  }
  const result = `${CONFIG.url}/${url}`;
  return result;
}
export const AddToCart = (product) => async (dispatch) => {
  dispatch({ type: "ADD_CART", payload: product });
};
export const setCart = () => async (dispatch) => {
  const localCart = JSON.parse(localStorage.getItem("cart"));
  dispatch({ type: "SET_CART_INIT", payload: localCart || [] });
};
export const RemoveCart = (id) => async (dispatch) => {
  const response = await local.get("");
  var alldata = response.data;
  var products = alldata.find((item) => item.name === "products");
  var product = products.data.find((item) => item.id === id);
  dispatch({ type: "REMOVE_CART", payload: product });
};
export const fetchData = (preData) => async (dispatch) => {
  return new Promise(async (resolve) => {
    if (preData) {
      setTimeout(() => {
        dispatch({ type: "FETCH_TOPPINGS", payload: preData.toppings.iv });
        dispatch({ type: "FETCH_SIZES", payload: preData.pizzaSizes.iv });
        dispatch({ type: "FETCH_DIPS", payload: preData.dips.iv });
        dispatch({ type: "FETCH_CRUSTS", payload: preData.crustVariants.iv });
        dispatch({ type: "FETCH_PRODUCTS", payload: preData.products.iv });
        resolve(true);
      }, 0);
    } else {
      const response = await getContent(`api/content/${CONFIG.appName}/data`);
      if (response.status !== 200) {
        resolve(false);
      }
      const base = response.data.items[0].data;
      console.log(base)
      const products = base.products.iv;
      const toppings = base.toppings.iv;
      const pizzaSizes = base.pizzaSizes.iv;
      const crustVariants = base.crustVariants.iv;
      const dips = base.dips.iv;

      
      dispatch({ type: "FETCH_SIZES", payload: pizzaSizes });
      dispatch({ type: "FETCH_PRODUCTS", payload: products });
      dispatch({ type: "FETCH_TOPPINGS", payload: toppings });
      dispatch({ type: "FETCH_DIPS", payload: dips });
      dispatch({ type: "FETCH_CRUSTS", payload: crustVariants });
      resolve(true);
    }
  });
};
export const fetchProducts = (list) => async (dispatch) => {
  dispatch({ type: "FETCH_PRODUCTS", payload: list });
};
export const fetchToppings = (list) => async (dispatch) => {
  dispatch({ type: "FETCH_TOPPINGS", payload: list });
};
export const fetchSizes = (list) => async (dispatch) => {
  dispatch({ type: "FETCH_SIZES", payload: list });
};
export const fetchDips = (list) => async (dispatch) => {
  dispatch({ type: "FETCH_DIPS", payload: list });
};
export const fetchCrusts = (list) => async (dispatch) => {
  dispatch({ type: "FETCH_CRUSTS", payload: list });
};
// export const FetchSections = () => async (dispatch) => {
//   const json = await getContent(`api/content/${CONFIG.appName}/sections`);
//   const items = json.data.items;
//   const returnedData = items.map((item) => {
//     const name = item.data.name.iv;
//     const type = item.data.types.iv;
//     const obj = { name: name, types: type };
//     return obj;
//   });
//   dispatch({ type: "FETCH_PRODUCTS", payload: returnedData });
// };
function getBearerToken() {
  return localStorage.getItem("token");
}
function setBearerToken(token) {
  localStorage.setItem("token", token);
}
function clearBearerToken() {
  localStorage.removeItem("token");
}
export async function fetchBearerToken() {
  // Check if we have already a bearer token in local store.
  let token = getBearerToken();
  if (token) {
    return token;
  }
  const body =
    "grant_type=client_credentials&client_id=pizzashop:default&client_secret=dhvwywttqgpxrxzrzkzenhkqaabzfbxqo1llendx7k8x&scope=squidex-api";
  // Get the bearer token. Ensure that we use a client id with readonly permissions.
  const response = await Axios({
    method: "post",
    url: buildUrl("identity-server/connect/token"),
    data: body,
    Headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!response.status === 200) {
    console.log(response);
    throw new Error(`Failed to retrieve token, got ${response.statusText}`);
  }
  token = await response.data.access_token;
  // Cache the bearer token in the local store.
  setBearerToken(token);
  return token;
}
function getContent(url) {
  return getContentInternal(url, true);
}
async function getContentInternal(url, retry) {
  // // Fetch the bearer token.
  const token = await fetchBearerToken();
  const theurl = await buildUrl(url);
  const response = await Axios.get(theurl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.status === 200) {
    if (
      response.status === 403 ||
      response.status === 401 ||
      response.status === 404
    ) {
      // If we get an error we clear the bearer token and retry the request.
      clearBearerToken();
      if (retry) {
        return getContentInternal(url);
      }
    }
    throw new Error(`Failed to retrieve content, got ${response.statusText}`);
  }
  return await response;
}
export const SetStore = (store) => async (dispatch) => {
  const theStore = store;
  if (theStore) {
    localStorage.setItem("store", JSON.stringify(theStore));
  } else {
    localStorage.removeItem("store");
  }
  dispatch({ type: "SET_STORE", payload: theStore });
};
