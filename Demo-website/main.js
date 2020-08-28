const scriptTag = document.scripts[document.scripts.length - 1];
const parentTag = scriptTag.parentNode;
const payabbhiPaymentBtnId = scriptTag.getAttribute('data-payabbhi-payment-btn-id');
const dynamicHost = scriptTag.getAttribute('data-dynamic-host');
const env = scriptTag.getAttribute('data-env');
//replace these URLs
const paymentFormDomain = 'http://localhost:8081';
const paymentFormURL = 'http://localhost:8081/payabbhi_test_payment_form.html';
const paymentButtonDomain = 'http://localhost:8082';
const paymentButtonURL = 'http://localhost:8082/active_pay_button.html';

// const paymentFormURL = `https://${dynamicHost}/pages/${env}/${payabbhiPaymentBtnId}/index.html`;
// const paymentButtonURL = `https://${dynamicHost}/buttons/${env}/${payabbhiPaymentBtnId}/index.html`;
const paymentFormIframeId = 'iframe-id';
const paymentButtonIframeId = 'iframe-pay-btn-id';
console.log(payabbhiPaymentBtnId);
console.log(dynamicHost);
console.log(env);
const openPayForm = function () {
    console.log("insideopenPayForm ");
    console.log("parentTag:", parentTag);
    console.log("parentTag.parentNode:", parentTag.parentNode);
    console.log(parentTag.parentNode);
    createPaymentFormIframe(parentTag.parentNode);
}
const createPayButtonIframe = function (context, func) {
    console.log("inside createPayButtonIframe");
    const iframePayBtn = document.createElement("iframe");
    iframePayBtn.src = paymentButtonURL;
    iframePayBtn.id = paymentButtonIframeId;
    iframePayBtn.name = 'payButtonIframe';

    iframePayBtn.style.opacity = '1';
    // iframePayBtn.style.height = '400px';
    iframePayBtn.style.position = 'relative';
    // iframePayBtn.style.top = '0';
    // iframePayBtn.style.left = '0';
    iframePayBtn.style.background = 'none';
    iframePayBtn.style.display = 'block';
    iframePayBtn.style.border = '0 none transparent';
    // iframePayBtn.style.margin = '0';
    // iframePayBtn.style.padding = '0';
    iframePayBtn.style.zIndex = '2147483646';
    iframePayBtn.style.overflow = 'hidden';
    iframePayBtn.frameBorder = "0";
    context.appendChild(iframePayBtn);

}

const closePaymentFormIframe = function () {
    console.log("inside closePaymentFormIframe");
    document.getElementById("iframe-id").remove()
}

const notifyPaymentFormIframe = function (message) {
    const paymentFormFrame = window.frames.paymentFormIframe;
    paymentFormFrame.postMessage(message, "*");
};

const updateIPaymentBtnframeSize = function (data) {
    const iframeBtn = document.getElementById(paymentButtonIframeId);
    iframeBtn.style.height = data.height;
    iframeBtn.style.width = data.width;
}
const createPaymentFormIframe = function (context) {
    console.log("inside createPaymentFormIframe");
    const iframe = document.createElement("iframe");
    iframe.src = paymentFormURL;
    iframe.id = paymentFormIframeId;
    iframe.name = 'paymentFormIframe';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '2147483647';
    iframe.frameBorder = '0';
    iframe.style.display = 'block';

    //we can set style like this as well
    // iframe.setAttribute('style', 'position:fixed; top:0;left:0;bottom:0,right:0;width:100%;height:100%;border:none;margin:0;padding:0;overflow:hidden;z-index:2147483647;frameBorder:0;display:block;');
    context.appendChild(iframe);
}

window.addEventListener("message", (event) => {
    const data = event.data;
    const origin = event.origin;
    console.log("origin:", origin);
    if ((data === 'closePaymentFormIframe' || data === 'closePaymentConfirmationIframe') && origin === paymentFormDomain) { closePaymentFormIframe(); }
    else if (data === 'openPayForm' && origin === paymentButtonDomain) {
        openPayForm();
    }
    else if (data === "payabbhiCheckoutClosed" && origin === paymentFormDomain) {
        console.log("inside main.js : payabbhiCheckoutClosed:", data);
        console.log("inside main.js event.origin:", event.origin);
        notifyPaymentFormIframe(data);
    }
    else {
        try {
            const paymentBtnStyleInfo = JSON.parse(data);
            if ("paymentButtonData" in JSON.parse(data) && origin === paymentButtonDomain) {
                console.log("paymentBtnStyleInfo:",paymentBtnStyleInfo);
                //for resetting style of the iframe of pay btn
                updateIPaymentBtnframeSize(JSON.parse(data))
            }
        } catch{
            //do-nothing
        }
    }
});

createPayButtonIframe(parentTag, createPaymentFormIframe);