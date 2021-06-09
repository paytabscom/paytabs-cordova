
# Cordova ClickPay Plugin
![Version](https://img.shields.io/badge/Cordova%20ClickPay%20Plugin-v1.2.1-green)
[![npm](https://img.shields.io/npm/l/cordova-plugin-clickpay.svg)](https://www.npmjs.com/package/cordova-plugin-clickpay/)
[![npm](https://img.shields.io/npm/dm/cordova-plugin-clickpay.svg)](https://www.npmjs.com/package/cordova-plugin-clickpay)

Cordova ClickPay Plugin is a wrapper for the native ClickPay Android and iOS SDKs, It helps you integrate with ClickPay payment gateway.

Plugin Support:

* [x] iOS
* [x] Android

# Installation

```
$ cordova plugin add cordova-plugin-clickpay
```

### Android - Prerequisites
Open `gradle.properties` and set the flags useAndroidX and enableJetifier with true.

```
android.useAndroidX=true
android.enableJetifier=true
```

## Usage

### Pay with Card

1. Configure the billing & shipping info, the shipping info is optional

```javascript
let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "9661111111",
                                  addressLine= "address line",
                                  city= "Riyadh",
                                  state= "Riyadh",
                                  countryCode= "sa", // ISO alpha 2
                                  zip= "1234")
let shippingDetails = new cordova.plugins.CordovaPaymentPlugin. PaymentSDKShippingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "96611111111",
                                  addressLine= "address line",
                                  city= "Riyadh",
                                  state= "Riyadh",
                                  countryCode= "sa", // ISO alpha 2
                                  zip= "1234")
                                              
```

2. Create object of `PaymentSDKConfiguration` and fill it with your credentials and payment details.

```javascript
let configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*your profile id*"
    configuration.serverKey= "*server key*"
    configuration.clientKey = "*client key*"
    configuration.cartID = "545454"
    configuration.currency = "SAR"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "sa"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.billingDetails = billingDetails
    configuration.forceShippingInfo = false
```

Options to show billing and shipping info

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

1. Follow the guide [Steps to configure Apple Pay][applepayguide] to learn how to configure ApplePay with ClickPay.

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
### Pay with Alternative Payment Methods

It becomes easy to integrate with other payment methods in your region like STCPay, OmanNet, KNet, Valu, Fawry, UnionPay, and Meeza, to serve a large sector of customers.

1. Do the steps 1 and 2 from **Pay with Card**.

2. Choose one or more of the payment methods you want to support.

```javascript
configuration.alternativePaymentMethods = [AlternativePaymentMethod.stcPay]
```

3. Start payment by calling `startAlternativePaymentMethod` method and handle the transaction details 

```javascript

cordova.plugins.CordovaPaymentPlugin.startAlternativePaymentMethod(configuration, function (result) {
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
configuration.transactionType = cordova.plugins.CordovaPaymentPlugin.TransactionType.sale
```

* Alternative payment methods

```javascript
AlternativePaymentMethod = Object.freeze({"unionPay":"unionpay", 
"stcPay":"stcpay", 
"valu": "valu", 
"meezaQR": "meezaqr", 
"omannet": "omannet", 
"knetCredit": "knetcredit", 
"knetDebit": "knetdebit", 
"fawry": "fawry"});
 ```
 
 ```javascript
configuration.alternativePaymentMethods = [cordova.plugins.CordovaPaymentPlugin.AlternativePaymentMethod.stcPay, ...]
 ```

## Demo application

Check our complete [sample][sample].

<img src="https://user-images.githubusercontent.com/13621658/109432386-905e5280-7a13-11eb-847c-63f2c554e2d1.png" width="370">

## License

See [LICENSE][license].

## ClickPay

[Support][1] | [Terms of Use][2] | [Privacy Policy][3]

 [1]: https://merchant.clickpay.com.sa/
 [2]: https://merchant.clickpay.com.sa/
 [3]: https://merchant.clickpay.com.sa/
 [license]: https://github.com/paytabscom/paytabs-cordova/blob/clickpay/LICENSE
 [applepayguide]: https://github.com/paytabscom/paytabs-cordova/blob/clickpay/ApplePayConfiguration.md
 [sample]: https://github.com/paytabscom/paytabs-cordova/tree/clickpay/sample

