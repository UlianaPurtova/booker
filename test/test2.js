import { assert, expect } from 'chai';
import axios from 'axios';
import { describe, it, beforeEach } from 'mocha';

const url = "https://restful-booker.herokuapp.com/booking";

describe('/booker', () => {
  let bookingId;
  let token;

  it('succesful login', async function () {
    this.timeout(5000);
    const url1 = 'https://restful-booker.herokuapp.com/auth'
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    };
    
    const data ={
      username : "admin",
      password : "password123"

    }
    
    const response = await axios.post(url1, data, config);

    expect(response.status).to.equal(200);
    expect(response.data.token).to.be.a('string');
    // not equal ''
    expect(data.username).to.be.a("string");
    expect(data.password).to.be.a("string");
    token = response.data.token;
  });
    it('get bookings', async function () {
      this.timeout(15000);
      const curl = "https://restful-booker.herokuapp.com/booking";
      const data = [
        {
          "Firstname": "Uliana"
        },
        {
          "Lastname": "Purtova"
        },
        {
          "Checkin": "2020-03-16"
        },
        {
          "Checkout": "2020-03-30"
        }
      ];
      let response;
      try {
        response = await axios.get(url + "?firstname=Uliana&lastname=Purtova");
      } catch (err) {
        console.log(1);
      }

      expect(response.status).to.equal(200);
      expect(response.data.length).to.equal(0);
    //   expect(data[0].Firstname).to.be.a("Uliana");
    //   expect(data[1].Lastname).to.be.a("Purtova");
    //   expect(data[2].Checkin).to.be.a("2020-03-16");

    });

    // create booking

    // copy past first test, but expect da

    it('XXX create booking', async function () {
      this.timeout(30000);
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      
      const data ={
        firstname : "Jim",
        lastname : "Brown",
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
            checkin : "2018-01-01",
            checkout : "2019-01-01"
        },
        additionalneeds : "Breakfast"
      }
      let response;
      try {
        response = await axios.post(url, data, config);
      } catch (err) {
        console.log(1);
      }
  
      expect(response.status).to.equal(200);
      expect(response.data.booking.firstname).to.be.a("string");
      expect(response.data.booking.lastname).to.be.a("string");
      expect(response.data.booking.depositpaid).to.be.a("boolean");
      expect(response.data.booking.totalprice).to.be.a("number");
      bookingId = response.data.bookingid;
      
    })  

    it('unsuccesful creation', async function () {
        this.timeout(5000);
        const config = {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };
        
        const data ={
            // firstname : "Uli",
            // lastname : "B",
            // totalprice : 111,
            // depositpaid : false,
            // bookingdates : {
            //     checkin : "2018-01-01",
            //     checkout : "2019-01-01"
            // },
            // additionalneeds : "Breakfast"
          }
        try {
            await axios.post(url, data, config);
          } catch (err) {
            expect(err.response.status).to.equal(500);
          }
       
    });

    it('update  booking', async function () {
      this.timeout(30000);
      const url2 = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Cookie" : `token=${token}`
        }
      };
      
      const data ={
        firstname : "Jim",
        lastname : "Brown",
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
            checkin : "2018-01-01",
            checkout : "2019-01-01"
        },
        additionalneeds : "Breakfast"
      }
      let response;
      try {
        response = await axios.put(url2, data, config);
      } catch (err) {
        console.log(1);
      }
  
      // expect(response.status).to.equal(200);
      expect(data.firstname).to.be.a("string");
      expect(data.lastname).to.be.a("string");
      expect(data.depositpaid).to.be.a("boolean");
      expect(data.totalprice).to.be.a("number");
      
    })  

});