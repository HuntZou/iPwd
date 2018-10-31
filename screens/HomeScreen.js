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
            virtualPwds: [],
            keyword: '',
            refreshing: false
        }
    }

    _retrievePwd = async () => {
        this.setState({ refreshing: true })
        try {
            const value = await AsyncStorage.getItem('pwds');
            if(!value)return;
            this.setState({
                virtualPwds: JSON.parse(value)
            })
        } catch (error) {
            Alert.alert("retrieve pwd occur error:" + error)
        } finally {
            this.setState({ refreshing: false })
        }
    }

    /**使用关键词搜索 */
    _searchPwd = async (keyword) => {
        AsyncStorage.getItem('pwds').then(pwds_str => {
            const pwds = JSON.parse(pwds_str);
            if(!keyword)return pwds;

            var virualPwds = [];
            pwds.map(pwd => {
                for (const key in pwd) {
                    if(typeof pwd[key] ==='string' &&  pwd[key].toLowerCase().indexOf(keyword.toLowerCase())!== -1){
                        virualPwds.push(pwd);
                        break;
                    }
                }
            })
            this.setState({ virtualPwds: virualPwds });
        }).catch(error => Alert.alert('search error:' + error))
    }

    componentDidMount = () => {
        this._retrievePwd();
    }

    _separator = () => {
        return <View style={{ height: 15, backgroundColor: '#00000000' }} />;
    }
    render() {
        return (
            <View style={style.container}>
                {/*顶部搜索框*/}
                <View style={style.search_box}>
                    <TextInput onChangeText={text => this._searchPwd(text)} style={style.search_input} />
                </View>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this._retrievePwd}
                    ItemSeparatorComponent={this._separator}
                    data={this.state.virtualPwds}
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