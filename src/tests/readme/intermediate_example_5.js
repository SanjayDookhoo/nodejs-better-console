import { overrideConsole } from '../../lib/index.js';

const config = {
    obj_depth: 3,
};
const obj = {
    a: {
        b: {
            c: {
                d: {
                    e: 5,
                },
            },
        },
    },
};
overrideConsole(config);

console.log(obj);