const comments = require('../routes/comments');
const request = require('supertest');

beforeAll(() => jest.setTimeout(90000));

describe('Test the comments route', () => {
    test('Gets all comments for a specific recipe', (done) => {
        return request(comments)
            .get('/recipe/62b1dd9e0e3c776ee34a3800')
            .then((resp) => {
                expect(resp.statusCode).toBe(200);
                done();
            });
    });
});
