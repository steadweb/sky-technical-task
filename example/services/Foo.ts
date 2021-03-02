import { Inject, Service } from "../../src/Container";
import Bar from "./Bar";

@Service
class Foo {
  @Inject
  private bar: Bar;

  public getBar() {
    return this.bar;
  }
}

export default Foo;