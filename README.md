
# Cordova PayTabs Plugin
![Version](https://img.shields.io/badge/Cordova%20PayTabs%20Plugin-v1.1.1-green)
[![npm](https://img.shields.io/npm/l/cordova-plugin-paytabs.svg)](https://www.npmjs.com/package/cordova-plugin-paytabs/)
[![npm](https://img.shields.io/npm/dm/cordova-plugin-paytabs.svg)](https://www.npmjs.com/package/cordova-plugin-paytabs)

Cordova PayTabs Plugin is a wrapper for the native PayTabs Android and iOS SDKs, It helps you integrate with PayTabs payment gateway.

Plugin Support:

* [x] iOS
* [x] Android

# Installation

```
$ cordova plugin add com.paytabs.cordova.plugin
```
## Usage

### Pay with Card

1. Configure the billing & shipping info, the shipping info is optional

```javascript
let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "+ 2011111111",
                                  addressLine= "address line",
                                  city= "Dubai",
                                  state= "Dubai",
                                  countryCode= "ae", // ISO alpha 2
                                  zip= "1234")
let shippingDetails = new cordova.plugins.CordovaPaymentPlugin. PaymentSDKShippingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "+ 2011111111",
                                  addressLine= "address line",
                                  city= "Dubai",
                                  state= "Dubai",
                                  countryCode= "ae", // ISO alpha 2
                                  zip= "1234")
                                              
```

2. Create object of `PaymentSDKConfiguration` and fill it with your credentials and payment details.

```javascript
let configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*your profile id*"
    configuration.serverKey= "*server key*"
    configuration.clientKey = "*client key*"
    configuration.cartID = "545454"
    configuration.currency = "AED"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "ae"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.billingDetails = billingDetails
    configuration.forceShippingInfo = false
```

Options to show billing and shipping ifno

```javascript
	configuration.showBillingInfo = true
	configuration.showShippingInfo = true
```

3. Start payment by calling `startCardPayment` method and handle the transaction details 

```javascript
cordova.plugins.CordovaPaymentPlugin.startCardPayment(configuration, function (result) {
        if (result["status"] == "success") {
            // Handle transaction details here.
            var transactionDetails = result["data"];
            console.log("responseCode:" + transactionDetails.paymentResult.responseCode)
            console.log("transactionTime:" + transactionDetails.paymentResult.transactionTime)
            console.log("responseMessage:" + transactionDetails.paymentResult.responseMessage)
            console.log("transactionReference:" + transactionDetails.transactionReference)
            console.log("token:" + transactionDetails.token)
          } else if (result["status"] == "error") {
            // Handle error here the code and message.
          } else if (result["status"] == "event") {
            // Handle events here.
          }
    }, function (error) {
        console.log(error)
    });
```

### Pay with Apple Pay

1. Follow the guide [Steps to configure Apple Pay][applepayguide] to learn how to configure ApplePay with PayTabs.

2. Do the steps 1 and 2 from **Pay with Card** although you can ignore Billing & Shipping details and Apple Pay will handle it, also you must pass the **merchant name** and **merchant identifier**.

```javascript
configuration.merchantApplePayIdentifier = "com.merchant.bundleid"
```

3. To simplify ApplePay validation on all user's billing info, pass **simplifyApplePayValidation** parameter in the configuration with **true**.

```javascript
configuration.simplifyApplePayValidation = true
```

4. Call `startApplePayPayment` to start payment

```javascript
cordova.plugins.CordovaPaymentPlugin.startApplePayPayment(configuration, function (result) {
        if (result["status"] == "success") {
            // Handle transaction details here.
            var transactionDetails = result["data"];
            console.log("responseCode:" + transactionDetails.paymentResult.responseCode)
            console.log("transactionTime:" + transactionDetails.paymentResult.transactionTime)
            console.log("responseMessage:" + transactionDetails.paymentResult.responseMessage)
            console.log("transactionReference:" + transactionDetails.transactionReference)
            console.log("token:" + transactionDetails.token)
          } else if (result["status"] == "error") {
            // Handle error here the code and message.
          } else if (result["status"] == "event") {
            // Handle events here.
          }
    }, function (error) {
        console.log(error)
    });
```

### Pay with Samsung Pay

Pass Samsung Pay token to the configuration and call `startCardPayment`

```javascript
configuration.samsungToken = "token"
```

## Enums

Those enums will help you in customizing your configuration.

* Tokenise types

 The default type is none

```javascript
exports.TokeniseType = Object.freeze({
"none":"none", // tokenise is off
"merchantMandatory":"merchantMandatory", // tokenise is forced
"userMandatory":"userMandatory", // tokenise is forced as per user approval
"userOptinoal":"userOptional" // tokenise if optional as per user approval
});
```

```javascript
configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.userOptinoal
```

* Token formats

The default format is hex32

```javascript
exports.TokeniseFromat = Object.freeze({"none":"1", 
"hex32": "2", 
"alphaNum20": "3", 
"digit22": "3", 
"digit16": "5", 
"alphaNum32": "6"
});
```

```javascript
configuration.tokeniseFormat = cordova.plugins.CordovaPaymentPlugin.TokeniseFromat.hex32
```

* Transaction types

The default type is sale

```javascript
const TransactionType = Object.freeze({"sale":"sale", 
"authorize": "auth"});
```

```javascript
configuration.transactionType = TransactionType.sale
```

## Demo application

Check our complete [sample][sample].

<img src="https://user-images.githubusercontent.com/13621658/109432386-905e5280-7a13-11eb-847c-63f2c554e2d1.png" width="370">

## License

See [LICENSE][license].

## PayTabs

[Support][1] | [Terms of Use][2] | [Privacy Policy][3]

 [1]: https://www.paytabs.com/en/support/
 [2]: https://www.paytabs.com/en/terms-of-use/
 [3]: https://www.paytabs.com/en/privacy-policy/
 [license]: https://github.com/paytabscom/paytabs-cordova/blob/master/LICENSE
 [applepayguide]: https://github.com/paytabscom/paytabs-cordova/blob/master/ApplePayConfiguration.md
 [sample]: https://github.com/paytabscom/paytabs-cordova/tree/master/sample

