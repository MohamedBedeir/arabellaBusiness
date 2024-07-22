export default {
  baseUrl: 'https://onaddress.net/api/client/mobile/',
  //=========================
  login: 'auth/login',
  verifyOTP: `auth/otp`,











  register: 'auth/register',
  confirm_code: 'auth/confirm',
  forgot_password: 'auth/password/forget',
  reset_password: 'auth/password/reset',
  update_password: 'auth/update-password',
  user_data: 'auth/client-info',
  update_user_data: 'auth/update-data',
  upgraded_user_data: 'auth/update-company-details',
  types: 'properties/types',
  categories: 'properties/categories',
  facilities: 'properties/facilities',
  features: 'properties/features',
  allCities: 'api/client/mobile/cities',
  cities: 'cities',
  areas: 'areas',
  sliders:'sliders',
  create_property: 'properties/create',
  edit_property: 'properties/edit',
  removeImages: 'properties/remove-image',
  uploadImage: 'properties/upload-image',
  allProperties: 'all-properties',
  properties: 'properties',
  requests: 'requests-properties',
  request_change_state: 'requests-properties/change-status',
  all_requests: 'public-all-properties-requests',
  agents: 'all-clients',
  settings: 'settings',
  reports_reasons: 'reports/reasons',
  create_report: 'reports/create',
  getfavouritesProperty: 'properties/favourites/list-properties',
  getfavouritesRequest: 'properties/favourites/list-properties-requests',
  createfavourites: 'properties/favourites/create',
  deletefavourites: 'properties/favourites/delete',
  plans: 'plans',
  myPlan: 'my-plan',
  buyPlan:'buy-plan',
  transactions: 'transactions-history',
  contactUs: 'contact-us',
  save_fcm_token: 'auth/save-fcm-token',
  all_notifications: 'auth/all-notifications',
  unread_notifications: 'auth/unread-notifications',
  make_notification_read: 'auth/make-notification-read',
};
