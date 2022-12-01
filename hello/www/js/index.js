document.getElementById("PayWithToken").addEventListener("click", payWithToken);
document.getElementById("PayWithSavedCards").addEventListener("click", payWithSavedCards);
document.getElementById("PayWith3DSTokenizedPayment").addEventListener("click", payWith3DSTokenizedPayment);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
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
    configuration.profileID = "63904"
    configuration.serverKey= "STJNNNTDKB-JBKWMD9Z9R-LKLNZBJLG2"
    configuration.clientKey = "CHKMMD-6MQ962-KVNDP9-NVRM92"
    configuration.cartID = "12345"
    configuration.currency = "EGP"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "eg"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.merchantMandatory
    configuration.showBillingInfo = true
	configuration.showShippingInfo = true

    // Set samsung token to support SamsungPay 
    // configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+9731111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Dubai",
        state= "Dubai",
        countryCode= "AE",
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


function payWithToken() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "63904"
    configuration.serverKey= "STJNNNTDKB-JBKWMD9Z9R-LKLNZBJLG2"
    configuration.clientKey = "CHKMMD-6MQ962-KVNDP9-NVRM92"
    configuration.cartID = "12345"
    configuration.currency = "EGP"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "eg"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.merchantMandatory
    configuration.showBillingInfo = true
	configuration.showShippingInfo = true

    // Set samsung token to support SamsungPay 
    // configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+9731111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Dubai",
        state= "Dubai",
        countryCode= "AE",
        zip= "1234");

    configuration.billingDetails = billingDetails;
    cordova.plugins.CordovaPaymentPlugin.startTokenizedCardPayment(configuration, "2C4652BF67A3EA33C6B590FE658078BD", "TST2224201325593", function (result) {
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

function payWithSavedCards() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "63904"
    configuration.serverKey= "STJNNNTDKB-JBKWMD9Z9R-LKLNZBJLG2"
    configuration.clientKey = "CHKMMD-6MQ962-KVNDP9-NVRM92"
    configuration.cartID = "12345"
    configuration.currency = "EGP"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "eg"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.merchantMandatory
    configuration.showBillingInfo = true
	configuration.showShippingInfo = true

    // Set samsung token to support SamsungPay 
    // configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+9731111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Dubai",
        state= "Dubai",
        countryCode= "AE",
        zip= "1234");

    configuration.billingDetails = billingDetails;
    cordova.plugins.CordovaPaymentPlugin.startPaymentWithSavedCards(configuration, false, function (result) {
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

function payWith3DSTokenizedPayment() {
    var configuration = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKConfiguration();
    configuration.profileID = "63904"
    configuration.serverKey= "STJNNNTDKB-JBKWMD9Z9R-LKLNZBJLG2"
    configuration.clientKey = "CHKMMD-6MQ962-KVNDP9-NVRM92"
    configuration.cartID = "12345"
    configuration.currency = "EGP"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "eg"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.tokeniseType = cordova.plugins.CordovaPaymentPlugin.TokeniseType.merchantMandatory
    configuration.showBillingInfo = true
	configuration.showShippingInfo = true

    // Set samsung token to support SamsungPay 
    // configuration.samsungToken = "samsung token"

    let billingDetails = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKBillingDetails(
        name= "John Smith",
        email= "email@domain.com",
        phone= "+9731111111",
        addressLine= "Flat 1,Building 123, Road 2345",
        city= "Dubai",
        state= "Dubai",
        countryCode= "AE",
        zip= "1234");

    let savedCardInfo = new cordova.plugins.CordovaPaymentPlugin.PaymentSDKSavedCardInfo(
        "4111 11## #### 1111",
        "visa"
    );
    configuration.billingDetails = billingDetails;
    cordova.plugins.CordovaPaymentPlugin.start3DSecureTokenizedCardPayment(configuration, savedCardInfo, "2C4652BF67A3EA33C6B590FE658078BD", function (result) {
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
