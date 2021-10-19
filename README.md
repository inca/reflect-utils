# Reflect Metadata Utilities

Helpers for composing decorators that work nicely with class hierarchies.

```ts
import { addClassMetadata, getClassMetadata } from 'reflect-utils';

const FOO_KEY = Symbol('FOO');

interface Metadata { className: string, methodName: string }

// Define @foo decorator which stores some class metadata
function foo() {
    return function(target: any, methodName: string) {
        const className = target.constructor.name;
        addClassMetadata<Metadata>(FOO_KEY, target, { className, methodName });
    }
}

// Define class hierarchy which uses the metadata

class A {
    @foo()
    one() {}
}

class B extends A {
    @foo()
    two() {}
}

// Extract metadata

getClassMetadata<Metadata>(FOO_KEY, A);
// [{ className: 'A', methodName: 'one' }]
getClassMetadata<Metadata>(FOO_KEY, B);
// [{ className: 'A', methodName: 'one' }, { className: 'B', methodName: 'two' }]
```
