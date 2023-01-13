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
  getSportsList: BASE_URL_API + '/api/exchange/sports/sportsList',
  getSlider: BASE_URL_V1 + '/v1/front/slider/getAllSlider',
  getAllEventsList: BASE_URL_API + '/api/exchange/market/matchodds/allEventsList',
  getCustomerSupport: BASE_URL_V1 + '/v1/exchange/support/getCustomerSupport',
  getCasinoInformation: BASE_URL_API+'/api/exchange/casino/casinoInformation',

};
