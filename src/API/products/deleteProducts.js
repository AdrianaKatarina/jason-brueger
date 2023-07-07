import request from "../request/request";
import { getItem } from "../../storage/local";

const deleteProducts = (productId) => {
  const token = getItem("token");
  return request(`products/${productId}`, "DELETE", { Authorization: `Bearer ${token}` });
};

export default deleteProducts;
