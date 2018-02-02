import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('ios-albums', 30),
    Icon.getImageSource('ios-car', 30),
    Icon.getImageSource('ios-menu', 30)  
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'car-tracker.ServiceListScreen',
          label: 'Service List',
          icon: sources[0],
          title: 'Service List',
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                id: 'side-drawer',
                title: 'Side Menu'
              }
            ],
            rightButtons: [
              {
                systemItem: 'add', // for icon button, provide the local image asset name
                id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
              }
            ]
          }
        },
        {
          screen: 'car-tracker.CarScreen',
          label: 'Car Detail',
          icon: sources[1],
          title: 'Car List',
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                id: 'side-drawer',
                title: 'Side Menu'
              }
            ],
            rightButtons: [
              {
                systemItem: 'add', // for icon button, provide the local image asset name
                id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
              }
            ]
          }
        },
      ],
      drawer: {
        left: {
          screen: 'car-tracker.SideDrawer'
        },
        disableOpenGesture: true,
      }
    });
  })

}

export default startTabs;