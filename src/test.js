//INPUT
// { claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes." }

// OUTPUT
// { risk_rating: 3 }

// ERROR OUTPUT
// { error: "there is an error"}
const request = require("supertest")('localhost:8000')
const assert = require('chai').assert;
const RiskKeywords = ["collide", "crash", "scratch", "bump", "smash", "accident", "scratches", "crashes"]

describe('GET, risk_rating API', () => {
    it('GET /risk/claim', () => {
        // Make a GET request to the users route 
        return request.get('/risk/claim').expect(200)
    });
});
/*-----------------------------------------------------------------*/

describe('POST, risk_rating API', () => {
    it('POST/ when customers has 0 risk keyword matched', () => {
        let input = ["I have nothing to claim"];
        return request.post('/risk/claim')
            .send(input)
            .then((res) => {
                assert.equal(res.text, 'Your risk rating is 0')
            });
    });

    it('POST/ when customers has 3 risk keyword matched', () => {
        let input = ["My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes."];
        return request.post('/risk/claim')
            .send(input)
            .then((res) => {
                assert.equal(res.text, 'Your risk rating is 3')
            });
    });

    it('POST/ when customers has 3 risk keyword matched', () => {
        let input = ["bad accident, bump, and a lot of scratch."];
        return request.post('/risk/claim')
            .send(input)
            .then((res) => {
                assert.equal(res.text, 'Your risk rating is 3')
            });
    });

    it('POST/ when customers has 5 risk keyword matched', () => {
        let input = ["My car has collide, crash, scratch, bump, smash"];
        return request.post('/risk/claim')
            .send(input)
            .then((res) => {
                assert.equal(res.text, 'Your risk rating is 5')
            });
    });

    //not sure if it's okay to test like this?
    //test function directly?
    it('POST/ when customers has 2 risk keyword matched', () => {
        let input =
            ["My only claim was a crash into my house's garage door that left a scratch on my car.There are no other crashes."]
        let claim_history_split = (JSON.stringify(input)).split(/[.,!,?, ,"]/);
        const intersection = RiskKeywords.filter(element => claim_history_split.includes(element));
        const actual = intersection.length

        assert.equal(actual, 3)
    });


});