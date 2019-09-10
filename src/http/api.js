const rootUrl = "http://192.168.100.151:8080";

const loginUrl = rootUrl + "/crms/auth/login";

const registerUrl = rootUrl + "/crms/auth/register";

const logoutUrl = rootUrl + "/crms/auth/logout";

const getCurrentLoginAccountInfoUrl = rootUrl + "/crms/auth/info";
//创建营销机会
const creatingMarketingOpportunityUrl = rootUrl + "/crms/market/chance/save";
//显示所有/根据选中框查询（公司/联系人/概要）营销机会
const getMarketingOpportunityUrl = rootUrl + "/crms/market/chance/search";
//拿到当前公司的营销机会
const getCurrentCompanyOpportunityUrl = rootUrl + "/crms/market/chance/get";

const getOurContactNameUrl = rootUrl + "/crms/market/employees";

const updateMarketingOpportunityUrl = rootUrl + "/crms/market/chance/modify";

const deleteMarketingOpportunityUrl = rootUrl + "/crms/market/chance/delete";

const getPlansUrl = rootUrl + "/crms/market/plan/list";

const createPlansUrl = rootUrl + "/crms/market/plan/save";

const updatePlanUrl = rootUrl + "/crms/market/plan/modify";

const deletePlanOpportunityUrl = rootUrl + "/crms/market/plan/delete";

//客户信息管理
const getCompanyInfoUrl = rootUrl + "/crms/client/customer/get";

const createCustomerUrl = rootUrl + "/crms/client/customer/save";

const updateCustomerUrl = rootUrl + "/crms/client/customer/modify";

const getContactsUrl = rootUrl + "/crms/client/contact/list";

const updateContactUrl = rootUrl + "/crms/client/contact/modify";

const createContactUrl = rootUrl + "/crms/client/contact/save";

const deleteContactUrl = rootUrl + "/crms/client/contact/delete";

const getHistoryUrl = rootUrl + "/crms/client/indent/list";

const getHistoryDetailUrl = rootUrl +"/crms/client/indent";

const getIntercourseInfoUrl = rootUrl +"/crms/client/trades";

const createIntercourseDetailsUrl = rootUrl + "/crms/client/trade";

const updateIntercourseDetailsUrl = rootUrl + "/crms/client/trade/update";

const deleteInterCourseUrl = rootUrl + "/crms/client/trade/delete";

const getAndUpdateCustomerLoseUrl = rootUrl + "/crms/client/customer/lost";

const getAllCustomerUrl = rootUrl + "/crms/client/customers";

const getAllserviceUrl = rootUrl + "/crms/service/list";

const creatingServiceUrl = rootUrl + "/crms/service/";

const updateServiceUrl = rootUrl + "/crms/service/update";

const getOneserviceUrl = rootUrl + "/crms/service";

const getProductsUrl = rootUrl + "/crms/data/products";

const getStocksUrl = rootUrl + "/crms/data/stocks";

const consoleUrl = rootUrl + "/crms/statistc";

export default {
  rootUrl,
  loginUrl,
  registerUrl,
  logoutUrl,
  getCurrentLoginAccountInfoUrl,
  creatingMarketingOpportunityUrl,
  deleteMarketingOpportunityUrl,
  getMarketingOpportunityUrl,
  getOurContactNameUrl,
  getCurrentCompanyOpportunityUrl,
  createIntercourseDetailsUrl,
  updateMarketingOpportunityUrl,
  getPlansUrl,
  createPlansUrl,
  updatePlanUrl,
  deletePlanOpportunityUrl,
  getCompanyInfoUrl,
  createCustomerUrl,
  updateCustomerUrl,
  getContactsUrl,
  updateContactUrl,
  createContactUrl,
  deleteContactUrl,
  getHistoryUrl,
  getHistoryDetailUrl,
  getIntercourseInfoUrl,
  createIntercourseDetailsUrl,
  updateIntercourseDetailsUrl,
  deleteInterCourseUrl,
  getAndUpdateCustomerLoseUrl,
  getAllCustomerUrl,
  getAllserviceUrl,
  creatingServiceUrl,
  getOneserviceUrl,
  getProductsUrl,
  getStocksUrl,
  consoleUrl,
  updateServiceUrl,
};
