import React from "react";
import string from "../utils/i18n";
import {
  View,
  Text,
  TextInput,
  Picker,
  ScrollView,
  Button,
  StyleSheet,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from "react-native";

export default class AddPwdScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "commonly",
      name: "",
      account: "",
      pwd: "",
      comment: "",
      recordTime: 0,
      updateTime: 0,
      icon: "https://png.icons8.com/color/40/000000/private2.png",
      key: ""
    };
  }

  _storagePwd = async () => {
    try {
      var {
        category,
        name,
        account,
        pwd,
        comment,
        recordTime,
        updateTime,
        icon,
        key
      } = this.state;
      var pwd = {
        category,
        name,
        account,
        pwd,
        comment,
        recordTime,
        updateTime,
        icon,
        key
      };

      var currentTime = new Date().getTime();

      //key only can be string
      pwd.recordTime = !!key ? recordTime : currentTime;
      pwd.updateTime = !!key ? currentTime : pwd.recordTime;
      pwd.key = !!key ? key : pwd.recordTime + "";

      //make sure every props is not empty
      for (const i in pwd) {
        if (!pwd[i]) {
          Alert.alert("You must complete form:" + i);
          return;
        }
      }

      var pwds_str = (await AsyncStorage.getItem("pwds")) || "[]";
      var pwds = JSON.parse(pwds_str);

      //if pwd.name+pwd.account has exist in pwds,storage fail,Or if key has exist,it means edit,remove older one
      for (var i = 0; i < pwds.length; i++) {
        if (
          pwds[i].name + pwds[i].account === pwd.name + pwd.account &&
          pwds[i].key !== pwd.key
        ) {
          Alert.alert(
            "Storage fail",
            "exist a same account in memory,you must keep name couple account unique"
          );
          return;
        }
        if (pwds[i].key === pwd.key) {
          pwds.splice(i, 1);
        }
      }

      pwds.push(pwd);

      await AsyncStorage.setItem("pwds", JSON.stringify(pwds));

      Alert.alert(
        "Storage Success",
        "you have success storage a password",
        [
          {
            text: "Back List",
            onPress: () => this.props.navigation.navigate("Home")
          },
          {
            text: "Add Another",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("storage pwd error:" + error);
    }
  };

  componentWillMount = () => {
    {
      /** get last screen passing parameters */
    }
    const pwdInfo = this.props.navigation.getParam("pwdInfo");
    this.setState(pwdInfo);
  };

  render() {
    return (
      <View style={style.container}>
        <ScrollView style={style.form_home}>
          <View style={style.item_home}>
            <Text style={style.label}>{string.name}</Text>
            <TextInput
              defaultValue={this.state.name}
              onChangeText={text => this.setState({ name: text })}
              style={style.input}
            />
          </View>
          <View style={style.item_home}>
            <Text style={style.label}>{string.account}</Text>
            <TextInput
              defaultValue={this.state.account}
              onChangeText={text => this.setState({ account: text })}
              style={style.input}
            />
          </View>
          <View style={style.item_home}>
            <Text style={style.label}>{string.password}</Text>
            <TextInput
              defaultValue={this.state.pwd}
              onChangeText={text => this.setState({ pwd: text })}
              style={style.input}
            />
          </View>
          <View style={style.item_home}>
            <Text style={style.label}>{string.comment}</Text>
            <TextInput
              defaultValue={this.state.comment}
              onChangeText={text => this.setState({ comment: text })}
              style={style.input}
            />
          </View>
          <View style={style.item_home}>
            <Text style={style.label}>{string.category}</Text>
            <Picker
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ category: itemValue })
              }
            >
              <Picker.Item label={string.commonly} value="commonly" />
              <Picker.Item label={string.sensitive} value="sensitive" />
            </Picker>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={this._storagePwd}>
          <View style={style.submit_btn_home}>
            <Text style={style.submit_btn}>{string.submit}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  label: {
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  form_home: {
    paddingHorizontal: 5
  },
  submit_btn: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  submit_btn_home: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9ACD32"
  },
  item_home: {
    marginTop: 10
  },
  input: {
    height: 40,
    marginHorizontal: 20
  }
});
