import React from 'react';
import { View, Text, SectionList, TextInput, Button, StyleSheet, Image, FlatList, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
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
            if (!value) return;
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
            if (!keyword) return pwds;

            var virualPwds = [];
            !!pwds && pwds.map(pwd => {
                for (const key in pwd) {
                    var value = pwd[key] + '';
                    if (value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
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
                    <TextInput underlineColorAndroid='transparent' onChangeText={text => this._searchPwd(text)} style={style.search_input} />
                </View>
                {
                    !!this.state.virtualPwds && this.state.virtualPwds.length > 0 ?
                        <FlatList
                            style={style.pwd_list}
                            refreshing={this.state.refreshing}
                            onRefresh={this._retrievePwd}
                            ItemSeparatorComponent={this._separator}
                            data={this.state.virtualPwds}
                            renderItem={({ item }) => <PwdListItem pwdInfo={item} />}
                        />
                        :
                        <View style={style.nopwd_tip_home}>
                            <Text style={style.nopwd_tip}>You have not add any pwd</Text>
                        </View>
                }
                {/**添加密码按钮 */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPwd')} style={style.add_pwd_btn_home}>
                    <Image source={require('../assets/icons8-plus-96.png')} style={style.add_pwd_btn} />
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    add_pwd_btn_home: {
        position: 'absolute',
        bottom: 60,
        right: 40
    },
    add_pwd_btn: {
        height: 55,
        width: 55
    },
    nopwd_tip: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'rgba(0,0,0,0.3)'
    },
    nopwd_tip_home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    search_input: {
        height: 25,
        borderColor: '#0c0c0c',
        borderWidth: 1,
        borderRadius: 99999,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 10
    },
    search_box: {
        paddingVertical: 3,
        paddingHorizontal: 13
    },
    pwd_list: {
        flex: 1,
    }
})