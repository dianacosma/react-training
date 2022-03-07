class ServiceInstance {
  constructor() {
    this.serviceInstances = [];
  }

  getServiceInstances(serviceTypes) {
    const newInstances = [];

    serviceTypes.forEach((ServiceType) => {
      const foundInstance = this.serviceInstances.find(
        (element) => element.type === ServiceType
      );

      if (foundInstance) {
        newInstances.push(foundInstance.instance);
      } else {
        const newInstance = new ServiceType();
        this.serviceInstances.push({
          type: ServiceType,
          instance: newInstance,
        });
      }
    });

    return newInstances;
  }
}

const serviceInstance = new ServiceInstance();

export default serviceInstance;
