let app = require('../../app');
let request = require('supertest');

describe('Purchase Test', () => {
    it('Purchase an item', () => {
        let payload = {
            "products": [
                {
                    "item": "coke",
                    "quantity": 1
                }
            ],
            "coin": 20
        };

        return request(app).post('/purchase')
            .send(payload)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ item: 'coke' }),
                        expect.objectContaining({ quantity: 1 })
                    ])
                )
                expect(response.body.message).toBe(null)
                expect(response.body.error).toBe(false)
                expect(response.body.refund).toBe(0)
            })
    });

    it('Purchase more than available product inventory', () => {
        let payload = {
            "products": [
                {
                    "item": "coke",
                    "quantity": 15
                }
            ],
            "coin": 5000
        };

        return request(app).post('/purchase')
            .send(payload)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toBe(null)
                expect(response.body.message).toBe("Insufficient inventory available.")
                expect(response.body.error).toBe(true)
                expect(response.body.refund).toBe(5000)
            })
    });

    it('Purchase inventory with less coin than required', () => {
        let payload = {
            "products": [
                {
                    "item": "coke",
                    "quantity": 1
                }
            ],
            "coin": 8
        };

        return request(app).post('/purchase')
            .send(payload)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toBe(null)
                expect(response.body.message).toBe("Insufficient coin insetred.")
                expect(response.body.error).toBe(true)
                expect(response.body.refund).toBe(8)
            })
    });

    it('Purrchase item which doesnot exist in inventory', () => {
        let payload = {
            "products": [
                {
                    "item": "slice",
                    "quantity": 1
                }
            ],
            "coin": 8
        };

        return request(app).post('/purchase')
            .send(payload)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toBe(null)
                expect(response.body.message).toBe("Supplied products does not exist in inventory.")
                expect(response.body.error).toBe(true)
                expect(response.body.refund).toBe(8)
            })
    });
});

describe('Return Test', () => {
    it('Return an item', () => {
        let payload = {
            "products": [
                {
                    "item": "coke",
                    "quantity": 1
                }
            ]
        };

        return request(app).post('/return')
            .send(payload)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toBe(null)
                expect(response.body.message).toBe(null)
                expect(response.body.error).toBe(false)
                expect(response.body.refund).toBe(20)
            })
    });

    it('Refund more products than purchased.', () => {
        let payload = {
            "products": [
                {
                    "item": "coke",
                    "quantity": 15
                }
            ]
        };

        return request(app).post('/return')
            .send(payload)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.products).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ item: 'coke' }),
                        expect.objectContaining({ quantity: 15 })
                    ])
                )
                expect(response.body.message).toBe("Cannot return more products than total sold")
                expect(response.body.error).toBe(true)
                expect(response.body.refund).toBe(null)
            })
    });
});