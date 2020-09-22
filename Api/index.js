import Query from "./Query";
import {message} from "antd";
import {I18n} from "../index";

/**
 * api 请求
 * @param scope
 * @param params
 * @param then
 * @param refresh
 * @constructor
 */
const Index = {

  setting: {},

  /**
   * 配置host
   * @param settingKey
   * @param host 链接
   * @param crypto 加密方式
   * @param append 附加参数,只支持静态数据
   */
  config: (settingKey = 'def', host, crypto = null, append = null) => {
    Index.setting[settingKey] = {
      host: host,
      crypto: crypto,
      append: append,
    };
  },

  /**
   * mixed query
   * @param settingKey
   * @returns {Query}
   */
  query: (settingKey = 'def') => {
    const setting = Index.setting[settingKey];
    if (setting === undefined) {
      throw 'setting error';
    }
    return new Query(setting);
  },

  /**
   * @param response
   * @param success
   * @param error
   * @param throwable
   */
  handle: (response, success, error = null, throwable = null) => {
    if (response.error === 0) {
      success();
    } else if (response.error === 99999) {
      if (throwable !== null) throwable();
      else message.error(response.msg);
    } else {
      if (error !== null) error();
      else message.error(I18n(response.msg));
    }
  }

};

export default Index;
