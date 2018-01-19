import _ from 'lodash';
import moment from 'moment';
import { formatAmount } from '../utils';

//================================================
//- Get passed in the visible services returns
//- following object:
/* {
    totalAmount,
    lastOilChange: { carNickName, serviceDate }
   }
*/
//================================================
export const serviceSummary = (services = []) => {
  if (services.length === 0) {
    return {};
  }
  console.log('SERVICES', services);
  //Find the total amount of the visible services
  const totalAmount = formatAmount(services.reduce((sum, value) => sum + value.serviceCost, 0));
  //Find last oil change
  let oilChanges = services.filter(service => service.serviceDescription.toLowerCase().includes('oil'));
  //sort desc by created at date and grab the first entry in the array
  let lastOilChangeObj = _.orderBy(oilChanges, ['serviceCost'], ['serviceDescription'])[0];
  console.log('LAST OIL', lastOilChangeObj)
  return {
    totalAmount,
    lastOilChange: {
      carNickName: lastOilChangeObj.carDetail.nickName,
      serviceDate: moment(lastOilChangeObj.serviceDate).format('MMM Do YYYY')
    }
  };
};
