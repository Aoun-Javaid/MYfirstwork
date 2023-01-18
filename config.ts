const BASE_URL_API = 'http://130.172.2.149:4444';
const BASE_URL_V1 = "http://130.172.1.139:4567";

export const CONFIG = {

  registerUserURL: BASE_URL_V1 + '/v1/exchange/user/userRegisterVerify',
  withdrawRequestURL: BASE_URL_V1 + '/exchange/bank/withdrawal',
  withdrawListURL: BASE_URL_V1 + '/v1/exchange/users/getWithdrawalList',
  cancelWithdrawURL: BASE_URL_V1 + '/v1/exchange/users/cancelWithdrawalRequest',
  depositeDetailURL: BASE_URL_V1 + '/exchange/bank/deposit_details',
  getRacingEvents: BASE_URL_API + '/api/exchange/events/getRacingEvents',
  sendOTPUserURL: BASE_URL_V1 + '/v1/exchange/user/userRegisterOtpSent',
  resetPasswordURL: BASE_URL_V1 + '/v1/exchange/user/userForgotPasswordVerify',
  sendOTPTransferRequest: BASE_URL_V1 + '/exchange/transfer/amount_request',
  nameFromMobileURL: BASE_URL_V1 + '/exchange/get/user_mobileno',
  registerUserSpeedURL: BASE_URL_V1 + '/front/signup/cbtfspeed',
  getSportsList: BASE_URL_API + '/api/exchange/sports/sportsList',//
  getSlider: BASE_URL_V1 + '/v1/front/slider/getAllSlider',//
  getAllEventsList: BASE_URL_API + '/api/exchange/market/matchodds/allEventsList',//
  getCustomerSupport: BASE_URL_V1 + '/v1/exchange/support/getCustomerSupport',//
  getCasinoInformation: BASE_URL_API+'/api/exchange/casino/casinoInformation',//
  getDaysWiseEvents:BASE_URL_API+'/api/exchange/events/getDaysWiseEvents',//
  getUserProfile:BASE_URL_V1+'/v1/exchange/users/profile/getUserProfile',
  userLogin:BASE_URL_V1+'/v1/users/userLogin',//
  getIpLocation:'https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04',//
  getUserBalance:BASE_URL_V1+'/v1/exchange/users/balance/getUserBalance',
  changeUserPassword:BASE_URL_V1+'/v1/exchange/users/changeUserPassword',
  getUserBetStake:BASE_URL_V1+'/v1/exchange/users/getUserBetStake',
  updateUserBetStake:BASE_URL_V1+'/v1/exchange/users/updateUserBetStake',
  getExchangeNews:BASE_URL_API+'/api/exchange/news/getExchangeNews',
  withdrawalRequest:BASE_URL_V1+'/v1/exchange/users/withdrawalRequest',
  calculateWithdrawalAmount:BASE_URL_V1+'/v1/exchange/users/calculateWithdrawalAmount',
  userRegisterOtpSent:BASE_URL_V1+'/v1/exchange/user/userRegisterOtpSent',
  userRegisterVerify:BASE_URL_V1+'/v1/exchange/user/userRegisterVerify',
  getWithdrawalList:BASE_URL_V1+'/v1/exchange/users/getWithdrawalList',
  deleteWithdrawalBankDetails:BASE_URL_V1+'/v1/exchange/users/deleteWithdrawalBankDetails',
  getWithdrawalBankDetails:BASE_URL_V1+'/v1/exchange/users/getWithdrawalBankDetails',
  addWithdrawalBank:BASE_URL_V1+'/v1/exchange/users/addWithdrawalBank',
  uploadPaymentDetails:BASE_URL_V1+'/v1/exchange/users/uploadPaymentDetails',
  getDepositDetails:BASE_URL_V1+'/v1/exchange/users/getDepositDetails',


  getFancyPlURL: BASE_URL_V1 + '/v1/exchange/users/pl/getFancyPL',
  getManualPLURL: BASE_URL_V1 + '/v1/exchange/users/pl/getBookmakersPl',
  getSportbookPLURL: BASE_URL_V1 + '/v1/exchange/users/pl/getSportsbookPl',
  getBinaryPLURL: BASE_URL_V1 + '/v1/exchange/users/pl/getBinaryPl',
  getAllMarketplURL: BASE_URL_V1 + '/v1/exchange/users/pl/getMatchOddsPl',
  placeBetURL: BASE_URL_V1 + "/v1/exchange/users/placebet",
  videoStreamURL: BASE_URL_V1 + '/v1/exchange/users/streaming/getEventStreaming',
  getRulesOfMarketURL: BASE_URL_API + '/api/exchange/rules/getSportRules',
  getbookieFancyDataURL: BASE_URL_API + "/api/exchange/market/getMarketsOfEventList",
  fancyBookListByMarketURL: BASE_URL_V1 + '/v1/exchange/users/books/getFancybooks',
  userGetStackURL: BASE_URL_V1 + '/v1/exchange/users/getUserBetStake',
  userAccountStatement: BASE_URL_V1 + '/v1/exchange/users/banking/userAccountStatement',
  userSettledBetList: BASE_URL_V1 + '/v1/exchange/users/betlist/userSettledBetList',
  userSportsProfitloss: BASE_URL_V1 + '/v1/exchange/users/profitloss/userSportsProfitloss',
  getPasswordHistory: 'v1/exchange/users/getPasswordChangeHistory',
  userEventsProfitloss:BASE_URL_V1 +  '/v1/exchange/users/profitloss/userEventsProfitloss',
  userMarketsProfitloss: BASE_URL_V1 + '/v1/exchange/users/profitloss/userMarketsProfitloss',
  getUserBetList:BASE_URL_V1 +  '/v1/exchange/users/betlist/getUserBetList',

  




};


export const STACK_VALUE = [
  {
    stakeName: '1000',
    stakeAmount: '1000'
  },
  {
    stakeName: '5000',
    stakeAmount: '5000'
  },
  {
    stakeName: '10000',
    stakeAmount: '10000'
  },
  {
    stakeName: '25000',
    stakeAmount: '25000'
  },
  {
    stakeName: '50000',
    stakeAmount: '50000'
  },
  {
    stakeName: '100000',
    stakeAmount: '100000'
  },
  {
    stakeName: '200000',
    stakeAmount: '200000'
  },
  {
    stakeName: '500000',
    stakeAmount: '500000'
  },
];
