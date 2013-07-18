Meteor.methods({
  // Create card in Sprint.ly
  /* Disable for demo
  postToSprintly: function (params) {
    console.log("API Call Method was made");
    var email = Meteor.settings.sprintlyEmail;
    var apiKey = Meteor.settings.sprintlyApiKey;
    var product = Meteor.settings.sprintlyProductId;
    var url = "https://sprint.ly/api/products/" + product + "/items.json";
    //synchronous POST
    console.log(url);
    var result = Meteor.http.post(url,
                                  {auth: email +":"+ apiKey, 
                                  params: params,
                                  timeout: 30000
                                });
    console.log("result");
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      console.log(respJson)
      return respJson;
    } else {
      // TODO: Add better error handling
      //if(result.statusCode==502) {
      //  some stuff;
      //} else {
      //  some stuff;
      //}
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  }
  */
  
});