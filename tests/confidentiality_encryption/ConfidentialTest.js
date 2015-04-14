"use strict";

var Confidential;
try {
  /* globals FieldDB */
  if (FieldDB) {
    Confidential = FieldDB.Confidential;
  }
} catch (e) {}
Confidential = Confidential || require("./../../api/confidentiality_encryption/Confidential").Confidential;

var atob = atob || require("atob");
var btoa = btoa || require("btoa");
var SAMPLE_COMPLEX_OBJECT = require("./../../api/corpus/corpus.json");

describe("Confidential: as a language consultant I want to be able to give data and have my data remain confidential", function() {

  it("should be able to use btoa and atob", function() {
    var message = "this is a sample confidential translation";

    expect(btoa(message)).toEqual("dGhpcyBpcyBhIHNhbXBsZSBjb25maWRlbnRpYWwgdHJhbnNsYXRpb24=");
    expect(btoa(atob(message))).toEqual("thisisasampleconfidentialtranslation");
  });

  it("should encrypt and decrypt strings", function() {
    var message = "this is a sample confidential translation";
    var confidential = new Confidential({
      "filledWithDefaults": true
    });
    confidential.decryptedMode = true;
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);
  });

  it("should let the app set the top secret encryption key", function() {
    var message = "this is a sample confidential translation";
    var confidential = new Confidential();
    confidential.decryptedMode = true;

    confidential.secretkey = "thisisnormallyatopsecretautogeneratedkey";
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);
  });

  it("should let the app send in the top secret encryption key", function() {
    var confidential = new Confidential({
      secretkey: "thisisnormallyatopsecretautogeneratedkey"
    });
    confidential.decryptedMode = true;
    expect(confidential.secretkey).toEqual("thisisnormallyatopsecretautogeneratedkey");
  });


  it("should decrypt complex data", function() {
    var confidential = new Confidential({
      secretkey: Confidential.secretKeyGenerator()
    });
    confidential.decryptedMode = true;
    // confidential.debugMode = true;
    var message = JSON.parse(JSON.stringify(SAMPLE_COMPLEX_OBJECT));
    expect(confidential.decrypt(confidential.encrypt(message)).datumFields.length).toEqual(16);
    message = ["zero", "one", "two", "three"];
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);
    expect(confidential.decrypt(confidential.encrypt(message))[1]).toEqual("one");

  });

});
