# JS Utils

## Install
`npm install git+https://github.com/alex-newray/js-utils.git`

## Datetime
### timestamp
    import {timestamp} from 'js-utils'
    import {timestamp} from 'js-utils/lib/datetime'
    timestamp(options)

**options:**
* milliseconds (*true|false*) - return milliseconds, otherwise seconds (default *false*)
* rounding (*int number*) - use rounding (default *not use*)

## fetch
    import {fetch} from 'js-utils'
    import fetch from 'js-utils/lib/fetch'
    fetch(url, options, id)

**url**
The URL on which to make the request (*required*)

**options:**
* method (*GET\POST*) - request method (default GET)
* responseType (*string*) - data type of response property
* data (*object*) - object data in body

* retries (*int number*) - number of requests in case of error (default 1)
* timeoutItem (*int number* milliseconds) -  maximum response time for one retry (default *not use*)
* timeoutOverall (*int number* milliseconds) - maximum response time for one retry (default *not use*)
* interval (*int number* milliseconds) - maximum response time for the query (default *5 minute*)

* cache (*true|false*) - use cache (default *false*)
* withCredentials (*true|false*) - use withCredentials (default *false*)
* noUniq (*true|false*) - if a Promise permit with such an id exists, return it (default *false*)

* success (*function*) - callback on Success
* error (*function*) - callback on Error
* done (*function*) - callback on Done

**id**
Promise id. if a Promise is run with an existing id, the old one is cancel
