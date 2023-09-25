import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import foodCover from "../assets/foodtwo.jpg";
import foodCover1 from "../assets/foodone.jpg";

import { Card, Icon } from "react-native-elements";
import { colors } from "../globals/styles";
import { resturantDetailsData } from "../data/ResturantDetails";

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("window");

const ResturantDetails = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <ImageBackground
              source={foodCover1}
              style={styles.foodImageCover}
            >
              <View style={styles.overlayView}>
                <View style={styles.navView}>
                  <View style={styles.goBackView}>
                    <TouchableOpacity>
                      <Icon
                        name="arrow-left"
                        type="material-community"
                        color={colors.secondary}
                        style={styles.navIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.closeView}>
                    <TouchableOpacity>
                      <Icon
                        name="close"
                        type="material-community"
                        color={colors.secondary}
                        style={styles.navIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.callView}>
                  <TouchableOpacity>
                    <Icon
                      name="phone-outline"
                      type="material-community"
                      color={colors.tertiary}
                      style={styles.phoneIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.resturantNameMainView}>
                  <View style={styles.resturantNameView}>
                    <Text style={styles.resturantName}>Starbites</Text>
                    <Text style={styles.resturantDesc}>
                      Fast Food, Burgers and Chicken Wings
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.Rating}>
              <View style={styles.metaView}>
                <View style={styles.metaData}>
                  <Icon
                    name="star"
                    type="font-awesome"
                    color={colors.primary}
                  />
                  <Text>4.5</Text>
                </View>
                <View style={styles.metaData}>
                  <Icon
                    name="motorcycle"
                    type="font-awesome"
                    color={colors.primary}
                  />
                  <Text>5.00</Text>
                </View>
                <View style={styles.metaData}>
                  <Icon
                    name="clock-time-four-outline"
                    type="material-community"
                    color={colors.primary}
                  />
                  <Text>30 mins</Text>
                </View>
                <View style={styles.metaData}>
                  <Icon
                    name="alert-circle-outline"
                    type="material-community"
                    color={colors.primary}
                  />
                </View>
              </View>
            </View>
            <ScrollView
              vertical
              showsVerticalScrollIndicator={false}
            >
              <View></View>
              <View style={styles.MenuView}>
                <View style={styles.NavMenuView}>
                  <Text style={styles.NavText}>Main Menu</Text>
                  <Text style={styles.NavText}>Burgers</Text>
                </View>

                {resturantDetailsData.map((food) => (
                  <View
                    style={styles.FoodMenu}
                    key={food.id}
                  >
                    <View style={styles.FoodMenuList}>
                      <Text style={styles.NavText}>{food.foodName}</Text>
                      <Text
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {food.foodTags.join(", ")}
                      </Text>
                      <Text style={styles.NavText}>
                        GHC{food.Price.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.foodImageCoverView}>
                      <Image
                        source={food.image}
                        style={styles.foodMenuImage}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  imageView: {
    width: "100%",
    height: "100%",
  },
  foodImageCover: {
    width: "100%",
    height: (height * 1) / 3,
    objectFit: "cover",
    justifyContent: "space-between",
  },
  navView: {
    flexDirection: "row",
    color: colors.secondary,
    justifyContent: "space-between",
  },
  callView: {
    alignItems: "flex-end",
  },
  resturantNameMainView: {
    justifyContent: "center",
    alignItems: "center",
  },
  resturantNameView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 164, 4, 0.5)",
    width: width - 60,
    borderRadius: 20,
    padding: "5%",
  },
  resturantName: {
    fontWeight: "bold",
    color: colors.secondary,
  },
  resturantDesc: {
    fontWeight: "600",
    color: colors.tertiary,
  },
  overlayView: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
    padding: "2%",
  },
  navIcon: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 10,
  },
  phoneIcon: {
    backgroundColor: "#3D9970",
    borderRadius: 100,
    padding: 10,
    borderWidth: 5,
    borderColor: colors.success,
  },
  Rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: "5%",
  },
  metaView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  metaData: {
    flexDirection: "row",
    gap: 2.5,
    alignItems: "center",
  },
  NavMenuView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "5%",
  },
  NavText: {
    fontWeight: "700",
  },
  FoodMenu: {
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        backgroundColor: "white",
      },
    }),
  },
  ScrollView: {
    flexDirection: "column",
  },
  foodMenuImage: {
    borderWidth: 5,
    width: "100%",
    objectFit: "cover",
    height: "100%",
    borderRadius: 10,
  },
  foodImageCoverView: {
    width: "30%",
    height: 100,
  },
  FoodMenuList: {
    flexDirection: "column",
    gap: 10,
  },
});

export default ResturantDetails;
