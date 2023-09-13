import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import AppHeader from "../components/AppHeader";
import { Header } from "react-navigation-stack";


const Stack = createStackNavigator();

export default function Home({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {/* <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => navigation.openDrawer(),
          }}
          centerComponent={{
            text: "Home",
            style: { color: "#fff" },
          }}
        /> */}
        <AppHeader>
          <View></View>
          <View>
            <Text style={{ fontSize: 20 }}>Home</Text>
          </View>
          <View></View>
        </AppHeader>
        <View></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
