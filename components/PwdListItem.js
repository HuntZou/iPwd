import React from "react";
import Utils from "../utils";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { Button } from "antd-mobile-rn";

export default class PwdListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEyes: false,
      showMenu: false
    };
  }

  /**what bgcolor should be of pwd card */
  bgColor(category) {
    var color = "";
    switch (category) {
      case "commonly":
        color = "#1370F8";
        break;
      case "sensitive":
        color = "#fb8a3d";
        break;
      default:
        color = "rgba(0,0,0,0.3)";
    }
    return color;
  }

  _beforDel = pwdInfo => {
    Alert.alert("Are sure", "you can`t get it back", [
      { text: "Yes,I`m Sure", onPress: () => this.props.delItem(pwdInfo.key) },
      { text: "No,Just Joking" }
    ]);
  };

  render() {
    const { pwdInfo, navigation } = this.props;
    return (
      <View
        style={[
          style.card,
          {
            backgroundColor: this.bgColor(pwdInfo.category),
            shadowColor: this.bgColor(pwdInfo.category)
          }
        ]}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 2
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: pwdInfo.icon }}
                  style={{ width: 35, height: 35 }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 24,
                    marginLeft: 2
                  }}
                >
                  {pwdInfo.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View>
              <Text style={{ color: "white" }}>{pwdInfo.account}</Text>
            </View>
          </View>
          {this.state.showMenu ? (
            <View style={{ flexDirection: "row" }}>
              <Button
                onClick={() =>
                  navigation.navigate("AddPwd", { pwdInfo: pwdInfo })
                }
                type="primary"
                style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}
              >
                Edit
              </Button>
              <Button
                type="warning"
                style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}
                onClick={() => this._beforDel(pwdInfo)}
              >
                Delete
              </Button>
            </View>
          ) : null}
          <View style={style.line} />
        </View>
        <View>
          <TouchableWithoutFeedback
            onPressIn={() => this.setState({ openEyes: true })}
            onPressOut={() => this.setState({ openEyes: false })}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: 8
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {this.state.openEyes ? pwdInfo.pwd : pwdInfo.comment}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={style.pwd_time}>
              rt:{Utils.formatDate(pwdInfo.recordTime)}
            </Text>
            <Text style={style.pwd_time}>
              ut:{Utils.formatDate(pwdInfo.updateTime)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  line: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.7)"
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5,
    shadowRadius: 20
  },
  pwd_time: {
    color: "#CDC5BF"
  }
});
