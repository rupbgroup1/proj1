import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
//screens
import LoginScreen from '../screens/LoginScreen';
import ForgotPassword from '../screens/ForgotPassword';
import Pic from '../screens/Pic';
import CameraPage from '../screens/CameraPage';
import ImageGallery from '../screens/ImageGallery';
import RegistrationIntroduction from '../screens/RegistrationIntroduction';
import RegistrationP4 from '../screens/RegistrationP4';
import RegistrationP2 from '../screens/RegistrationP2';
import RegistrationP1 from '../screens/RegistrationP1';
import FindNeighboor from '../screens/FindNeighboor';
import RegistrationExtra from '../screens/RegistrationExtra'
import RegistrationP5 from '../screens/RegistrationP5';
import MainPage from '../screens/MainPage';
import Feed from '../components/Feed';
import Param from '../screens/Param';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';
import GeneralEvents from '../screens/Events/GeneralEvents';
import CreateEvent from '../screens/Events/CreateEvent';
import MyEvents from '../screens/Events/MyEvents';
import EventLocation from '../screens/Events/EventLocation';
import GeneralServices from '../screens/Services/GeneralServices';
import MyServices from '../screens/Services/MyServices';
import Chat from '../screens/Chat';
import CreateService from '../screens/Services/CreateService';
import GeneralLosts from '../screens/Losts/GeneralLosts';
import CreateLost from '../screens/Losts/CreateLost';
import MyLosts from '../screens/Losts/MyLosts';
import SideMenu from './SideMenu';
import MyChats from '../screens/MyChats';


//add screens to nav
const navigator = createStackNavigator({
    LoginScreen: LoginScreen,
    ForgotPassword: ForgotPassword,
    Pic: Pic,
    CameraPage: CameraPage,
    ImageGallery: ImageGallery,
    RegistrationP1: RegistrationP1,
    RegistrationP2: RegistrationP2,
    RegistrationP4: RegistrationP4,
    RegistrationExtra: RegistrationExtra,
    FindNeighboor: FindNeighboor,
    RegistrationIntroduction: RegistrationIntroduction,
    RegistrationP5: RegistrationP5,
    MainPage: MainPage,
    Feed: Feed,
    Param: Param,
    Profile: Profile,
    ProfileEdit: ProfileEdit,
    GeneralEvents: GeneralEvents,
    CreateEvent: CreateEvent,
    MyEvents: MyEvents,
    EventLocation: EventLocation,
    GeneralServices: GeneralServices,
    MyServices: MyServices,
    Chat: Chat,
    CreateService: CreateService,
    GeneralLosts: GeneralLosts,
    MyLosts: MyLosts,
    CreateLost: CreateLost,
    SideMenu: SideMenu,
    MyChats:MyChats,
},
    {
        initialRouteName: 'LoginScreen',
        defaultNavigationOptions: {
            headerShown: false
        }
    });

const DrawerStack = createDrawerNavigator(
    {
        Main: navigator
    },
    {
        drawerPosition: 'left',
        initialRouteName: 'Main',
        drawerWidth: 250,
        contentComponent: SideMenu
    }
);



export default AppContainer = createAppContainer(DrawerStack);