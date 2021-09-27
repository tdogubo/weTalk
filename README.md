# weTalk-API 📲

## Description
A mobile top-up API created on Flutterwave and Reloadly APIs.


## Endpoints
#### `/countries`
 A `GET` request which sends a list of supported countries on Reloadly.
 
 > Expected Response : `200 OK`

#### `/operator`
 A `POST` request which allows you retrieve operator information on the mobile number inputed.
__Body__ of request should be in the format 👇🏽👇🏽

```
{ countryisocode: "recepient's country code",
  phoneNumber: "recepient's phone number" }
```
> Expected Response : `200 OK`
   


#### `/verify`
A `POST` endpoint for verifying payment from Flutterwave and airtime top-up from Reloadly.
__Format__ for body 👇🏽👇🏽
```
{ operatorId: "341",
  amount: "100",
  recipientNumber: "08102944117",
  recipientCountryCode: "NG",
  transactionRef: "2509533"}
```
> Expected Response : `200 OK`
