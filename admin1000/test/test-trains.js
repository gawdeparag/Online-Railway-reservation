const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../app');

//AssertionStyle
chai.should();

chai.use(chaiHttp);

describe('Trains API', () => {
    
    describe("GET /trains", () => {
        it("it should GET all the tasks", (done) => {
            chai.request(server)
                .get("/Trains")
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(6);
                done();
                })
            })
        })
    
    describe("GET /trains/:id", () => {
        it("it should GET all the tasks by ID", (done) => {
            const TrainID = "60cc71c1dbbc9724bce52785" ;
            chai.request(server)
                .get("/Trains/" + TrainID)
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('Object');
                response.body.should.be.have.property('_id')
                response.body.should.be.have.property('TrainName'); 
                response.body.should.be.have.property('TrainNumber');  
                response.body.should.be.have.property('_id').eq("60cc71c1dbbc9724bce52785");
            done();
           })
        })
    })

    
    describe("POST /addtrain", () => {
        it("it should POST train", (done) => {
            const addTrain = {
                TrainName: "Himalayan Queen",
                TrainNumber: "HQ2124",
                TrainSrc: "Haryana",
                TrainDes: "Himachal-Pradesh"
            };
            chai.request(server)
                .post("/trains/post-train-details")
                .send(addTrain)
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('Object');
                response.body.should.be.have.property('TrainNumber');
                response.body.should.be.have.property('TrainName');
                response.body.should.be.have.property('TrainSrc');
                response.body.should.be.have.property('TrainDes');
            done();
            })
        })
    })
});
