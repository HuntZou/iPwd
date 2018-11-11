import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  Alert,
  FlatList,
  TouchableOpacity
} from "react-native";
import string from "../utils/i18n";
import { List, PickerView } from "antd-mobile-rn";

const Item = List.Item;
const Brief = Item.Brief;

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdCount: 0,
      currentLanguage: global.language?global.language.value:"简体中文",
      choiceLanguage: false
    };
  }
  _doChoicLanguage = item => {
    this.setState({ currentLanguage: item.label, choiceLanguage: false });
    //set globel language setting
    AsyncStorage.setItem("language", item.val).then(() => {
      global.language = {
        val:item.val,
        value:item.label
      }
    });
    //goBack to home
    this.props.navigation.navigate("Home")
  };
  _doCleanCache = async () => {
    await AsyncStorage.clear();
    this.setState({ pwdCount: 0 });
  };
  _cleanCache = () => {
    Alert.alert(
      string.clean_cache,
      string.clean_cache_confirm,
      [
        {
          text: string.clean_cache_yes,
          onPress: this._doCleanCache
        },
        {
          text: string.clean_cache_no,
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
                {string.seeting_footer}
              </Text>
            </View>
          }
        >
          <Brief>{string.system}</Brief>
          <Item
            thumb="https://img.icons8.com/color/96/ffffff/language.png"
            arrow="horizontal"
            extra={this.state.currentLanguage}
            onClick={() =>
              this.setState({ choiceLanguage: !this.state.choiceLanguage })
            }
          >
            {string.language}
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
            extra={string.local}
            onClick={() =>
              Alert.alert(
                string.sry_alert,
                string.miss_function,
                [{ text: string.got_it }]
              )
            }
          >
            {string.security}
          </Item>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/tape-drive.png"
            arrow="horizontal"
            extra={this.state.pwdCount + string.item}
            onClick={this._cleanCache}
          >
            {string.clean_cache}
          </Item>
          <Brief>{string.coder}</Brief>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/feedback.png"
            arrow="horizontal"
            extra={string.edit}
            onClick={() => this.props.navigation.navigate("Feedback")}
          >
          {string.feedBack}
          </Item>
          <Item
            thumb="https://img.icons8.com/office/40/ffffff/about.png"
            arrow="horizontal"
            extra="Simon&Hunt"
            onClick={() => this.props.navigation.navigate("About")}
          >
            {string.about}
          </Item>
        </List>
      </View>
    );
  }
}
