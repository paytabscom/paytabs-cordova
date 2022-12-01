//
//  CordovaPaymentPlugin.swift
//  HelloCordova
//
//  Created by Mohamed Adly on 12/04/2021.
//

import Foundation
import PaymentSDK
import UIKit

@objc(CordovaPaymentPlugin) class CordovaPaymentPlugin : CDVPlugin{
    var command: CDVInvokedUrlCommand!
    
    @objc(startCardPayment:) func startCardPayment(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        if let rootViewController = getRootController() {
            PaymentManager.startCardPayment(on: rootViewController, configuration: configuration, delegate: self)
        }
    }
        
    @objc(startTokenizedCardPayment:) func startTokenizedCardPayment(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        guard let token = command.arguments[1] as? String else { return }
        guard let transactionRef = command.arguments[2] as? String else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        if let rootViewController = getRootController() {
            PaymentManager.startTokenizedCardPayment(on: rootViewController, configuration: configuration, token: token, transactionRef: transactionRef,delegate: self)
        }
    }
        
    @objc(start3DSecureTokenizedCardPayment:) func start3DSecureTokenizedCardPayment(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        guard let savedCardInfoDic = command.arguments[1] as? [String: Any] else { return }
        guard let token = command.arguments[2] as? String else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        let savedCardInfo = generateSavedCardInfo(dictionary: savedCardInfoDic)
        if let rootViewController = getRootController() {
            PaymentManager.start3DSecureTokenizedCardPayment(on: rootViewController, configuration: configuration, savedCardInfo: savedCardInfo, token: token, delegate: self)
        }
    }
        
    @objc(startPaymentWithSavedCards:) func startPaymentWithSavedCards(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        guard let support3DS = command.arguments[1] as? Bool else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        if let rootViewController = getRootController() {
            PaymentManager.startPaymentWithSavedCards(on: rootViewController, configuration: configuration, support3DS: support3DS, delegate: self)
        }
    }
    
    @objc(startApplePayPayment:) func startApplePayPayment(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        if let rootViewController = getRootController() {
            PaymentManager.startApplePayPayment(on: rootViewController, configuration: configuration, delegate: self)
        }
    }
    
    @objc(startAlternativePaymentMethod:) func startAlternativePaymentMethod(_ command: CDVInvokedUrlCommand) {
        self.command = command
        guard let paymentDetails = command.arguments.first as? [String: Any] else { return }
        let configuration = generateConfiguration(dictionary: paymentDetails)
        if let rootViewController = getRootController() {
            PaymentManager.startAlternativePaymentMethod(on: rootViewController, configuration: configuration, delegate: self)
        }
    }
    
    func getRootController() -> UIViewController? {
        let keyWindow = UIApplication.shared.windows.first(where: { $0.isKeyWindow }) ?? UIApplication.shared.windows.first
        let topController = keyWindow?.rootViewController
        return topController
    }
    
