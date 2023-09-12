import { Image } from "expo-image";
import InFood from "../assets/InFood.png";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Linking,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../globals/styles";
import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Provider, Auth } from "../firebase.config";

const Stack = createStackNavigator();
export default function Register({ navigation }) {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback((formData) => {
    createUserWithEmailAndPassword(Auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          navigation.navigate("ProfileSetup");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        // ..
      });
    console.log(formData);
  }, []);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const onChangeField = useCallback(
    (name) => (text) => {
      setValue(name, text);
    },
    []
  );
  const credentialsAuth = () => {
    createUserWithEmailAndPassword(
      Auth,
      register("email"),
      register("password")
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <SafeAreaProvider style={styles.viewArea}>
      <SafeAreaView>
        <View style={styles.mainCont}>
          <Image
            source={InFood}
            style={styles.logo}
          />

          <TextInput
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Enter your email..."
            onChangeText={onChangeField("email")}
            underlineColor="transparent"
            style={styles.textInput}
          />
          <TextInput
            secureTextEntry
            autoCompleteType="password"
            placeholder="Enter your password..."
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
            Register
          </Button>
          <Button
            textColor={colors.primary}
            style={{
              width: "80%",
              textAlign: "center",
              backgroundColor: colors.tertiary,
              borderWidth: 1,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <FontAwesome
              name="google"
              size={20}
              color={colors.primary}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            /> */}
            <Text>Sign Up with Google</Text>
          </Button>

          <Text>
            Already Have An Account?{" "}
            <Link href={""}>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Log in
              </Text>
            </Link>
          </Text>
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
    width: "100%",
    height: "50%",
  },
  textInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "80%",
    borderBottom: "transparent",
  },
});
