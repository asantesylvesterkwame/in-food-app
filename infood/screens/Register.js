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
import { Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";

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
  const signInWithGoogle = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId:
          "236660884581-7o03u29m7p9cmf6k3l1po36ni5khe75o.apps.googleusercontent.com",
        iosClientId:
          "236660884581-09q5uf96mk9no497occggbbt0ciat4tr.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        // Build Firebase credential with the Google access token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          accessToken
        );

        // Sign in with Firebase using the Google credential.
        await firebase.auth().signInWithCredential(credential);

        // Access the signed-in user's information.
        console.log("Logged in as:", user.displayName);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Error signing in with Google:", error);
    }
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
          <View
            style={{
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Icon
              name="google"
              type="material-community"
              color={colors.secondary}
              containerStyle={styles.authIcons}
              onPress={signInWithGoogle}
            />
            <Icon
              name="apple"
              type="material-community"
              color={colors.secondary}
              containerStyle={styles.authIcons}
            />
            <Icon
              name="facebook"
              type="material-community"
              color={colors.secondary}
              containerStyle={styles.authIcons}
            />
            <Icon
              name="phone"
              type="material-community"
              color={colors.secondary}
              containerStyle={styles.authIcons}
            />
          </View>

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
  authIcons: {
    backgroundColor: colors.tertiary,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
