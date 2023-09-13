import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import Home from "./screens/Home";
import Resturant from "./screens/NavigationDrawerScreens/Resturant";
import Courier from "./screens/NavigationDrawerScreens/Courier";
import Payment from "./screens/NavigationDrawerScreens/Payment";
import Settings from "./screens/NavigationDrawerScreens/Settings";
import Help from "./screens/NavigationDrawerScreens/Help";


const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: "Home",
        title: "overview",
      },
    },
    Resturant: {
      screen: Resturant,
      navigationOptions: {
        drawerLabel: "Resturant",
        title: "overview",
      },
    },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63",
    },
  }
);

export default DrawerNavigator;