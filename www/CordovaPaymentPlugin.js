var exec = require('cordova/exec');

exports.TokeniseType = Object.freeze({"none":"none", "merchantMandatory":"merchantMandatory","userMandatory":"userMandatory","userOptinoal":"userOptional"});
exports.TokeniseFromat = Object.freeze({"none":"1", "hex32": "2", "alphaNum20": "3", "digit22": "3", "digit16": "5", "alphaNum32": "6"});
exports.TransactionType = Object.freeze({"sale":"sale", "authorize": "auth"});
exports.TransactionClass = Object.freeze({"ecom":"ecom", "recurring":"recur"});

exports.startCardPayment = function (arg0, success, error) {
    exec(success, error, 'CordovaPaymentPlugin', 'startCardPayment', [arg0]);
};

exports.startApplePayPayment = function (arg0, success, error) {
    exec(success, error, 'CordovaPaymentPlugin', 'startApplePayPayment', [arg0]);
};

exports.PaymentSDKBillingDetails = function(name, email, phone, addressLine, city, state, countryCode, zip) {
    this.name = name
    this.email = email
    this.phone = phone
    this.addressLine = addressLine
    this.city = city
    this.state = state
    this.countryCode = countryCode
    this.zip = zip
};

exports.PaymentSDKShippingDetails = function(name, email, phone, addressLine, city, state, countryCode, zip) {
    this.name = name
    this.email = email
    this.phone = phone
    this.addressLine = addressLine
    this.city = city
    this.state = state
    this.countryCode = countryCode
    this.zip = zip
};

exports.PaymentSDKTheme = function(logoImage, 
        primaryColor, 
        primaryFontColor,
        primaryFont, 
        secondaryColor, 
        secondaryFontColor,
        secondaryFont, 
        strokeColor, 
        strokeThinckness,
        inputsCornerRadius, 
        buttonColor, 
        buttonFontColor,
        buttonFont, 
        titleFontColor, 
        titleFont,
        backgroundColor, 
        placeholderColor) {
            this.logoImage = logoImage
            this.primaryColor = primaryColor
            this.primaryFontColor = primaryFontColor
            this.primaryFont = primaryFont
            this.secondaryColor = secondaryColor
            this.secondaryFontColor = secondaryFontColor
            this.secondaryFont = secondaryFont
            this.strokeColor = strokeColor
            this.strokeThinckness = strokeThinckness
            this.inputsCornerRadius = inputsCornerRadius
            this.buttonColor = buttonColor
            this.buttonFontColor = buttonFontColor
            this.buttonFont = buttonFont
            this.titleFontColor = titleFontColor
            this.titleFont = titleFont
            this.backgroundColor = backgroundColor
            this.placeholderColor = placeholderColor
};

exports.PaymentSDKConfiguration = function (profileID, serverKey, clientKey,
                    transactionType, transactionClass, cartID, currency, amount,
                    cartDescription,
                    languageCode,
                    forceShippingInfo,
                    showBillingInfo,
                    showShippingInfo,
                    billingDetails,
                    shippingDetails,
                    merchantCountryCode,
                    screenTitle,
                    merchantName,
                    serverIP,
                    tokeniseType,
                    tokenFormat,
                    hideCardScanner,
                    merchantApplePayIdentifier,
                    simplifyApplePayValidation,
                    supportedApplePayNetworks,
                    token,
                    transactionReference,
                    samsungToken,
                    theme) {
        this.profileID = profileID;
        this.serverKey = serverKey;
        this.clientKey = clientKey;
        this.transactionType = transactionType
        this.transactionClass = transactionClass
        this.cartID = cartID;
        this.currency = currency;
        this.amount = amount;
        this.cartDescription = cartDescription
        this.languageCode = languageCode
        this.forceShippingInfo = forceShippingInfo
        this.showBillingInfo = showBillingInfo
        this.showShippingInfo = showShippingInfo
        this.billingDetails = billingDetails
        this.shippingDetails = shippingDetails
        this.merchantCountryCode = merchantCountryCode
        this.screenTitle = screenTitle
        this.merchantName = merchantName
        this.serverIP = serverIP
        this.tokeniseType = tokeniseType
        this.tokenFormat = tokenFormat
        this.hideCardScanner = hideCardScanner
        this.merchantApplePayIdentifier = merchantApplePayIdentifier
        this.simplifyApplePayValidation = simplifyApplePayValidation
        this.supportedApplePayNetworks = supportedApplePayNetworks
        this.token = token
        this.transactionReference = transactionReference
        this.theme = theme
        this.samsungToken = samsungToken
};