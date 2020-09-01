# payabbhi-payment-btn-poc
Payment Button POC

Steps:
1. Install ***http-server*** using this command:`npm install http-server -g` or `sudo npm install http-server -g` .

2. Run live server for payment_form_service
   - `cd payment_form_service`
   - `http-server .`
3. Run live server for payment_button_service in new terminal
  - `cd payment_button_service`
  - `http-server .`
  
4.Update Demo-website index.html and main.js files 
  - `cd Demo-website`
  - open **index.html** file and add this code anywhere to get the payment-button on the Demo-website: ` <form>
                <script src="main.js" data-payabbhi-payment-btn-id="page_0WyENStMxxpCG3Oj"
                    data-dynamic-host="payabbhi.com" data-env="test"> </script>
            </form>`
  - replace these URLs in **main.js**(line no.7 to 10).
    - `const paymentFormDomain = 'http://localhost:8080';` //payment_form_service port
    - `const paymentFormURL = 'http://localhost:8080/payabbhi_test_payment_form.html';` //payment_form_service full URL
    - `const paymentButtonDomain = 'http://localhost:8081';` // payment_button_service port
    - `const paymentButtonURL = 'http://localhost:8081/active_pay_button.html';` // payment_button_service full URL
  - run live server for Demo-website aswell using : `http-server .`


5. Open `http://localhost:8082/index.html`(replace the port number with Demo-website's port number) in chrome to see the payment button and to make payment.

6. To change the button location Add ` <form>
                <script src="main.js" data-payabbhi-payment-btn-id="page_0WyENStMxxpCG3Oj"
                    data-dynamic-host="payabbhi.com" data-env="test"> </script>
            </form>`  in Demo-website>index.html file.

7. To see the Inactive button update Demo-website>main.js line number-10.
    - `const paymentButtonURL = 'http://localhost:8081/inactive_pay_button.html';` // payment_button_service full URL
    
8. To check the live payment flow update Demo-website>main.js line number-8.

    - `const paymentFormURL = 'http://localhost:8081/payabbhi_live_payment_form.html';` (replace the port number with payment_form_service's port number)
