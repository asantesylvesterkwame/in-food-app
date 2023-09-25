// import { Image } from "expo-image";
import InFood from "../assets/InFood.png";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../globals/styles";
import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Link } from "expo-router";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import PhoneInput from "react-native-phone-number-input";
import * as ImagePicker from "expo-image-picker";
import { Auth, storage, firebase } from "../firebase.config";
import noAvatar from "../assets/no-avatar.png";
import { Cloudinary } from "cloudinary-react-native";
import uploadProfilePhoto from "../utils/upload";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";

const Stack = createStackNavigator();
export default function ProfilePage({ navigation }) {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [error, setError] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  // const [user, setUser] = useState({});
  const [user] = useAuthState(Auth);
  console.log("Profile url is ", profilePhotoURL);

  useEffect(() => {}, []);
  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      setImageURI();
      const imageBlob = await getBlobFromUri(imageURI);

      const profilePhotoRef = ref(storage, `profile-photo${user.uid}`);
      const metadata = {
        contentType: "image/jpeg",
      };

      uploadBytes(profilePhotoRef, imageBlob, metadata).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
  };
  const downLoadUrl = () => {
    getDownloadURL(ref(storage, `profile-photo${user.uid}`))
      .then((url) => {
        setProfilePhotoURL(url);
        setImageURI(url);
        // console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { register, handleSubmit, setValue } = useForm();
  // const auth = getAuth();
  const onSubmit = useCallback(async (formData) => {
    await updateProfile(user, {
      displayName: formData.displayName,
      phoneNumber: formData.phoneNumber,
      // photoURL: profilePhotoURL,
    })
      .then(() => {
        console.log("Submitted Url", profilePhotoURL);
        // Profile updated!
        console.log(user);
        setTimeout(() => {
          setUpdateStatus("Profile has been updated Successfully");
        }, 5000);

        // navigation.navigate("Home");
        // ...
        setEditProfile(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Photo Upload Failed");
      });
    await updateProfile(user, {
      photoURL: profilePhotoURL,
    });
    console.log("NeW Profile Photo", profilePhotoURL);
    console.log(user);
  }, []);

  downLoadUrl();
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

  const handleLogout = () => {
    signOut(Auth)
      .then(() => {
        // Sign-out successful.

        setUpdateStatus("User Has Logged Out Successfully");
        console.log("User Has Logged Out Successfully");
      })
      .catch((error) => {
        // An error happened.
        setError("User Logout Failed! Try again");
        console.log(error);
      });

    navigation.navigate("Register");
  };

  return (
    <SafeAreaProvider style={styles.viewArea}>
      <SafeAreaView>
        <View style={styles.mainCont}>
          {/* <Image
            source={InFood}
            style={styles.logo}
          /> */}
          <View style={styles.logo}>
            <Text style={styles.LogoText}>Profile</Text>
            <Text style={styles.LogoText1}>Page</Text>
          </View>
          {!editProfile ? (
            <View style={styles.imageContainer}>
              <Image
                source={user.photoURL ? user.photoURL : noAvatar}
                style={styles.image}
                onChangeText={onChangeField("photoURL")}
              />
              <Text>
                {user.displayName
                  ? user.displayName
                  : "No UserName Is Available ; Edit Profile"}
              </Text>
              <Button
                title="Select Image"
                onPress={() => {
                  setEditProfile(true);
                }}
                style={styles.imageUploadBtn}
                textColor={colors.secondary}
                mode="contained"
                onChangeText={onChangeField("photoURL")}
              >
                Edit Profile
              </Button>
              <View style={styles.imageContainer}>
                <TouchableOpacity>
                  <Button
                    title="Submit"
                    onPress={handleLogout}
                    mode="contained"
                    style={{
                      width: "80%",
                      textAlign: "center",
                      backgroundColor: colors.error,
                      borderWidth: 1,
                      borderColor: colors.primary,
                      borderRadius: 5,
                    }}
                    textColor={colors.secondary}
                    theme={{
                      colors: {
                        text: colors.secondary,
                      },
                    }}
                  >
                    Logout
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.imageContainer}>
                {!imageURI ? (
                  <>
                    <Image
                      title="Select Image"
                      onPress={handleImagePicker}
                      style={styles.Icon}
                      // textColor={colors.secondary}
                      // mode="contained"
                      source={
                        user.photoURL
                          ? user.photoURL
                          : require("../assets/no-profile-picture-15257.png")
                      }
                      onChangeText={onChangeField("photoURL")}
                    />

                    <Button
                      title="Select Image"
                      onPress={handleImagePicker}
                      style={styles.imageUploadBtn}
                      textColor={colors.secondary}
                      mode="contained"
                    >
                      {user.photoURL ? "Change Picture" : "Upload Picture"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Image
                      source={{ uri: user ? user.photoURL : imageURI }}
                      style={styles.image}
                      onLoad={onChangeField("photoURL")}
                    />
                    <Button
                      title="Select Image"
                      onPress={handleImagePicker}
                      style={styles.imageUploadBtn}
                      textColor={colors.secondary}
                      mode="contained"
                      onChangeText={onChangeField("photoURL")}
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
            </>
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
    // fill: colors.tertiary,
  },
  logoutView: {
    justifyContent: "",
  },
});
