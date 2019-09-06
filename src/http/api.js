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

const getPlansUrl = rootUrl + "/crms/market/plan/list";

const createPlansUrl = rootUrl + "/crms/market/plan/save";

const updatePlanUrl = rootUrl + "/crms/market/plan/modify";




export default {
  rootUrl,
  loginUrl,
  registerUrl,
  logoutUrl,
  getCurrentLoginAccountInfoUrl,
  creatingMarketingOpportunityUrl,
  getMarketingOpportunityUrl,
  getOurContactNameUrl,
  getCurrentCompanyOpportunityUrl,
  updateMarketingOpportunityUrl,
  getPlansUrl,
  createPlansUrl,
  updatePlanUrl,
};
