document.getElementById("PayWithCardButton").addEventListener("click", payWithCard);
document.getElementById("PayWithApplePayButton").addEventListener("click", payWithApplePay);
document.getElementById("PayWithSamsunPayButton").addEventListener("click", payWithSamsungPay);
document.getElementById("PayWithSTCPayButton").addEventListener("click", payWithSTCPay);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    if (window.cordova.platformId == "ios") {
        document.getElementById('PayWithSamsunPayButton').style.display = "none";
    } else if (window.cordova.platformId == "android") {
        document.getElementById('PayWithApplePayButton').style.display = "none";;
    }
}

function onSuccess(result) {
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
};

function onError(error) {
    console.log(error)
};

function payWithCard() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*Profile ID*"
    configuration.serverKey= "*Server Key*"
    configuration.clientKey = "*Client Key*"
    configuration.cartID = "12345"
    configuration.currency = "SAR"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "sa"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.userOptinoal
    configuration.showBillingInfo = true
	configuration.showShippingInfo = true

    // Set samsung token to support SamsungPay 
    // configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+96611111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Riyadh",
        state= "Riyadh",
        countryCode= "SA",
        zip= "1234");

    configuration.billingDetails = billingDetails;
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
 
}

function payWithApplePay() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*Profile ID*"
    configuration.serverKey= "*Server Key*"
    configuration.clientKey = "*Client Key*"
    configuration.cartID = "12345"
    configuration.currency = "AED"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "ae"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.merchantApplePayIdentifier = "com.merchant.bundleid"
    configuration.simplifyApplePayValidation = true
    cordova.plugins.CordovaPaymentPlugin.startApplePayPayment(configuration, onSuccess, onError);
}

function payWithSamsungPay() {
    
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*Profile ID*"
    configuration.serverKey= "*Server Key*"
    configuration.clientKey = "*Client Key*"
    configuration.cartID = "12345"
    configuration.currency = "SAR"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "sa"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"

    // Set samsung token to support SamsungPay 
    configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+966111111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Riyadh",
        state= "Riyadh",
        countryCode= "SA",
        zip= "1234");

    configuration.billingDetails = billingDetails;
    cordova.plugins.CordovaPaymentPlugin.startCardPayment(configuration, onSuccess, onError);
 
}

function payWithSTCPay() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "*Profile ID*"
    configuration.serverKey= "*Server Key*"
    configuration.clientKey = "*Client Key*"
    configuration.cartID = "12345"
    configuration.currency = "SAR"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "SA"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.alternativePaymentMethods = [cordova.plugins.CordovaPaymentPlugin.AlternativePaymentMethod.stcPay]

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "96611111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Riyadh",
        state= "Riyadh",
        countryCode= "SA",
        zip= "1234");

    configuration.billingDetails = billingDetails;
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
 
}