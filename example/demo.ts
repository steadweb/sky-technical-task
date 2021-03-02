import { Container as c } from "..";
import { default as Foo  } from "./services/Foo";

// Bind your service
c.bind(Foo);

// Now build it
const f: Foo = c.build("Foo");

// Finally, DI should kick in and create the chain for you
console.log(f.getBar().getBaz().sayHello("Luke"));