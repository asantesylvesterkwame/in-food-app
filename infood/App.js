import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./globals/styles";
import OnBoarding from "./screens/OnBoarding";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import ProfileSetup from "./screens/ProfileSetup";
import { StatusBar } from "expo-status-bar";
import AppDrawerNavigator from "./AppDrawerNavigator";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppDrawerNavigator/>
      <StatusBar
        backgroundColor="#2b2b2b"
        translucent={true}
        style="light"
      />
      <Stack.Navigator initialRouteName="OnBoarding">
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
          name="Home"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="ProfileSetup"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
          component={ProfileSetup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
