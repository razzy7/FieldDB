/* globals FieldDB, window */
"use strict";

var Confidential;
try {
  if (FieldDB) {
    Confidential = FieldDB.Confidential;
  }
} catch (e) {}
Confidential = Confidential || require("./../../api/confidentiality_encryption/Confidential").Confidential;

var ATOB;
var BTOA;
try {
  if (!window.atob) {
    console.log("ATOB is not defined, loading from npm");
  }
  ATOB = window.atob;
  BTOA = window.btoa;
} catch (e) {
  ATOB = require("atob");
  BTOA = require("btoa");
}

var SAMPLE_COMPLEX_OBJECT = require("./../../api/corpus/corpus.json");

describe("Confidential: as a language consultant I want to be able to give data and have my data remain confidential", function() {

  it("should be able to use btoa and atob", function() {
    var message = "this is a sample confidential translation";

    expect(BTOA(message)).toEqual("dGhpcyBpcyBhIHNhbXBsZSBjb25maWRlbnRpYWwgdHJhbnNsYXRpb24=");
    expect(ATOB(BTOA(message))).toEqual(message);
  });

  it("should encrypt and decrypt strings", function() {
    var message = "this is a sample confidential translation";
    var confidential = new Confidential({
      "filledWithDefaults": true
    });
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);

  });

  it("should let the app set the encryption key", function() {
    var message = "this is a sample confidential translation";
    var confidential = new Confidential();
    confidential.secretkey = "thisisnormallyatopsecretautogeneratedkey";
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);
  });

  it("should fail to decrypt if the encryption key is set after the first prompt is run", function() {
    var message = "this is a sample confidential translation";
    var confidential = new Confidential();
    confidential.secretkey = "thisisnormallyatopsecretautogeneratedkey";
    var encrypted = confidential.encrypt(message);
    expect(encrypted).toBeDefined();
    expect(confidential.decrypt(encrypted)).toEqual(message);
  });

  it("should let the app send in the encryption key", function() {
    var confidential = new Confidential({
      secretkey: "thisisnormallyatopsecretautogeneratedkey"
    });
    expect(confidential.secretkey).toEqual("thisisnormallyatopsecretautogeneratedkey");
  });

  it("should decrypt complex data", function() {
    var confidential = new Confidential({
      secretkey: Confidential.secretKeyGenerator()
    });
    // confidential.debugMode = true;

    var message = JSON.parse(JSON.stringify(SAMPLE_COMPLEX_OBJECT));
    expect(confidential.decrypt(confidential.encrypt(message)).datumFields.length).toEqual(16);
    message = ["zero", "one", "two", "three"];
    expect(confidential.decrypt(confidential.encrypt(message))).toEqual(message);
    expect(confidential.decrypt(confidential.encrypt(message))[1]).toEqual("one");
  });

  describe("confirm users identity", function() {

    it("should trigger a promise if not in decryptedMode", function() {
      var message = "this is a sample confidential translation";
      var confidential = new Confidential({
        "filledWithDefaults": true
      });

      var syncronousresult = confidential.decrypt(confidential.encrypt(message));
      expect(syncronousresult).toEqual(message);
    });

  });

});
