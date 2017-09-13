"use strict";
(function() {
    var square = new SquareRequest();

    square.enableAutoReturn();
    square.setCallbackUrl(window.location.origin + "/square/callback");
    square.setState("pending");

    var inputClient = document.getElementById("clientID");

    function packageA() {
        if (validateClient()) {
            square.addNote("Package A");
            square.setAmount(1.00);
            square.setClientId(inputClient.value);
            square.loadSquarePOS();
        }
    }

    function packageB() {
        if (validateClient()) {
            square.addNote("Package B");
            square.setAmount(1.00);
            square.setClientId(inputClient.value);
            square.loadSquarePOS();
        }
    }

    function validateClient() {
        var valid = !!inputClient.value;

        if (!valid) alert("Please enter client ID");

        return valid;
    }

    document.getElementById("packA").onclick = packageA;
    document.getElementById("packB").onclick = packageB;
})();