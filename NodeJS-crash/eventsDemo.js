import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

function greetHandler(name) {
    console.log('hello world ' + name);
}

function goodbyeHandler(name) {
    console.log('Goodbye world ' + name);
}

// Register event listeners
myEmitter.on('greet', greetHandler);
myEmitter.on('goodbye', goodbyeHandler);

// Emit events
myEmitter.emit('greet', 'John');
myEmitter.emit('goodbye', 'John');

// Error handling
myEmitter.on('error', (err) => {
    console.log('An Error Occured:', err);
});

// Simulate error
myEmitter.emit('error', new Error('Something went wrong'));