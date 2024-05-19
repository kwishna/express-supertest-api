import { ApiCall, ApiMethods as ApiMethod } from "../api-test-framework/ApiCall"
const apiLogger = require('superagent-logger');

const fn = async () => {
    const apiCall = new ApiCall('https://reqres.in/api/users?page=2', ApiMethod.GET);
    // apiCall.setPlugin(logger);
    // apiCall.setPlugin(apiLogger({ outgoing: true, timestamp: true }));
    apiCall.enableLogging()
    apiCall.expectStatus(200);
    console.log(await apiCall.done());
}

fn().then();
// https://reqres.in/api/users?page=2