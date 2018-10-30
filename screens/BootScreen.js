import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class BootScreen extends React.Component {
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Home');
        }, 1000);
    }
    render() {
        return (
            <View style={style.welcome_word}>
                <Text>Welcome use IPwd</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    welcome_word: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})