import { Inject, Service } from "../../src/Container";
import Baz from "./Baz";

@Service
class Bar {
  @Inject
  private baz: Baz;

  public getBaz() {
    return this.baz;
  }
}

export default Bar;