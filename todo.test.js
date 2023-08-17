const chai = require('chai');
const chaiHttp = require('chai-http');
const url = 'http://localhost:3000/todo';
const app = require('./app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Todo App API Test Suite', () => {
  let itemId;

  // Test the CREATE (POST) endpoint
  it('should create a new todo item', async function () {
    const createTodoData = { 
      newItem: 'MongoDB-5',
      list: 'Today'
    };

    try {
      const response = await chai.request(url)
        .post('/add')
        .send(createTodoData);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('data');
      if(createTodoData.list=='Today') itemId = response.body.data._id;
      else itemId = response.body.data.items.slice(-1)[0]._id;
      
    } catch (error) {
      throw error;
    }
  });

  // Test the READ (GET) endpoint
  it('should get today\'s todo items', async function() {
    try {
      const response = await chai.request(url)
        .get('/');

      expect(response).to.have.status(200);
    } catch (error) {
      throw error;
    }
  });

  // Test the DELETE (POST) endpoint
  it('should delete a todo item', async function() {
    try {
      console.log(itemId);
      const response = await chai.request(url)
        .post('/delete')
        .send({
          checkbox: itemId,
          itemListName: 'Today'
        });
      expect(response).to.have.status(200);
    } catch (error) {
      throw error;
    }
  });
});
