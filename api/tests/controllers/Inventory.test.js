let app = require('../../app');
let request = require('supertest');

describe('Inventory Test', () => {
    it('GET the list of inventories form /inventory endpoint', () => {
        return request(app).get('/inventory')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.status).toEqual(expect.any(Number))
                expect(response.body.error).toBeNullOr(String);
                expect(response.body.inventories).toBeNullOr(Array)
            })
    });
});

expect.extend({
    toBeNullOr(tested, tester) {
        //check if tested var is null
        if (null === tested) {
            return {
                pass: true
            }
        }
        //check if tested var is array and tester keyword is also array
        if (Array.isArray(tested) && 'Array' === tester.name) {
            return {
                pass: true
            }
        }

        let pass = expect(tested).toEqual(expect.any(tester));
        if (pass) {
            return {
                pass: true
            }
        } else {
            return {
                pass: false,
                message: () => 'Failed'
            }
        }
    }
});
