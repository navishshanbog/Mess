
import {Kids} from "../Data";
import { observable } from "mobx";
import fetch from 'isomorphic-fetch';
import promise from 'es6-promise';


class KidsModel  {
    @observable allKids = Kids;
    @observable selectedKidId = "";
    @observable selectedKid = {};
    newKid = {};

    anySelectedKid () {
        return this.selectedKidId ? true: false;
    }

    /*
    USE OF FETCH
     fetch(url) // Call the fetch function passing the url of the API as a parameter
     .then(function() {
     // Your code for handling the data you get from the API
     })
     .catch(function() {
     // This is where you run code if the server returns any errors
     });
     */
/*

       headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

*/

    constructor() {

      fetch('http://localhost:80/test.json', {method:'POST', mode: 'no-cors', headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS, FETCH"
          })
      })
        .then((response) => {
            console.log("response ", response);
        })
        .catch((err) => {
            console.log ("Error ", err);
        })

/*       // axios.defaults.baseURL = "http//localhost:8086";  Access-Control-Allow-Origin: *
        axios.defaults.method= "GET";
        axios.defaults.headers = {"Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Method": "GET", "Access-Control-Allow-Methods": "GET, OPTIONS"};

        axios.get('http://e1-analyst04:3010/IntelTraveller/match/ProfileMatchDataService', {"method":"GET", "responseType": "json", "Access-Control-Allow-Origin": "*"})
            .then(function (response) {
                console.log("response => ", response);
            })
            .catch(function (error) {
                console.log("error", error);
            });*/
    }


}

export { KidsModel as default, KidsModel }