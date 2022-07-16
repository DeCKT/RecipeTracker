const comments = require('../routes/comments');
const request = require('supertest');

const host = 'http://localhost:3000';

describe('Test the comments routes', () => {
    it("Get a recipe's comments", async () => {
        const resp = await request(host).get('/comments/recipe/62b1dd9e0e3c776ee34a3800');
        expect(resp.statusCode).toBe(200);
    });

    it('Add a comment to a recipe', async () => {
        const comment = {
            comment: 'test',
            email: 'test@example.com',
            username: 'test'
        };
        const resp = await await request(host)
            .post('/comments/recipe/62b1dd9e0e3c776ee34a3800')
            .send(comment);
        expect(resp.statusCode).toBe(200);
    });

    it("Get a user's comments", async () => {
        const resp = await request(host).get('/comments/user/test');
        expect(resp.statusCode).toBe(200);
    });

    it('Get an individual comment', async () => {
        const resp = await request(host).get('/comments/62ced7cfb709a38ea3e12a10');
        expect(resp.statusCode).toBe(200);
    });

    it('Edit a comment', async () => {
        const comment = {
            comment: 'Awesome!'
        };
        const resp = await request(host).put('/comments/62ced7cfb709a38ea3e12a10').send(comment);
        expect(resp.statusCode).toBe(200);
    });

    it('Delete a comment', async () => {
        const resp = await request(host).delete('/comments/62d327ab88716e157a7d011a');
        expect(resp.statusCode).toBe(200);
    });
});
