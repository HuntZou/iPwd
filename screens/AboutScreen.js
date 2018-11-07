import React from "react";
import { View, Text } from "react-native";

export default class AboutScreen extends React.Component {
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text
          style={{ fontWeight: "bold", fontSize: 32, color: "rgba(0,0,0,0.3)" }}
        >
          Simon&Hunt
        </Text>
        <Text>I remember that it hurt,looking at her hurt.</Text>
      </View>
    );
  }
}
