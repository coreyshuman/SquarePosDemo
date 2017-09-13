"use strict";
var SquareResponse = function(data) {
    this.data = {
        transaction_id: "", // unique ID of processed transaction
        client_transaction_id: "", // device-specific id of transaction terminal
        status: "", // ok | error
        error_code: "", // error code such as payment_canceled
        state: "", // passed through request
    }

    this.data = Object.assign(this.data, data);
}

SquareResponse.prototype.isSuccess = function() {
    return this.data.status === "ok";
}

SquareResponse.prototype.getErrorMessage = function() {
    if (this.isSuccess()) {
        return "";
    }

    var m = "Unknown error occured.";

    switch (this.data.error_code) {
        case "amount_invalid_format":
            m = "The request had a missing or invalid amount to charge.";
            break;
        case "amount_too_large":
            m = "The request's amount to charge was too large.";
            break;
        case "amount_too_small":
            m = "The request's amount to charge was too small.";
            break;
        case "client_not_authorized_for_user": // Deprecated error
            m = "Client was not authorized.";
            break;
        case "could_not_perform":
            m = "The request could not be performed. An existing request may be pending.";
            break;
        case "currency_code_mismatch":
            m = "The currency code provided in the request does not match the currency associated with the current business.";
            break;
        case "currency_code_missing":
            m = "The currency code provided in the request is missing or invalid.";
            break;
        case "customer_management_not_supported":
            m = "This merchant account does not support customer management and therefore cannot associate transactions with customers.";
            break;
        case "data_invalid":
            m = "The URL sent to Square Point of Sale had missing or invalid information.";
            break;
        case "invalid_customer_id":
            m = "	The customer ID provided in the request does not correspond to a customer in the logged in Square merchant's customer directory.";
            break;
        case "invalid_tender_type":
            m = "The request included an invalid tender type.";
            break;
        case "no_network_connection":
            m = "The transaction failed because the device has no network connection.";
            break;
        case "not_logged_in":
            m = "A merchant is not currently logged in to Square Point of Sale.";
            break;
        case "payment_canceled":
            m = "The merchant canceled the payment in Square Point of Sale.";
            break;
        case "unsupported_api_version":
            m = "The installed version of Square Point of Sale doesn't support the specified version of the Point of Sale API.";
            break;
        case "unsupported_currency_code":
            m = "	The currency code provided in the request is not currently supported in the Point of Sale API.";
            break;
        case "unsupported_tender_type":
            m = "The request included a tender type that is not currently supported by the Point of Sale API.";
            break;
        case "user_id_mismatch":
            m = "The business location currently logged in to Square Point of Sale does not match the location represented by the location_id you provided in your request.";
            break;
        case "user_not_active":
            m = "The currently logged in location has not activated card processing.";
            break;
    }

    m += " Please ask attendant for assistance.";
    return m;
}

module.exports = SquareResponse;