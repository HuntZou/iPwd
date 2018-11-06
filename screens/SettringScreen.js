import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { List } from "antd-mobile-rn";

const Item = List.Item;
const Brief = Item.Brief;

export default class SettingScreen extends React.Component {
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
            extra="English"
          >
            Language
          </Item>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/security-checked.png"
            arrow="horizontal"
            extra="Local"
          >
            Security
          </Item>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/tape-drive.png"
            arrow="horizontal"
            extra="5 Item"
          >
            Clean cache
          </Item>
          <Brief>Coder</Brief>
          <Item
            thumb="https://img.icons8.com/ultraviolet/40/ffffff/feedback.png"
            arrow="horizontal"
            extra="Edit"
          >
            FeedBack
          </Item>
          <Item
            thumb="https://img.icons8.com/office/40/ffffff/about.png"
            arrow="horizontal"
            extra="Simon&Hunt"
          >
            About
          </Item>
        </List>
      </View>
    );
  }
}
