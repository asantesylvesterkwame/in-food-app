import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Home</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
