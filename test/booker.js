import { expect } from 'chai';
import axios from 'axios';
import { describe, it } from 'mocha';

const url = "https://restful-booker.herokuapp.com/booking";

describe('/booker', () => {
  let bookingId;
  let token;

  it('succesful login', async function () {
    this.timeout(5000);
    const url1 = 'https://restful-booker.herokuapp.com/auth'
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const data = {
      username: "admin",
      password: "password123"
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
    let response;
    try {
      response = await axios.get(url + "?firstname=Uliana&lastname=Purtova");
    } catch (err) {
      console.log(1);
    }

    expect(response.status).to.equal(200);
    expect(response.data.length).to.equal(0);
  });

  it('create booking', async function () {
    this.timeout(30000);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const data = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Breakfast"
    }
    let response;
    response = await axios.post(url, data, config);

    expect(response.status).to.equal(200);
    expect(response.data.booking.firstname).to.be.a("string");
    expect(response.data.booking.lastname).to.be.a("string");
    expect(response.data.booking.depositpaid).to.be.a("boolean");
    expect(response.data.booking.totalprice).to.be.a("number");
    bookingId = response.data.bookingid;

  });

  it('unsuccesful creation on empty object', async function () {
    this.timeout(5000);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const data = {}
    let caughtError = false;
    try {
      await axios.post(url, data, config);
    } catch (err) {
      expect(err.response.status).to.equal(500);
      caughtError = true;
    }
    expect(caughtError).to.equal(true);
  });

  it('update  booking', async function () {
    this.timeout(30000);
    const url2 = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Cookie": `token=${token}`
      }
    };

    const data = {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-02-02"
      },
      additionalneeds: "Breakfast, Dinner"
    }
    const response = await axios.put(url2, data, config);

    expect(response.status).to.equal(200);
    expect(response.data.additionalneeds).to.equal("Breakfast, Dinner");
    expect(response.data.bookingdates.checkout).to.equal("2019-02-02");
  });

  it('partial update  booking', async function () {
    this.timeout(30000);
    const url3 = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Cookie": `token=${token}`
      }
    };

    const data = {
      firstname: "Ben",
      lastname: "Buttoms",
    }
    const response = await axios.patch(url3, data, config);

    expect(response.data.firstname).to.equal("Ben");
    expect(response.data.lastname).to.equal("Buttoms");
    expect(response.status).to.equal(200);
  });

  it('delete  booking', async function () {
    this.timeout(30000);
    console.log(bookingId);
    const url4 = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Cookie": `token=${token}`
      }
    };

    let response;
    response = await axios.delete(url4, config);
    // server returns 201 which is a bug
    expect(response.status).to.equal(200);

  });

  it('delete  booking with 0 id', async function () {
    this.timeout(30000);
    const url4 = `https://restful-booker.herokuapp.com/booking/0`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Cookie": `token=${token}`
      }
    };

    let caughtError = false;
    try {
      await axios.delete(url4, config);
    } catch (err) {
      // server returns 405 which is a bug, should be 404 or 403
      expect(err.response.status).to.equal(403);
      caughtError = true;
    }
    expect(caughtError).to.equal(true);
  });
});
