/**
 * Created by Dexter on 9/18/2016.
 */
'use strict';

// server live
const HOST = 'api.expressive.tech';
//const HOST = 'localhost';
const PORT = 8095;
const UPDATE_RATE = 1000 * 30;

const R = require('ramda');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// use it before all route definitions
app.use(cors({origin: '*'})); // for some reason below didnt work but this does

// turn off cors and allow origin and content type stuff
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// we want body as a plain string! stick in flat into db
// jk app.use(bodyParser.text({ type: 'application/json' }));
app.use(bodyParser.json());

const logsAddCache = [];
const logsCache = [];

const dbUpdate = () => {

  const logsAddCopy = R.clone(logsAddCache);
  logsAddCache.splice(0);
  console.log('dbupdate');

  try {
    const dbconn = mysql.createConnection({
      host: "gib.space",
      user: "rq3",
      password: "eB6rW4RMeV",
      database: "rq3_sprlog"
    });

    dbconn.connect(err => {
      if (err) {
        console.warn("failed to connect to logdb:", err);
      } else {
        if (logsAddCopy.length > 0) {
          const sql = "insert into log(type, payload) values (?, ?)";
          logsAddCopy.forEach(li => {
            const sql_prepared = mysql.format(sql, [li.type, li.payload]);
            dbconn.query(sql_prepared, (err, res, fields) => {
              if (err) {
                console.error("db: " + err);
              }
            });
          });

          console.log('added ', logsAddCopy.length, ' new records');
        }
        // now update local cache of all
        const getSql = "SELECT id,type,payload,time FROM log order by time desc";
        dbconn.query(getSql, (error, results, fields) =>{
          logsCache.splice(0);
          results.forEach(r => {
            // blow the payload back into an object and send it in json format
            const payloadObj = JSON.parse(r.payload);
            logsCache.push( { id: r.id, type: r.type, payload: payloadObj, time: r.time });
          });
          console.log('got ', results.length, 'rows');
          dbconn.end();
        });
      }
    });
  } catch (e) {
    console.error("failed to log dbitems:", e);
  }
};

app.post('/add',(req, res) =>{
  const type = req.get("x-event-key");
  const payload = req.body;
  // payload comes in as an actaul object because we are using json parser
  // however, lets squish down to string for flat db
  // this also strips spaces and tabs and new lines etc
  const payloadJson = JSON.stringify(payload);
  logsAddCache.push({ type: type, payload: payloadJson });

  // add it to our local cache right away though (as expanded object)
  logsCache.push({ type, payload });
  res.send("ok");
});

app.get('/logs', (req, res) =>{
  res.send(logsCache);
});

let listener = app.listen(PORT, HOST, err => {
  if (err) {
    console.log(err);
  } else {
    const url = 'http://' + listener.address().address + ":" + listener.address().port + '/';
    console.log("App started on", url);

    const updateTimerId = setInterval(dbUpdate, UPDATE_RATE);
    // update our state right away
    dbUpdate();
  }
});
