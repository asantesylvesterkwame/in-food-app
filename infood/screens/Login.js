import { Image } from "expo-image";
import InFood from "../assets/InFood.png";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../globals/styles";
import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";
import { Provider, Auth } from "../firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
export default function Login({ navigation }) {
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback((formData) => {
    signInWithEmailAndPassword(Auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          navigation.navigate("Home");
          AsyncStorage.setItem("currentUser", JSON.stringify(user));
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Invalid Email Or Password");
        console.log(errorMessage);

        // ..
      });
    // console.log(formData);
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
  const auth = getAuth();

  const signInWithGoogle = () => {
    signInWithPopup(Auth, Provider)
      .then((res) => {
        console.log("Signed In");
      })
      .catch((err) => {
        console.log(err.message);
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
            // textContentType="emailAddress"
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
            Log in
          </Button>
          {error && (
            <View
              style={styles.errorCont}
              textColor={colors.secondary}
            >
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <TouchableOpacity>
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
              onPress={signInWithGoogle}
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
              <Text>Sign in with Google</Text>
            </Button>
          </TouchableOpacity>

          <Text>
            Already Have An Account?{" "}
            <Link href={""}>
              <Text
                onPress={() => navigation.navigate("Register")}
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Register
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
  errorCont: {
    backgroundColor: colors.error,
    padding: "5%",
    borderRadius: 10,
  },
  errorText: {
    color: colors.secondary,
  },
});
