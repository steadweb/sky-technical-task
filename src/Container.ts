import { BuildableService, Service } from "./Interfaces/Service";
import "reflect-metadata";

/**
 * Basic Container registry for handling services
 */
export class Container {
  private registry: Array<Service> = [];

  public bind(service: BuildableService): void {
    if(!this.get(service.name)) {
      this.registry.push({
        name: service.name,
        fn: service
      });
    }
  }

  public build(name: String): any {
    const service = this.get(name);

    if(service) {
      const Service: BuildableService = service.fn;

      return new Service();
    }  

    throw new Error(`${name} service not found in registry`)
    
  }

  private get(name: String) {
    return this.registry.find(s => s.name === name);
  }
}

/**
 * Global DI / IoC container
 */
export const registry = new Container();

/**
 * Inject decorator to inject properties based on types, if found within the registry
 * 
 * @param target 
 * @param propertyKey 
 */
export function Inject(target: any, propertyKey: string) {
  if (target[propertyKey] === undefined) {
    const type = Reflect.getOwnMetadata("design:type", target, propertyKey);
    target[propertyKey] = registry.build(type.name);
  }
}

/**
 * Service (class) decorator to magically bind a class by it's name.
 * 
 * @param target 
 */
export function Service(target: BuildableService) {
  registry.bind(target);
}