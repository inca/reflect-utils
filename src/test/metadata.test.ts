import assert from 'assert';

import { addClassMetadata, getClassMetadata } from '../main';

const FOO_KEY = Symbol('FOO');

interface Metadata { className: string, methodName: string }

// Define @foo decorator which stores some class metadata
function foo() {
    return function(target: any, methodName: string) {
        const className = target.constructor.name;
        addClassMetadata<Metadata>(FOO_KEY, target, { className, methodName });
    };
}

describe('Metadata Utils', () => {

    it('returns all declared metadata in hierarchy', () => {
        class A {
            @foo() one() {}
        }
        class B extends A {
            @foo() two() {}
        }
        assert.deepStrictEqual(getClassMetadata(FOO_KEY, A), [
            { className: 'A', methodName: 'one' }
        ]);
        assert.deepStrictEqual(getClassMetadata(FOO_KEY, B), [
            { className: 'A', methodName: 'one' },
            { className: 'B', methodName: 'two' },
        ]);
    });

});
