import React from 'react';
import { View, Text, TextInput, Picker, ScrollView, Button, StyleSheet, AsyncStorage, Alert, TouchableOpacity } from 'react-native';

export default class AddPwdScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'commonly',
            name: '',
            account: '',
            pwd: '',
            comment: '',
        }
    }

    _storagePwd = async () => {
        try {
            var { category, name, account, pwd, comment } = this.state;
            var pwd = { category, name, account, pwd, comment };

            var currentTime = new Date().getTime();

            pwd.recordTime = currentTime;
            pwd.updateTime = currentTime;
            pwd.icon = 'https://png.icons8.com/color/50/000000/bing.png';
            pwd.key = 'zh' + currentTime;

            //确保每个属性都不为空
            for (const key in pwd) {
                if (pwd.hasOwnProperty(key)) {
                    const element = pwd[key];
                    if (!element || element == '') {
                        Alert.alert('You must complete form');
                        return;
                    }
                }
            }

            var pwds_str = await AsyncStorage.getItem('pwds');
            if (pwds_str == null) {
                pwds_str = '[]'
            }
            var pwds = JSON.parse(pwds_str);
            pwds.push(pwd)

            await AsyncStorage.setItem('pwds', JSON.stringify(pwds));

            Alert.alert("storage success")
        } catch (error) {
            Alert.alert("storage pwd error:" + error)
        }
    }

    render() {
        return (
            <View style={style.container}>
                <ScrollView style={style.form_home}>
                    <View style={style.item_home}>
                        <Text style={style.label}>name</Text>
                        <TextInput onChangeText={(text) => this.setState({ name: text })} style={style.input} />
                    </View>
                    <View style={style.item_home}>
                        <Text style={style.label}>account</Text>
                        <TextInput onChangeText={(text) => this.setState({ account: text })} style={style.input} />
                    </View>
                    <View style={style.item_home}>
                        <Text style={style.label}>password</Text>
                        <TextInput onChangeText={(text) => this.setState({ pwd: text })} style={style.input} />
                    </View>
                    <View style={style.item_home}>
                        <Text style={style.label}>comment</Text>
                        <TextInput onChangeText={(text) => this.setState({ comment: text })} style={style.input} />
                    </View>
                    <View style={style.item_home}>
                        <Text style={style.label}>category</Text>
                        <Picker
                            selectedValue={this.state.category}
                            onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                            <Picker.Item label="commonly" value="commonly" />
                            <Picker.Item label="sensitive" value="sensitive" />
                        </Picker>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={this._storagePwd} >
                    <View style={style.submit_btn_home}>
                        <Text style={style.submit_btn} >SUBMIT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    label: {
        fontSize: 20
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    form_home: {
        paddingHorizontal: 5,
    },
    submit_btn: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    submit_btn_home: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9ACD32'
    },
    item_home: {
        marginTop: 10
    },
    input: {
        height: 40
    }
})