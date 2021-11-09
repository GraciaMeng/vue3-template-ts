/**
 * 基础数据 API 集合类
 * 集成Abstract
 */
import Abstract from "./config/abstract";

class Basic extends Abstract {
  // get接口示例
  get() {
    return this.getReq({ url: "Basic.getFindList" });
  }
  // post接口示例
  post() {
    return this.postReq({ url: "Basic.getRestaurantList" });
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
