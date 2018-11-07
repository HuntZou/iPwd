import React from "react";
import {
  View,
  Text,
  SectionList,
  TextInput,
  Button,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import PwdListItem from "../components/PwdListItem";
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
      keyword: "",
      refreshing: false,
      backCounter: 0
    };
  }

  _retrievePwd = async () => {
    this.setState({ refreshing: true });
    try {
      const value = await AsyncStorage.getItem("pwds");
      this.setState({ virtualPwds: JSON.parse(!!value ? value : "[]") });
    } catch (error) {
      Alert.alert("retrieve pwd occur error:" + error);
    } finally {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
    }
  };

  /**Search with keyword */
  _searchPwd = async keyword => {
    AsyncStorage.getItem("pwds")
      .then(pwds_str => {
        const pwds = JSON.parse(pwds_str);
        var virualPwds = [];
        !!pwds &&
          pwds.map(pwd => {
            for (const key in pwd) {
              var value = pwd[key] + "";
              if (
                !keyword ||
                value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
              ) {
                virualPwds.push(pwd);
                break;
              }
            }
          });
        this.setState({ virtualPwds: virualPwds });
      })
      .catch(error => Alert.alert("search error:" + error));
  };

  /**退出app */
  _exitApp = () => {
    if (this.state.backCounter == 1) {
      BackHandler.exitApp();
    } else {
      this.refs.toast.show("Press back again to exit app.");
      this.setState({ backCounter: 1 });
      setTimeout(() => this.setState({ backCounter: 0 }), 1000);
    }
  };

  componentDidMount = () => {
    this._retrievePwd();
    //back btn handler on android,ios no effect
    // todo if add handler there,it may cause a problem that whatever screen you double click back btn,it will make app exit.
    // this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
    //   this._exitApp(); // works best when the goBack is async
    //   return true;
    // });
  };

  componentWillUnmount() {
    //unmount back btn handler
    // this.backHandler.remove();
  }

  _separator = () => {
    return <View style={{ height: 15, backgroundColor: "#00000000" }} />;
  };
  render() {
    const shadowOpt = {
      width: 160,
      height: 170,
      color: "#000",
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      style: { marginVertical: 5 }
    };
    return (
      <View style={style.container}>
        {/*search box on top */}
        <View style={style.search_box}>
          <TextInput
            underlineColorAndroid="transparent"
            onChangeText={text => this._searchPwd(text)}
            style={style.search_input}
          />
        </View>
        {!!this.state.virtualPwds && this.state.virtualPwds.length > 0 ? (
          <FlatList
            style={style.pwd_list}
            refreshing={this.state.refreshing}
            onRefresh={this._retrievePwd}
            ItemSeparatorComponent={this._separator}
            data={this.state.virtualPwds}
            renderItem={({ item }) => <PwdListItem pwdInfo={item} />}
          />
        ) : this.state.refreshing ? (
          <View style={style.nopwd_tip_home}>
            <Text style={style.refreshing_tip}>Refreshing...</Text>
          </View>
        ) : (
          <TouchableWithoutFeedback
            onPress={this._retrievePwd}
            style={{ flex: 1 }}
          >
            <View style={style.nopwd_tip_home}>
              <Text style={style.nopwd_tip}>You have not add any password</Text>
              <Text style={style.nopwd_tip}>Or click blank to refresh.</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        {/**add pwd btn */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AddPwd")}
          style={style.add_pwd_btn_home}
        >
          <Image
            source={require("../assets/icons8-plus-96.png")}
            style={style.add_pwd_btn}
          />
        </TouchableOpacity>
        <Toast ref="toast" />
      </View>
    );
  }
}

const style = StyleSheet.create({
  refreshing_tip: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#7AC5CD"
  },
  add_pwd_btn_home: {
    position: "absolute",
    bottom: 60,
    right: 40
  },
  add_pwd_btn: {
    height: 55,
    width: 55
  },
  nopwd_tip: {
    fontWeight: "bold",
    fontSize: 25,
    color: "rgba(0,0,0,0.3)"
  },
  nopwd_tip_home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flexDirection: "column",
    flex: 1
  },
  search_input: {
    height: 25,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 10
  },
  search_box: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  pwd_list: {
    flex: 1
  }
});
