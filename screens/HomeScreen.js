import React from 'react';
import { View, Text, SectionList, TextInput, Button, StyleSheet, Image, FlatList, Alert, AsyncStorage } from 'react-native';
import PwdListItem from '../components/PwdListItem';
/**
 * category:commonly Sensitive
 * name
 * recordTime
 * updateTime
 * comment
 * account
 * pwd
 */
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualPwds: [
                {
                    key: 'a',
                    category: "commonly",
                    name: 'MSN',
                    recordTime: '2018-09-26',
                    updateTime: '2019-01-11',
                    comment: 'it is very importent for me',
                    account: 'zouheng613@163.com',
                    pwd: '12345678',
                    icon: 'https://png.icons8.com/color/50/000000/bing.png'
                },
                {
                    key: 'b',
                    category: "sensitive",
                    name: 'QQ',
                    recordTime: '2018-09-26',
                    updateTime: '2019-01-11',
                    comment: 'if you want pwd,call me',
                    account: '709434129',
                    pwd: 'abcdefg',
                    icon: 'https://png.icons8.com/color/50/000000/qq.png'
                },
                {
                    key: 'c',
                    category: "sensitive",
                    name: 'Email',
                    recordTime: '2018-09-26',
                    updateTime: '2019-01-11',
                    comment: 'no word to say',
                    account: 'v-huzou@expedia.com',
                    pwd: 'sdjs%4d*@js',
                    icon: 'https://png.icons8.com/doodle/50/000000/email.png'
                },
            ],
            allPwds: [],
            keyword: ''
        }
    }

    _retrievePwd = async () => {
        try {
            const value = await AsyncStorage.getItem('pwds');
            if (value !== null) {
                console.log(value)
                this.setState({
                    allPwds: JSON.parse(value)
                })
            }
        } catch (error) {
            Alert.alert("retrieve pwd occur error:" + error)
        }
    }

    /**使用关键词搜索 */
    _searchPwd = (keyword) => {
        if (keyword == null || keyword.trim() === '')
            return this.state.allPwds;
        var visualPwds = [];
        this.state.allPwds.map(pwd => {
            for (const key in pwd) {
                if (pwd.hasOwnProperty(key)) {
                    const element = pwd[key];
                    if (element.indexOf(keyword)) {
                        visualPwds.push(pwd);
                        break;
                    }
                }
            }
        })
        return visualPwds;
    }

    componentWillMount = () => {
        this._retrievePwd();
    }

    _separator = () => {
        return <View style={{ height: 8, backgroundColor: '#00000000' }} />;
    }
    render() {
        return (
            <View style={style.container}>
                {/*顶部搜索框*/}
                <View style={style.search_box}>
                    <TextInput onChangeText={(text) => this.setState({ keyword: text })} style={style.search_input} />
                </View>
                <FlatList
                    ItemSeparatorComponent={this._separator}
                    data={this._searchPwd()}
                    renderItem={({ item }) => <PwdListItem pwdInfo={item} />}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {},
    search_input: {
        height: 35
    },
})