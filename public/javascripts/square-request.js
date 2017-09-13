"use strict";

var SquareRequest = function() {
    this.dataParameter = {
        "amount_money": {
            "amount": "0",
            "currency_code": "USD"
        },
        "callback_url": "", // Replace this value with your application's callback URL
        "client_id": "MY_APPLICATION_ID", // Replace this value with your application's ID
        "version": "1.3",
        "notes": "", // add note to the transaction
        "options": {
            "supported_tender_types": ["CREDIT_CARD", "CASH", "OTHER", "SQUARE_GIFT_CARD", "CARD_ON_FILE"],
            "state": null, // this is passed back to app in callback
            "location_id": null, // this ties the transaction to a specific devices (must be registered or it will fail)
            "customer_id": null, // tie transaction to customer if enabled in Square account
            "clear_default_fees": false, // if true, don't automatically apply fees (taxes) to payment
            "auto_return": false, // automatically return to the calling app after timeout
            "skip_receipt": false, // don't show digital receipt options after transaction    
        }
    };
}

SquareRequest.prototype.setAmount = function(amount) {
    this.dataParameter.amount_money.amount = this.parseVal(amount);
}

SquareRequest.prototype.setClientId = function(id) {
    this.dataParameter.client_id = id;
}

SquareRequest.prototype.setCallbackUrl = function(url) {
    this.dataParameter.callback_url = url;
}

SquareRequest.prototype.addNote = function(note) {
    this.dataParameter.note = note;
}

SquareRequest.prototype.setState = function(state) {
    this.dataParameter.options.state = state;
}

SquareRequest.prototype.enableAutoReturn = function() {
    this.dataParameter.options.auto_return = true;
}

SquareRequest.prototype.loadSquarePOS = function() {
    var url = "square-commerce-v1://payment/create?data=" + encodeURIComponent(JSON.stringify(this.dataParameter));
    window.location = url;
}

SquareRequest.prototype.parseVal = function(val) {
    val = Number.parseFloat(val);
    val = val * 100;
    val = Math.round(val);
    val = val / 100;

    return val.toFixed(2);
}