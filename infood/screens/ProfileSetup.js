import { Image } from "expo-image";
import InFood from "../assets/InFood.png";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../globals/styles";
import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";

const Stack = createStackNavigator();
export default function ProfileSetup({ navigation }) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  useEffect(() => {
    register("name");
    register("password");
  }, [register]);

  const onChangeField = useCallback(
    (name) => (text) => {
      setValue(name, text);
    },
    []
  );

  return (
    <SafeAreaProvider style={styles.viewArea}>
      <SafeAreaView>
        <View style={styles.mainCont}>
          {/* <Image
            source={InFood}
            style={styles.logo}
          /> */}
          <View style={styles.logo}>
            <Text style={styles.LogoText}>profile</Text>
            <Text style={styles.LogoText1}>Setup</Text>
          </View>

          <TextInput
            autoCompleteType="Full Name"
            keyboardType="Full Name"
            textContentType="Full Name"
            placeholder="Full Name"
            onChangeText={onChangeField("name")}
            underlineColor="transparent"
            style={styles.textInput}
          />
          <TextInput
            autoCompleteType="Phone Number"
            placeholder="Phone Number"
            onChangeText={onChangeField("password")}
            style={styles.textInput}
            underlineColor="transparent"
          />
          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            style={{
              width: "80%",
              textAlign: "center",
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 5,
            }}
            textColor={colors.primary}
            theme={{
              colors: {
                text: colors.primary,
              },
            }}
          >
            Submit
          </Button>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  viewArea: {
    backgroundColor: colors.secondary,
  },
  mainCont: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    flexDirection: "row",
    padding: "10%",
  },
  LogoText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 35,
    fontStyle: "italic",
  },
  LogoText1: {
    color: colors.tertiary,
    fontWeight: "bold",
    fontSize: 35,
    fontStyle: "italic",
  },
  textInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "80%",
    borderBottom: "transparent",
    borderColor: colors.primary,
  },
});
