'use strict';

const express = require('express');
const {v4: uuid} = require('uuid');
const logger = require('../logger');
const {bookmarks} = require('../store'); 
const bookmarksRouter = express.Router();
const bodyParser = express.json();
require('dotenv').config();


bookmarksRouter
  .route('/bookmarks')
  .get((req,res) => {
    res
      .json(bookmarks);
  })
  .post(bodyParser,(req,res)=> {
    const {title, content} = req.body;
    if(!title) {
      logger.error('Title is required.');
      return res
        .status(404)
        .send('Title is required.');
    }
    if(!content) {
      logger.error(`Content with id ${id} not found.`);
      return res
        .status(404)
        .send('Content is required.');
    }
    const id = uuid();
    const newBookmark = {
      id,
      title,
      content
    };
    bookmarks.push(newBookmark);
    res.status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(newBookmark);
    //form validation goes here   
  });
bookmarksRouter
  .route('/bookmarks/:id')
  .get((req,res) => {
    const {id} = req.params;
    // eslint-disable-next-line eqeqeq
    const bookmark = bookmarks.find(b => b.id == id);
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark not found');
    }
    res.json(bookmark);
  })
  .delete((req,res) => {
    //form validation goes here
  });
module.exports = bookmarksRouter;