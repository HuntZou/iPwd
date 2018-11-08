import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  Alert,
  FlatList,
  TouchableOpacity
} from "react-native";
import { List } from "antd-mobile-rn";

const Item = List.Item;
const Brief = Item.Brief;

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdCount: 0,
      currentLanguage: global.language,
      choiceLanguage: false
    };
  }
  _doChoicLanguage = item => {
    this.setState({ currentLanguage: item.label, choiceLanguage: false });
    //set globel language setting
    global.language = item.val;
  };
  _doCleanCache = async () => {
    await AsyncStorage.clear();
    this.setState({ pwdCount: 0 });
  };
  _cleanCache = () => {
    Alert.alert(
      "Clean Cache",
      "Are you sure to clean cache within all passwords",
      [
        {
          text: "Yes,I`m sure",
          onPress: this._doCleanCache
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  componentDidMount = () => {
    //set pads count
    AsyncStorage.getItem("pwds").then(v => {
      var pwds = JSON.parse(v);
      this.setState({ pwdCount: pwds == null ? 0 : pwds.length });
    });
  };

  render() {
    return (
      <View>
        <List
          renderFooter={
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "rgba(0,0,0,0.3)" }}>
                Danger is very real, but fear, fear is a choice
              </Text>
            </View>
          }
        >
          <Brief>System</Brief>
          <Item
            thumb="https://img.icons8.com/color/96/ffffff/language.png"
            arrow="horizontal"
            extra={this.state.currentLanguage}
            onClick={() =>
              this.setState({ choiceLanguage: !this.state.choiceLanguage })
            }
          >
            Language
          </Item>
          {this.state.choiceLanguage ? (
            <FlatList
              data={[
                { key: "en", val: "en", label: "English" },
                { key: "zh", val: "zh_hans", label: "简体中文" }
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this._doChoicLanguage(item)}>
                  <View
                    style={{
                      alignItems: "center",
                      borderBottomColor: "rgba(0,0,0,0.1)",
                      borderBottomWidth: 1,
                      marginHorizontal: 70,
                      paddingVertical: 8
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : null}
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/security-checked.png"
            arrow="horizontal"
            extra="Local"
            onClick={() =>
              Alert.alert(
                "I`m sorry",
                "This function is missing.but what do I know,I`m just a dog.",
                [{ text: "Got it" }]
              )
            }
          >
            Security
          </Item>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/tape-drive.png"
            arrow="horizontal"
            extra={this.state.pwdCount + " Item"}
            onClick={this._cleanCache}
          >
            Clean cache
          </Item>
          <Brief>Coder</Brief>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/feedback.png"
            arrow="horizontal"
            extra="Edit"
            onClick={() => this.props.navigation.navigate("Feedback")}
          >
            FeedBack
          </Item>
          <Item
            thumb="https://img.icons8.com/office/40/ffffff/about.png"
            arrow="horizontal"
            extra="Simon&Hunt"
            onClick={() => this.props.navigation.navigate("About")}
          >
            About
          </Item>
        </List>
      </View>
    );
  }
}
