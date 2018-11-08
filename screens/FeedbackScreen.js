import React from "react";
import { View } from "react-native";
import { TextareaItem, Button } from "antd-mobile-rn";

export default class FeedbackScreen extends React.Component {
  render() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <TextareaItem
          style={{ marginVertical: 10, borderRadius: 3 }}
          placeholder="Your valuable advice is the source of our progress."
          rows={10}
        />
        <Button type="primary">Send Feedback</Button>
      </View>
    );
  }
}
