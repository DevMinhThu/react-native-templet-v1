import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from 'app-redux/hooks';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Host } from 'react-native-portalize';
import { isIos } from 'utilities/helper';
import navigationConfigs from '../config/options';
import { APP_ROUTE } from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

const MainStack = createStackNavigator();

const AppStack = () => (
    <Host>
        <MainStack.Navigator keyboardHandlingEnabled={isIos} headerMode={'none'} screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector(state => state.userInfo, isEqual);

    if (token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
