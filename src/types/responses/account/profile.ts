// types/responses/account/profile.ts

/**
 * Module containing response types related to profile for interactions with the Wallex.ir cryptocurrency exchange API.
 * @module types/responses/account/profile
 */

import type { Response } from "../response";

/**
 * Represents the address information.
 */
interface Address {
  city: string;           // The city name.
  country: string;        // The country name.
  location: string;       // The location.
  province: string;       // The province name.
  postal_code: string;    // The postal code.
  house_number: string;   // The house number.
}

/**
 * Represents the phone number information.
 */
interface PhoneNumber {
  area_code: string;    // The area code.
  main_number: string;  // The main number.
}

/**
 * Represents the actions' status.
 */
interface Actions {
  is_enable: boolean;  // Specifies whether the action is enabled.
  label: string;       // The label for the action.
}

/**
 * Represents the actions for notifications.
 */
interface NotificationActions {
  coin_deposit: Actions;                           // Actions for coin deposit notification.
  coin_withdraw: Actions;                          // Actions for coin withdraw notification.
  money_deposit: Actions;                          // Actions for money deposit notification.
  money_withdraw: Actions;                         // Actions for money withdraw notification.
  logins: Actions;                                 // Actions for logins notification.
  api_key_expiration: Actions;                     // Actions for API key expiration notification.
  manual_deposit: Actions;                         // Actions for manual deposit notification.
  payment_identifier: Actions;                     // Actions for payment identifier notification.
  rewards_hub_first_arrival: Actions;              // Actions for rewards hub first arrival notification.
  trading_bot: Actions;                            // Actions for trading bot notification.
  prop_change_status: Actions;                     // Actions for prop change status notification.
  demo_change_status: Actions;                     // Actions for demo change status notification.
  subscription_change_status: Actions;             // Actions for subscription change status notification.
  rewards_hub_claim_rewards_notification: Actions; // Actions for rewards hub claim rewards notification.
  rewards_hub_app_survey_notification?: Actions;  // Actions for rewards hub app survey notification (optional).
  rewards_hub_first_trade_notification?: Actions; // Actions for rewards hub first trade notification (optional).
}

/**
 * Represents the notification settings.
 */
interface Notification {
  email: {
    is_enable: boolean;         // Specifies whether email notification is enabled.
    actions: NotificationActions; // Actions for email notification.
    label: string;              // The label for email notification.
  };
  announcement: {
    is_enable: boolean;         // Specifies whether announcement notification is enabled.
    actions: NotificationActions; // Actions for announcement notification.
    label: string;              // The label for announcement notification.
  };
  push: {
    is_enable: boolean;         // Specifies whether push notification is enabled.
    actions: NotificationActions; // Actions for push notification.
    label: string;              // The label for push notification.
  };
  sms: {
    is_enable: boolean;         // Specifies whether SMS notification is enabled.
    actions: {
      rewards_hub_first_arrival: Actions;  // Actions for rewards hub first arrival SMS notification.
    };
    label: string;              // The label for SMS notification.
  };
}

/**
 * Represents the status information.
 */
interface Status {
  first_name: string;          // The first name.
  last_name: string;           // The last name.
  national_code: string;       // The national code.
  national_card_image: string; // The national card image URL.
  face_image: string;          // The face image URL.
  face_video: string;          // The face video URL.
  birthday: string;            // The birthday.
  address: string;             // The address.
  phone_number: string;        // The phone number.
  mobile_number: string;       // The mobile number.
  email: string;               // The email.
  financial_info: string;      // The financial information.
}

/**
 * Represents the KYC (Know Your Customer) information details.
 */
interface KycInfoDetails {
  mobile_activation: boolean;  // Specifies whether mobile activation is completed.
  personal_info: boolean;      // Specifies whether personal information is completed.
  financial_info: boolean;     // Specifies whether financial information is completed.
  phone_number: boolean;       // Specifies whether phone number verification is completed.
  national_card: boolean;      // Specifies whether national card verification is completed.
  face_recognition: boolean;   // Specifies whether face recognition is completed.
  admin_approval: boolean;     // Specifies whether admin approval is received.
}

/**
 * Represents the KYC (Know Your Customer) information.
 */
interface KycInfo {
  details: KycInfoDetails;  // The KYC details.
  level: number;             // The KYC level.
}

/**
 * Represents the meta information.
 */
interface Meta {
  disabled_features: string[];  // The disabled features.
}

/**
 * Represents the profile response returned by the API.
 */
export interface ProfileResponse {
  tracking_id: number;        // The tracking ID.
  first_name: string;         // The first name.
  last_name: string;          // The last name.
  national_code: string;      // The national code.
  face_image: string;         // The face image URL.
  birthday: string;           // The birthday.
  address: Address;           // The address information.
  phone_number: PhoneNumber;  // The phone number information.
  mobile_number: string;      // The mobile number.
  verification: string;       // The verification status.
  email: string;              // The email.
  invite_code: string;        // The invite code.
  avatar: null;               // The avatar (null in this case).
  commission: number;         // The commission.
  settings: {
    [key: string]: any;  // Dynamic settings.
    theme: string;       // The theme.
    mode: string;        // The mode.
    order_submit_confirm: boolean;  // Specifies whether order submit confirmation is required.
    order_delete_confirm: boolean;  // Specifies whether order delete confirmation is required.
    default_mode: boolean;          // Specifies whether default mode is enabled.
    favorite_markets: string[];     // The favorite markets.
    choose_trading_type: boolean;   // Specifies whether trading type can be chosen.
    coin_deposit: boolean;          // Specifies whether coin deposit is allowed.
    coin_withdraw: boolean;         // Specifies whether coin withdraw is allowed.
    money_deposit: boolean;         // Specifies whether money deposit is allowed.
    money_withdraw: boolean;        // Specifies whether money withdraw is allowed.
    logins: boolean;                // Specifies whether logins are allowed.
    trade: boolean;                 // Specifies whether trading is allowed.
    api_key_expiration: boolean;    // Specifies whether API key expiration is enabled.
    trading_bot: boolean;           // Specifies whether trading bot is enabled.
    payment_identifier: boolean;    // Specifies whether payment identifier is enabled.
    prop_change_status: boolean;    // Specifies whether prop change status is enabled.
    demo_change_status: boolean;    // Specifies whether demo change status is enabled.
    subscription_change_status: boolean;  // Specifies whether subscription change status is enabled.
    rewards_hub_first_arrival: boolean;  // Specifies whether rewards hub first arrival is enabled.
    rewards_hub_claim_rewards_notification: boolean;  // Specifies whether rewards hub claim rewards notification is enabled.
    rewards_hub_app_survey_notification: boolean;    // Specifies whether rewards hub app survey notification is enabled.
    notification: Notification;                      // The notification settings.
  };
  is_legal: boolean;          // Specifies whether the user is legal.
  status: Status;             // The user status information.
  kyc_info: KycInfo;          // The KYC information.
  meta: Meta;                 // The meta information.
}

/**
 * Represents the result of a profile response.
 */
export interface ProfileResult extends Response<ProfileResponse> {
}
