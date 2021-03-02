# Sky Technical Test

This is a basic IoC / DI container which leverages TS decorators. I've decided to use the following:

- Node (version 12.x)
- NPM (version 6.x)
- Typescript
- Jest

It's assumed, `node` (12.x) and `npm` (6.x) are installed locally.

## Quick Usage

See the example folder, which shows 3 services. Each having basic dependencies between them.

### Container

The `Container` holds the registry of the defined services. The container has two ways of creating bound services:

1. Using the exposed `.bind()` API which allows to create a binding
2. Using the `@Service` decorator to automatically bind dependencies between services.

When creating a service to `bind`, simply create your service and import `Container`.

```typescript
import { Container as c } from 'src/Container';

@Service
class Foo {
  @Inject
  private bar: Bar;
}

c.bind(Foo);
```

### @Service

The `@Service` decorator allows the IOC container to automatically inject definition at run time. Any
class **decorated** with `@Service` will add it self into the IOC container.

```typescript
import { Service } from 'src/Container';

@Service
class Baz {
  public sayHello(name: string): string {
    return `Hello ${name}!`;
  }
}
```

### @Inject

The `@Inject` decorator works on properties within a class, and resolves the dependency based on the type. This only works
if the dependency has already been bound within the container, or the `@Service` decorator is used.

```typescript
import { Inject } from 'src/Container';

@Service
class Bar {
  @Inject
  private baz: Baz;

  public function getBaz(): Baz {
    return this.baz;
  }
}
```

## Scope

The requirement is to create an IoC / DI container which handles the creation of dependencies between services.

2 hour limit (rough) with documentation and tests to demontrate the thinking behind the implementation.

## Design

I've taken inspiration from Springs @Autowired fucntionality, which uses annoations (i.e. decorators).

Roughly, this is how I spent my time:

- Writing a basic `Container` to `bind` and `build` Services. (Roughly 1 hour)
- Basic implementations on `@Inject` and `@Service` decorators (Rouhgly 1 hour)
- Writing documentation and tests around the implementation (Roughly 1/2 hour)

This is a tiny example of IoC / DI within typescript, which have the following drawbacks:

- We don't compile this down into JS / ES5, so it can't be consumed.
- It's not versioned
- It doesn't take into account circular dependencies (somewhat)
- There's little consideration to other types aside from Services

## Demo / Tests

Run the following commands:

```
npm run demo
```

The output of this should be:

```
Hello Luke!
```

To run the tests:

```
npm test
```

And the output should be:

```
 PASS  src/Container.test.ts
  Container
    ✓ should return an object (2 ms)
    ✓ .bind should accept a class when binding
    ✓ .build / global container should maintain bound services
    ✓ should throw an error when dependency isn't found (2 ms)
    Decorators
      ✓ should bind Bar automatically when @Service decorator is used (1 ms)
      ✓ should @Inject when dependency is resolved
      ✓ should throw an error when a service doesn't exist in the registy and @Inject is used (1 ms)
```
