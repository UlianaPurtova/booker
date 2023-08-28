import { assert, expect } from 'chai';
import axios from 'axios';
import { describe, it, beforeEach } from 'mocha';


// Assuming the server is running on http://localhost:3000
const url = 'https://restful-booker.herokuapp.com/auth'


describe('/booker', () => {
  it('succesful login', async function () {
    this.timeout(5000);
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    };
    
    const data ={
      username : "admin",
      password : "password123"

    }
    
    const response = await axios.post(url, data, config);

    expect(response.status).to.equal(200);
    expect(response.data.token).to.be.a('string');
    // not equal ''
    expect(data.username).to.be.a("string");
    expect(data.password).to.be.a("string");


    // expect(response.data.name).to.be.an("string");
    // expect(response.data.birth_year).to.be.an("string");
    // expect(response.data.starships).to.be.an("array");
    // expect(response.data.eye_color).to.be.an("string");
    // expect(response.data.gender).to.be.an("string");
    // expect(response.data.films).to.be.an("array");
    // myAnswer(response.data);

    // expect(response.data).to.be.an('array');
    // expect(response.data).to.have.lengthOf(2);
    // expect(response.data[0].name).to.equal("John"); 
  })  

  it('unsuccesful login', async function () {
    this.timeout(5000);
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    };
    
    const data ={
      username : "admin",
      password : "password"

    }
    
    const response = await axios.post(url, data, config);

    expect(response.status).to.equal(200);
    expect(response.data.reason).to.be.a('string');
    expect(response.data.reason).to.equal('Bad credentials')
    expect(data.username).to.be.a("string");
    expect(data.password).to.be.a("string");


    // expect(response.data.name).to.be.an("string");
    // expect(response.data.birth_year).to.be.an("string");
    // expect(response.data.starships).to.be.an("array");
    // expect(response.data.eye_color).to.be.an("string");
    // expect(response.data.gender).to.be.an("string");
    // expect(response.data.films).to.be.an("array");
    // myAnswer(response.data);

    // expect(response.data).to.be.an('array');
    // expect(response.data).to.have.lengthOf(2);
    // expect(response.data[0].name).to.equal("John"); 
  })  

  
});