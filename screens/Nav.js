import { createStackNavigator } from 'react-navigation'
import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen';
import BootScreen from './BootScreen';
import AddPwdScreen from './AddPwdScreen';

export default Nav = createStackNavigator({
    Boot: {
        screen: BootScreen,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: null,
            headerRight: <TouchableOpacity onPress={() => navigation.navigate("AddPwd")}><Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../assets/plus_math.png')} /></TouchableOpacity>
        }),
    },
    AddPwd: {
        screen: AddPwdScreen,
        navigationOptions: ({ navigation }) => ({
        })
    },
},
    {
        initialRouteName: 'Boot',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3770fa',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
        cardStack: {
            gesturesEnabled: true 
        }
    }
)