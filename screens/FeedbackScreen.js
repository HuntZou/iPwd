import React from "react";
import string from '../utils/i18n';
import { View } from "react-native";
import { TextareaItem, Button } from "antd-mobile-rn";

export default class FeedbackScreen extends React.Component {
  render() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <TextareaItem
          style={{ marginVertical: 10, borderRadius: 3 }}
          placeholder={string.feedback_word}
          rows={10}
        />
        <Button type="primary">{string.feedback_btn}</Button>
      </View>
    );
  }
}
