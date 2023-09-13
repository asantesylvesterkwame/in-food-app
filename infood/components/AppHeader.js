import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../globals/styles";

const AppHeader = ({ children }) => {
  return (
    <View style={styles.header}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    height: "25%",
  },
  content: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AppHeader;
