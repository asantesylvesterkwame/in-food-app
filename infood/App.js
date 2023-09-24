import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./globals/styles";
import OnBoarding from "./screens/OnBoarding";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import ProfilePage from "./screens/ProfilePage";
import { StatusBar } from "expo-status-bar";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase.config";

import "./firebase.config";
import { useEffect, useState } from "react";
import ResturantDetails from "./screens/ResturantDetails";

const Stack = createStackNavigator();

export default function App() {
  // const [user, setUser] = useState({});
  const [user] = useAuthState(Auth);
  useEffect(() => {
    // onAuthStateChanged(Auth, (user) => {
    //   setUser(user);
    //   console.log("current user", user);
    // });
  }, []);
  // const authState = ()=>{
  //   onAuthStateChanged(Auth.currentUser, (currentUser) =>{
  // })

  return (
    <NavigationContainer>
      {/* <AppDrawerNavigator/> */}

      <StatusBar
        backgroundColor="#2b2b2b"
        translucent={true}
        style="light"
      />

      <Stack.Navigator initialRouteName={user ? "Home" : "OnBoarding"}>
        <Stack.Screen
          name="Home"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="ResturantDetails"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={ResturantDetails}
        />
        <Stack.Screen
          name="OnBoarding"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={OnBoarding}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="ProfilePage"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={ProfilePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
