import { assert, expect } from 'chai';
import axios from 'axios';
import { describe, it, beforeEach } from 'mocha';

const url = "https://restful-booker.herokuapp.com/booking";

describe('/booker', () => {
    it('get bookings', async function () {
      this.timeout(5000);
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
      expect(data[0].Firstname).to.be.a("string");
      expect(data[1].Lastname).to.be.a("string");
    //   expect(data[0].Firstname).to.be.a("Uliana");
    //   expect(data[1].Lastname).to.be.a("Purtova");
    //   expect(data[2].Checkin).to.be.a("2020-03-16");

    });
});    