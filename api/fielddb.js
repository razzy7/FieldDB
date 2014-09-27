/**
 * FieldDB
 * A open ended database for  evolving data collection projects
 *
 * @module          FieldDB
 * @tutorial        tests/FieldDBTest.js
 * @requires        Export
 * @requires        FieldDBObject
 * @requires        CORS
 * @requires        UserMask
 */
(function(exports) {
  "use strict";
  var App = require("./app/App").App;
  var PsycholinguisticsApp = require("./app/PsycholinguisticsApp").PsycholinguisticsApp;
  var Export = require("./export/Export");
  var FieldDBObject = require("./FieldDBObject").FieldDBObject;
  var Document = require("./datum/Document").Document;
  var CORS = require("./CORS").CORS;
  CORS.bug = FieldDBObject.prototype.bug;
  var DataList = require("./data_list/DataList").DataList;
  var SubExperimentDataList = require("./data_list/SubExperimentDataList").SubExperimentDataList;
  var AudioVideo = require("./audio_video/AudioVideo").AudioVideo;
  var Datum = require("./datum/Datum").Datum;
  var Stimulus = require("./datum/Stimulus").Stimulus;
  var Response = require("./datum/Response").Response;
  var Database = require("./corpus/Database").Database;
  var PsycholinguisticsDatabase = require("./corpus/PsycholinguisticsDatabase").PsycholinguisticsDatabase;
  var FieldDBConnection = require("./FieldDBConnection").FieldDBConnection;
  var Router = require("./Router").Router;
  var User = require("./user/User").User;
  var UserMask = require("./user/UserMask").UserMask;
  var Team = require("./user/Team").Team;
  var Speaker = require("./user/Speaker").Speaker;
  var Consultant = require("./user/Consultant").Consultant;
  var Participant = require("./user/Participant").Participant;
  var Contextualizer = require("./locales/Contextualizer").Contextualizer;
  var Corpus = require("./corpus/Corpus").Corpus;
  var CorpusMask = require("./corpus/CorpusMask").CorpusMask;
  var Import = require("./import/Import").Import;
  var Search = require("./search/Search").Search;
  var Q = require("q");

  var FieldDB = {};

  FieldDB.App = App;
  FieldDB.PsycholinguisticsApp = PsycholinguisticsApp;
  FieldDB.Export = Export;
  FieldDB.FieldDBObject = FieldDBObject;
  FieldDB.Document = Document;
  FieldDB.CORS = CORS;
  FieldDB.DataList = DataList;
  FieldDB.SubExperimentDataList = SubExperimentDataList;
  FieldDB.AudioVideo = AudioVideo;
  FieldDB.Datum = Datum;
  FieldDB.Stimulus = Stimulus;
  FieldDB.Response = Response;
  FieldDB.Database = Database;
  FieldDB.PsycholinguisticsDatabase = PsycholinguisticsDatabase;
  FieldDB.Router = Router;
  FieldDB.User = User;
  FieldDB.UserMask = UserMask;
  FieldDB.Team = Team;
  FieldDB.Speaker = Speaker;
  FieldDB.Consultant = Consultant;
  FieldDB.Participant = Participant;
  FieldDB.Contextualizer = Contextualizer;
  FieldDB.Corpus = Corpus;
  FieldDB.CorpusMask = CorpusMask;
  FieldDB.Import = Import;
  FieldDB.Search = Search;
  FieldDB.Q = Q;
  FieldDB.FieldDBConnection = FieldDBConnection;

  exports.FieldDB = FieldDB;
  global.FieldDB = FieldDB;

console.log("------------------");
console.log("------------------");
console.log("------------------");
console.log("------------------");
console.log("------------------");
console.log("-------loaded-----------");
console.log("--------fielddb----------");
console.log("------------------",FieldDB);
// FieldDB["Response"] = Response;
console.log("------------------");
console.log("------------------");
console.log("------------------");
}(typeof exports === "object" && exports || this));
