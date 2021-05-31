package com.paymentsdk.cordova.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import static com.payment.paymentsdk.integrationmodels.PaymentSdkApmsKt.createPaymentSdkApms;
import static com.payment.paymentsdk.integrationmodels.PaymentSdkLanguageCodeKt.createPaymentSdkLanguageCode;
import static com.payment.paymentsdk.integrationmodels.PaymentSdkTokenFormatKt.createPaymentSdkTokenFormat;
import static com.payment.paymentsdk.integrationmodels.PaymentSdkTokeniseKt.createPaymentSdkTokenise;
import static com.payment.paymentsdk.integrationmodels.PaymentSdkTransactionTypeKt.createPaymentSdkTransactionType;

import com.google.gson.Gson;
import com.payment.paymentsdk.PaymentSdkActivity;
import com.payment.paymentsdk.PaymentSdkConfigBuilder;
import com.payment.paymentsdk.integrationmodels.PaymentSdkApms;
import com.payment.paymentsdk.integrationmodels.PaymentSdkBillingDetails;
import com.payment.paymentsdk.integrationmodels.PaymentSdkConfigurationDetails;
import com.payment.paymentsdk.integrationmodels.PaymentSdkError;
import com.payment.paymentsdk.integrationmodels.PaymentSdkLanguageCode;
import com.payment.paymentsdk.integrationmodels.PaymentSdkShippingDetails;
import com.payment.paymentsdk.integrationmodels.PaymentSdkTokenFormat;
import com.payment.paymentsdk.integrationmodels.PaymentSdkTokenise;
import com.payment.paymentsdk.integrationmodels.PaymentSdkTransactionDetails;
import com.payment.paymentsdk.integrationmodels.PaymentSdkTransactionType;
import com.payment.paymentsdk.sharedclasses.interfaces.CallbackPaymentInterface;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class echoes a string called from JavaScript.
 */
public class CordovaPaymentPlugin extends CordovaPlugin implements CallbackPaymentInterface {

