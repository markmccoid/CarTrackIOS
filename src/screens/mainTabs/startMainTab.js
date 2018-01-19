import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('ios-albums', 30),
    Icon.getImageSource('ios-car', 30)  
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'car-tracker.ServiceListScreen',
          label: 'Service List',
          icon: sources[0],
          title: 'Service List'
        },
        {
          screen: 'car-tracker.CarScreen',
          label: 'Car Detail',
          icon: sources[1],
          title: 'Car List'
        },
      ]
    });
  })

}

export default startTabs;