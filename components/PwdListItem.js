import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export default class PwdListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openEyes: false
        }
    }

    /**判断该用什么背景颜色的卡片 */
    bgColor(category) {
        var color = 'rgba(0,0,0,0.3)';
        switch (category) {
            case 'commonly':
                color = '#EE1289';
                break;
            case 'sensitive':
                color = '#436EEE';
                break;
            default:
                color = 'rgba(0,0,0,0.3)';
        }
        return color;
    }

    /**时间戳转换时间 */
    _timeTransform(time) {
        var result = '1995-06-13 00:00:00'
        var reg = /^\d{13}$/g
        if (reg.test(time)) {
            var date = new Date(time);
            result = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }
        return result;
    }

    render() {
        const { pwdInfo } = this.props;
        return (
            <View style={{ borderRadius: 10, marginHorizontal: 10, backgroundColor: this.bgColor(pwdInfo.category), padding: 5 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: pwdInfo.icon }} style={{ width: 45, height: 45 }} />
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24 }}>{pwdInfo.name}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white' }}>{pwdInfo.account}</Text>
                        </View>
                    </View>
                    <View style={style.line}></View>
                </View>
                <View>
                    <TouchableWithoutFeedback
                        onPressIn={() => this.setState({ openEyes: true })}
                        onPressOut={() => this.setState({ openEyes: false })}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>{this.state.openEyes ? pwdInfo.pwd : pwdInfo.comment}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={style.pwd_time}>rt{this._timeTransform(pwdInfo.recordTime)}</Text>
                        <Text style={style.pwd_time}>ut:{this._timeTransform(pwdInfo.updateTime)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    line: {
        height: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.7)'
    },
    pwd_time: {
        color: '#CDC5BF'
    }
})