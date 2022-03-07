import serviceInstance from "../services/ServiceInstance";

const withServices = (serviceTypes, Component) => (props) => {
  const serviceInstances = serviceInstance.getServiceInstances(serviceTypes);

  return <Component {...props} services={serviceInstances} />;
};

export default withServices;
