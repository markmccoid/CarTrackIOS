import numeral from 'numeral';
import moment from 'moment';
// Takes in the services and cars and returns a 
// new service object with a carDetail object inside
// maybe also format date and amount
// {
//   id,
//   key,
//   dateOfService,
//   dateOfServiceFormatted,
//   servicePerformed,
//   serviceCost,
//   serviceProvider,
//   serviceNotes,
//   carDetail: {
//     id,
//     make,
//     model,
//     year,
//     nickName,
//     VIN,
//     licensePlate
//   }
// }
export const hydrateServices = (servicesArray, carsArray) => {
  let services;

  services = servicesArray.map(service => {
    carObj = carsArray.find(car => car.id === service.carId);
    return {
      id: service.id,
      key: service.id,
      serviceDate: service.serviceDate,
      serviceDateFormatted: moment(service.serviceDate).format('MMM Do YYYY'),
      serviceDescription: service.serviceDescription,
      serviceCost: service.serviceCost,
      serviceCostFormatted: numeral(service.serviceCost/100).format('$0,0.00'),
      serviceNote: service.serviceNote,
      serviceProvider: service.serviceProvider,
      carDetail: {...carObj}
    }
  });

  // console.log(services);
  return services;
};

export const formatAmount = (amount, type = '$') => {
  const convertedAmount = amount/100;
  if (type='$') {
    return numeral(convertedAmount).format('$0,0.00');
  }
  return convertedAmount
}