    private func generateConfiguration(dictionary: [String: Any]) -> PaymentSDKConfiguration {
        let configuration = PaymentSDKConfiguration()
        configuration.profileID = dictionary["profileID"] as? String ?? ""
        configuration.serverKey = dictionary["serverKey"] as? String ?? ""
        configuration.clientKey = dictionary["clientKey"] as? String ?? ""
        configuration.cartID = dictionary["cartID"] as? String ?? ""
        configuration.cartDescription = dictionary["cartDescription"] as? String ?? ""
        configuration.amount = dictionary["amount"] as? Double ?? 0.0
        configuration.currency =  dictionary["currency"] as? String ?? ""
        configuration.merchantName = dictionary["merchantName"] as? String ?? ""
        configuration.screenTitle = dictionary["screenTitle"] as? String
        configuration.merchantCountryCode = dictionary["merchantCountryCode"] as? String ?? ""
        configuration.merchantIdentifier = dictionary["merchantApplePayIdentifier"] as? String
        configuration.simplifyApplePayValidation = dictionary["simplifyApplePayValidation"] as? Bool ?? false
        configuration.languageCode = dictionary["languageCode"] as? String
        configuration.forceShippingInfo = dictionary["forceShippingInfo"] as? Bool ?? false
        configuration.showBillingInfo = dictionary["showBillingInfo"] as? Bool ?? false
        configuration.showShippingInfo = dictionary["showShippingInfo"] as? Bool ?? false
        configuration.token = dictionary["token"] as? String
        configuration.transactionReference = dictionary["transactionReference"] as? String
        configuration.hideCardScanner = dictionary["hideCardScanner"] as? Bool ?? false
        configuration.serverIP = dictionary["serverIP"] as? String
        if let tokeniseType = dictionary["tokeniseType"] as? String,
           let type = mapTokeiseType(tokeniseType: tokeniseType) {
            configuration.tokeniseType = type
        }
        if let tokenFormat = dictionary["tokenFormat"] as? String,
           let type = TokenFormat.getType(type: tokenFormat) {
            configuration.tokenFormat = type
        }

        if let transactionType = dictionary["transactionType"] as? String {
            configuration.transactionType = TransactionType.init(rawValue: transactionType) ?? .sale
        }
        
        if let themeDictionary = dictionary["theme"] as? [String: Any],
           let theme = generateTheme(dictionary: themeDictionary) {
            configuration.theme = theme
        } else {
            configuration.theme = .default
        }
        if let billingDictionary = dictionary["billingDetails"] as?  [String: Any] {
            configuration.billingDetails = generateBillingDetails(dictionary: billingDictionary)
        }
        if let shippingDictionary = dictionary["shippingDetails"] as?  [String: Any] {
            configuration.shippingDetails = generateShippingDetails(dictionary: shippingDictionary)
        }

        if let alternativePaymentMethods = dictionary["alternativePaymentMethods"] as? [String] {
            configuration.alternativePaymentMethods = generateAlternativePaymentMethods(apmsArray: alternativePaymentMethods)
        }
        return configuration
    }

    private func generateSavedCardInfo(dictionary: [String: Any]) -> PaymentSDKSavedCardInfo {
        let maskedCard = dictionary["maskedCard"] as? String ?? ""
        let cardType = dictionary["cardType"] as? String ?? ""
        let savedCardInfo = PaymentSDKSavedCardInfo(maskedCard: maskedCard, cardType: cardType)
        

        return savedCardInfo
    }
    
    
    private func generateBillingDetails(dictionary: [String: Any]) -> PaymentSDKBillingDetails? {
        let billingDetails = PaymentSDKBillingDetails()
        billingDetails.name = dictionary["name"] as? String ?? ""
        billingDetails.phone = dictionary["phone"] as? String ?? ""
        billingDetails.email = dictionary["email"] as? String ?? ""
        billingDetails.addressLine = dictionary["addressLine"] as? String ?? ""
        billingDetails.countryCode = dictionary["countryCode"] as? String ?? ""
        billingDetails.city = dictionary["city"] as? String ?? ""
        billingDetails.state = dictionary["state"] as? String ?? ""
        billingDetails.zip = dictionary["zip"] as? String ?? ""
        return billingDetails
    }

    private func generateShippingDetails(dictionary: [String: Any]) -> PaymentSDKShippingDetails? {
        let shippingDetails = PaymentSDKShippingDetails()
        shippingDetails.name = dictionary["name"] as? String ?? ""
        shippingDetails.phone = dictionary["phone"] as? String ?? ""
        shippingDetails.email = dictionary["email"] as? String ?? ""
        shippingDetails.addressLine = dictionary["addressLine"] as? String ?? ""
        shippingDetails.countryCode = dictionary["countryCode"] as? String ?? ""
        shippingDetails.city = dictionary["city"] as? String ?? ""
        shippingDetails.state = dictionary["state"] as? String ?? ""
        shippingDetails.zip = dictionary["zip"] as? String ?? ""
        return shippingDetails
    }
    
    private func generateAlternativePaymentMethods(apmsArray: [String]) -> [AlternativePaymentMethod] {
        var apms = [AlternativePaymentMethod]()
        for apmValue in apmsArray {
            if let apm = AlternativePaymentMethod.init(rawValue: apmValue) {
                apms.append(apm)
            }
        }
        return apms
    }