    CallbackContext callbackContext;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if (action.equals("startCardPayment")) {
            JSONObject paymentDetails = new JSONObject(args.getString(0));
            this.startCardPayment(paymentDetails);
            return true;
        } else if (action.equals("startAlternativePaymentMethod")) {
            JSONObject paymentDetails = new JSONObject(args.getString(0));
            this.startAlternativePaymentMethod(paymentDetails);
            return true;
        }
        return false;
    }

    private void startCardPayment(JSONObject paymentDetails) {
        PaymentSdkConfigurationDetails configData = createConfiguration(paymentDetails);
        String samsungToken = paymentDetails.optString("samsungToken");
        if (samsungToken != null && samsungToken.length() > 0)
            PaymentSdkActivity.startSamsungPayment(this.cordova.getActivity(), configData, samsungToken, this);
        else
            PaymentSdkActivity.startCardPayment(this.cordova.getActivity(), configData, this);
    }

    private void startAlternativePaymentMethod(JSONObject paymentDetails) {  
        PaymentSdkConfigurationDetails configData = createConfiguration(paymentDetails);
        PaymentSdkActivity.startAlternativePaymentMethods(this.cordova.getActivity(), configData, this);
    }

    private PaymentSdkConfigurationDetails createConfiguration(JSONObject paymentDetails) {
        String profileId = paymentDetails.optString("profileID");
        String serverKey = paymentDetails.optString("serverKey");
        String clientKey = paymentDetails.optString("clientKey");
        PaymentSdkLanguageCode locale = createPaymentSdkLanguageCode(paymentDetails.optString("languageCode"));
        String screenTitle = paymentDetails.optString("screenTitle");
        String orderId = paymentDetails.optString("cartID");
        String cartDesc = paymentDetails.optString("cartDescription");
        String currency = paymentDetails.optString("currency");
        String token = paymentDetails.optString("token");
        String transRef = paymentDetails.optString("transactionReference");
        double amount = paymentDetails.optDouble("amount");
        PaymentSdkTokenise tokeniseType = createPaymentSdkTokenise(paymentDetails.optString("tokeniseType"));
        PaymentSdkTokenFormat tokenFormat = createPaymentSdkTokenFormat(paymentDetails.optString("tokenFormat"));
        PaymentSdkTransactionType transactionType = createPaymentSdkTransactionType(paymentDetails.optString("transactionType"));

        JSONObject billingDetails = paymentDetails.optJSONObject("billingDetails");
        PaymentSdkBillingDetails billingData = null;
        if(billingDetails != null) {
            billingData = new PaymentSdkBillingDetails(
                    billingDetails.optString("city"),
                    billingDetails.optString("countryCode"),
                    billingDetails.optString("email"),
                    billingDetails.optString("name"),
                    billingDetails.optString("phone"), billingDetails.optString("state"),
                    billingDetails.optString("addressLine"), billingDetails.optString("zip")
            );
        }
        JSONObject shippingDetails = paymentDetails.optJSONObject("shippingDetails");
        PaymentSdkShippingDetails shippingData = null;
        if(shippingDetails != null ) {
            shippingData = new PaymentSdkShippingDetails(
                    shippingDetails.optString("city"),
                    shippingDetails.optString("countryCode"),
                    shippingDetails.optString("email"),
                    shippingDetails.optString("name"),
                    shippingDetails.optString("phone"), shippingDetails.optString("state"),
                    shippingDetails.optString("addressLine"), shippingDetails.optString("zip")
            );
        }
        JSONArray apmsJSONArray = paymentDetails.optJSONArray("alternativePaymentMethods");
        ArrayList<PaymentSdkApms> apmsList = new ArrayList<PaymentSdkApms>();
        if (apmsJSONArray != null) {
            apmsList =  createAPMs(apmsJSONArray);
        }
        PaymentSdkConfigurationDetails configData = new PaymentSdkConfigBuilder(
                profileId, serverKey, clientKey, amount, currency)
                .setCartDescription(cartDesc)
                .setLanguageCode(locale)
                .setBillingData(billingData)
                .setMerchantCountryCode(paymentDetails.optString("merchantCountryCode"))
                .setShippingData(shippingData)
                .setCartId(orderId)
                .setTokenise(tokeniseType, tokenFormat)
                .setTokenisationData(token, transRef)
                .hideCardScanner(paymentDetails.optBoolean("hideCardScanner"))
                .showBillingInfo(paymentDetails.optBoolean("showBillingInfo"))
                .showShippingInfo(paymentDetails.optBoolean("showShippingInfo"))
                .forceShippingInfo(paymentDetails.optBoolean("forceShippingInfo"))
                .setScreenTitle(screenTitle)
                .setAlternativePaymentMethods(apmsList)
                .setTransactionType(transactionType)
                .build();

        return configData;
    }

    private ArrayList<PaymentSdkApms> createAPMs(JSONArray apmsJSONArray) {
        ArrayList<PaymentSdkApms> apmsList = new ArrayList<PaymentSdkApms>();
        for (int i = 0; i < apmsJSONArray.length(); i++) {
            String apmString = apmsJSONArray.optString(i);
            PaymentSdkApms apm = createPaymentSdkApms(apmString);
            apmsList.add(apm);
        }
        return apmsList;
    }
    
    private void returnResponse(int code, String msg, String status, PaymentSdkTransactionDetails data) {
        HashMap<String,Object> map = new HashMap<String,Object>();
        if (data != null) {
            String detailsString = new Gson().toJson(data);
            try {
                JSONObject transactionDetails = new JSONObject(detailsString);
                map.put("data", transactionDetails);
            } catch (JSONException e) {
                map.put("data", null);
            }
        }
        map.put("code", code);
        map.put("message", msg);
        map.put("status", status);
        JSONObject json = new JSONObject(map);
        callbackContext.success(json);
    }

    @Override
    public void onError(@NotNull PaymentSdkError err) {
        if (err.getCode() != null)
            returnResponse(err.getCode(), err.getMsg(), "error", null);
        else
            returnResponse(0, err.getMsg(), "error", null);
    }

    @Override
    public void onPaymentFinish(@NotNull PaymentSdkTransactionDetails paymentSdkTransactionDetails) {
        returnResponse(200, "success", "success", paymentSdkTransactionDetails);
    }

    @Override
    public void onPaymentCancel() {
        returnResponse(0, "Cancelled", "event", null);
    }
}