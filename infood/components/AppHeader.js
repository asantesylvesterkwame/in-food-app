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
    height: "30%",
  },
  content: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
export default AppHeader;
