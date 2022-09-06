const express = require('express');
const router = express.Router()

//JWT 발급하기
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const redisClient = require('./redis');
const secret = process.env.SECRET;

module.exports = {
    sign : (user) => {
        const payload = {
            id : user.id,
            role : user.role,
        }
        return jwt.sign(payload, secret, {})
    }
}