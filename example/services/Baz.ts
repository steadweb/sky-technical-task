import { Service } from "../../src/Container";

@Service
class Baz {
  public sayHello(name: string): string {
    return `Hello ${name}!`
  }
}

export default Baz;