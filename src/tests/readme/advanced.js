import dotenv from 'dotenv';
// CJS import example
// const dotenv = require('dotenv')
dotenv.config();

if (process.env.NODE_ENV !== 'development') {
    console.log('test console message NOT from development');
}

if (process.env.NODE_ENV === 'development') {
    const { overrideConsole } = await import(
        '../../lib/index.js'
    );
    // CJS import example
    // const {overrideConsole} = require('../../lib/index.js')

    overrideConsole();

    console.log('test console message from development');
}