    private func generateTheme(dictionary: [String: Any]) -> PaymentSDKTheme? {
        let theme = PaymentSDKTheme.default
        if let imageName = dictionary["logoImage"] as? String {
            theme.logoImage = UIImage(named: imageName)
        }
        if let colorHex = dictionary["primaryColor"] as? String {
            theme.primaryColor = UIColor(hex: colorHex)
        }
        if let colorHex = dictionary["primaryFontColor"] as? String {
            theme.primaryFontColor = UIColor(hex: colorHex)
        }
        if let fontName = dictionary["primaryFont"] as? String {
            theme.primaryFont = UIFont.init(name: fontName, size: 16)
        }
        if let colorHex = dictionary["secondaryColor"] as? String {
            theme.secondaryColor = UIColor(hex: colorHex)
        }
        if let colorHex = dictionary["secondaryFontColor"] as? String {
            theme.secondaryFontColor = UIColor(hex: colorHex)
        }
        if let fontName = dictionary["secondaryFont"] as? String {
            theme.secondaryFont = UIFont.init(name: fontName, size: 16)
        }
        if let colorHex = dictionary["strokeColor"] as? String {
            theme.strokeColor = UIColor(hex: colorHex)
        }
        if let value = dictionary["strokeThinckness"] as? CGFloat {
            theme.strokeThinckness = value
        }
        if let value = dictionary["inputsCornerRadius"] as? CGFloat {
            theme.inputsCornerRadius = value
        }
        if let colorHex = dictionary["buttonColor"] as? String {
            theme.buttonColor = UIColor(hex: colorHex)
        }
        if let colorHex = dictionary["buttonFontColor"] as? String {
            theme.buttonFontColor = UIColor(hex: colorHex)
        }
        if let fontName = dictionary["buttonFont"] as? String {
            theme.buttonFont = UIFont.init(name: fontName, size: 16)
        }
        if let colorHex = dictionary["titleFontColor"] as? String {
            theme.titleFontColor = UIColor(hex: colorHex)
        }
        if let fontName = dictionary["titleFont"] as? String {
            theme.titleFont = UIFont.init(name: fontName, size: 16)
        }
        if let colorHex = dictionary["backgroundColor"] as? String {
            theme.backgroundColor = UIColor(hex: colorHex)
        }
        if let colorHex = dictionary["placeholderColor"] as? String {
            theme.placeholderColor = UIColor(hex: colorHex)
        }
        return theme
    }
    
    // to be fixed in next versions
    private func mapTokeiseType(tokeniseType: String) -> TokeniseType? {
        var type = 0
        switch tokeniseType {
        case "userOptional":
            type = 3
        case "userMandatory":
            type = 2
        case "merchantMandatory":
            type = 1
        default:
            break
        }
        return TokeniseType.getType(type: type)
    }
    
    private func sendPluginResult(code: Int, message: String, status: String, transactionDetails: [String: Any]? = nil) {
        var response = [String: Any]()
        response["code"] = code
        response["message"] = message
        response["status"] = status
        if let transactionDetails = transactionDetails {
            response["data"] = transactionDetails
        }
        
        let result = CDVPluginResult(status: CDVCommandStatus.ok , messageAs: response)
        commandDelegate.send(result, callbackId: self.command.callbackId)
    }
}

extension CordovaPaymentPlugin: PaymentManagerDelegate {
    func paymentManager(didCancelPayment error: Error?) {
        sendPluginResult(code: 0, message: "Cancelled", status: "event")
    }
    
    func paymentManager(didFinishTransaction transactionDetails: PaymentSDKTransactionDetails?, error: Error?) {
        if let error = error {
            return sendPluginResult(code: (error as NSError).code,
                             message: error.localizedDescription,
                             status: "error")
        }
        do {
            let encoder = JSONEncoder()
            let data = try encoder.encode(transactionDetails)
            let dictionary = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String: Any]
            sendPluginResult(code: 200,
                      message: "",
                      status: "success",
                      transactionDetails: dictionary)
        } catch  {
            sendPluginResult(code: (error as NSError).code,
                      message: error.localizedDescription,
                      status: "error")
        }
    }
}

extension UIColor {
    convenience init(hex:String, alpha:CGFloat = 1.0) {
        var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        var rgbValue:UInt32 = 10066329 //color #999999 if string has wrong format
        
        if (cString.hasPrefix("#")) {
            cString.remove(at: cString.startIndex)
        }
        
        if ((cString.count) == 6) {
            Scanner(string: cString).scanHexInt32(&rgbValue)
        }
        
        self.init(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: alpha
        )
    }
}
