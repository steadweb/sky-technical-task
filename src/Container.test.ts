import { registry as Container, Inject, Service } from './Container';

describe('Container', () => {
  /**
   * Self contained instance mocks for demonstrating decorators
   */
  @Service
  class Baz {
    public sayHello(name: string): string {
      return `Hello ${name}!`; 
    }
  }

  @Service
  class Bar {
    @Inject
    private baz: Baz;

    public getBaz(): Baz {
      return this.baz;
    }
  }

  @Service
  class Foo {
    @Inject
    private bar: Bar;

    public getBar(): Bar {
      return this.bar;
    }
  }

  test('should return an object', () => {
    expect(typeof Container).toBe('object');
  });

  test('.bind should accept a class when binding', () => {
    Container.bind(Baz);

    const baz: Baz = Container.build("Baz");

    expect(baz.sayHello("Luke")).toBe("Hello Luke!");
  });

  test('.build / global container should maintain bound services', () => {
    const baz = Container.build("Baz");

    expect(baz.sayHello("Luke")).toBe("Hello Luke!");
  });

  test("should throw an error when dependency isn't found", () => {
    expect(() => {
      Container.build("UnknownService");
    }).toThrow("UnknownService service not found in registry");
  });

  describe("Decorators", () => {
    test("should bind Bar automatically when @Service decorator is used", () => {
      Container.bind(Foo);

      const foo: Foo = Container.build("Foo");

      expect(foo.getBar() instanceof Bar).toBe(true);
      expect(foo.getBar().getBaz() instanceof Baz).toBe(true);
    });

    test("should @Inject when dependency is resolved", () => {
      class MyService {
        @Inject 
        private foo: Foo;

        public getFoo(): Foo {
          return this.foo;
        }
      }

      Container.bind(MyService);

      const myService: MyService = Container.build("MyService");

      expect(myService.getFoo() instanceof Foo).toBe(true);
      expect(myService.getFoo().getBar().getBaz().sayHello("Luke")).toBe("Hello Luke!");
    });

    test("should throw an error when a service doesn't exist in the registy and @Inject is used", () => {
      expect(() => {
        class UnknownService {}
        class AnotherService {
          @Inject
          unknownService: UnknownService;
        }

        Container.bind(AnotherService);
        Container.build("AnotherService");
      }).toThrow("UnknownService service not found in registry");
    });
  });
});
