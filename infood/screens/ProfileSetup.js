import { Image } from "expo-image";
import InFood from "../assets/InFood.png";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../globals/styles";
import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";
import { getAuth, updateProfile } from "firebase/auth";
import PhoneInput from "react-native-phone-number-input";
import * as ImagePicker from "expo-image-picker";


const Stack = createStackNavigator();
export default function ProfileSetup({ navigation }) {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [error, setError] = useState(null);
  const [imageURI, setImageURI] = useState(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImageURI(result.uri);
    }
  };

  const { register, handleSubmit, setValue } = useForm();
  const auth = getAuth();
  const onSubmit = useCallback((formData) => {
    updateProfile(auth.currentUser, {
      displayName: formData.displayName,
      phoneNumber: formData.phoneNumber,
      photoURL: imageURI,
    })
      .then(() => {
        // Profile updated!
        console.log(auth.currentUser);
        setTimeout(() => {
          setUpdateStatus("Profile has been updated Successfully");
        }, 5000);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
        setError("Profile Update failed Try again");
      });
    console.log(formData);
  }, []);

  useEffect(() => {
    register("displayName");
    register("phone-number");
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

          <View style={styles.imageContainer}>
            {!imageURI ? (
              <>
                <Image
                  title="Select Image"
                  onPress={handleImagePicker}
                  style={styles.Icon}
                  // textColor={colors.secondary}
                  // mode="contained"
                  source={require("../assets/no-profile-picture-15257.png")}
                />
                <Button
                  title="Select Image"
                  onPress={handleImagePicker}
                  style={styles.imageUploadBtn}
                  textColor={colors.secondary}
                  mode="contained"
                >
                  Upload Picture
                </Button>
                
              </>
            ) : (
              <>
                <Image
                  source={{ uri: imageURI }}
                  style={styles.image}
                />
                <Button
                  title="Select Image"
                  onPress={handleImagePicker}
                  style={styles.imageUploadBtn}
                  textColor={colors.secondary}
                  mode="contained"
                >
                  Change Photo
                </Button>
              </>
            )}
          </View>
          <TextInput
            autoCompleteType="displayName"
            keyboardType="ascii-capable"
            placeholder="Full Name"
            onChangeText={onChangeField("displayName")}
            underlineColor="transparent"
            style={styles.textInput}
          />
          <PhoneInput
            defaultCode="GH"
            layout="first"
            withShadow
            autoFocus
            autoCompleteType="Phone Number"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onChangeText={onChangeField("phone-number")}
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
          {updateStatus && (
            <View
              style={styles.successCont}
              textColor={colors.secondary}
            >
              <Text style={styles.successText}>{updateStatus}</Text>
            </View>
          )}
          {error && (
            <View
              style={styles.errorCont}
              textColor={colors.secondary}
            >
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
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
  errorCont: {
    backgroundColor: colors.error,
    padding: "5%",
    borderRadius: 10,
  },
  errorText: {
    color: colors.secondary,
  },
  successCont: {
    backgroundColor: colors.success,
    padding: "5%",
    borderRadius: 10,
  },
  successText: {
    color: colors.secondary,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
  },
  imageUploadBtn: {
    backgroundColor: colors.tertiary,
    color: colors.secondary,
    padding: "1%",
    width: "100%",
    textAlign: "center",
  },
  Icon: {
    width: 100,
    height: 100,
    fill: colors.tertiary,
  },
});
