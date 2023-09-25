import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../globals/styles";
import AppHeader from "../components/AppHeader";
import {
  Badge,
  Button,
  Card,
  Icon,
  withBadge,
  Overlay,
  Image,
} from "react-native-elements";
import { useEffect, useState } from "react";
import foodone from "../assets/foodone.jpg";
import foodImage from "../assets/foodtwo.jpg";
import noAvatar from "../assets/no-avatar.png";
import { Auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  const [activeTab, setActiveTab] = useState(true);
  const BadgeIcon = withBadge(3)(Icon);
  const [refreshing, setRefreshing] = useState(false);

  const { width } = Dimensions.get("window");

  // const [user, setUser] = useState({});
  const [user] = useAuthState(Auth);

  useEffect(() => {
    // onAuthStateChanged(Auth, (user) => {
    //   setUser(user);
    //   console.log("current user", user);
    // });
  }, []);

  const data = [
    {
      id: "1",
      image: foodone,
      title: "Dishes & Barrels",
      rating: 4.5,
      deliveryPrice: 5.6,
      deliveryTime: `${30}mins`,
      discount: 30,
    },
    {
      id: "2",
      image: foodImage,
      title: "Banku & Okro Stew",
      rating: 3.7,
      deliveryPrice: 8.0,
      deliveryTime: `${30}mins`,
      discount: 50,
    },
    {
      id: "1",
      image: foodone,
      title: "Dishes & Barrels",
      rating: 4.5,
      deliveryPrice: 5.6,
      deliveryTime: `${30}mins`,
      discount: 30,
    },
    {
      id: "2",
      image: foodImage,
      title: "Banku & Okro Stew",
      rating: 3.7,
      deliveryPrice: 8.0,
      deliveryTime: `${30}mins`,
      discount: 50,
    },
    {
      id: "1",
      image: foodone,
      title: "Dishes & Barrels",
      rating: 4.5,
      deliveryPrice: 5.6,
      deliveryTime: `${30}mins`,
      discount: 30,
    },
    {
      id: "2",
      image: foodImage,
      title: "Banku & Okro Stew",
      rating: 3.7,
      deliveryPrice: 8.0,
      deliveryTime: `${30}mins`,
      discount: 50,
    },
    // Add more objects for more cards
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.mainWindow}>
          <View
            style={{
              padding: "2.5%",
              borderBottomWidth: 1,
              borderBottomColor: colors.primary,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.locationView}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color={colors.primary}
                />
                <Text>Old Town Park Ashaley Botwe</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfilePage")}
                >
                  <Image
                    source={
                      user.photoURL
                        ? { uri: user.photoURL }
                        : require("../assets/no-avatar.png")
                      // noAvatar
                      // : auth.currentUser.photoURL
                    }
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ordersView}>
              <Button
                title="Ongoing Orders"
                buttonStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 100,
                  border: "none",
                  marginTop: "5%",
                }}
              />
            </View>
          </View>
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.CatTitleView}>
              <View>
                <Text style={styles.rightCatText}>Near You</Text>
              </View>
              <View>
                <Text style={styles.CatText}>All</Text>
              </View>
            </View>

            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{ width: width - 60, marginRight: 0 }}
                  >
                    <Card
                      containerStyle={{
                        borderRadius: 25,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Card.Image
                        onPress={() => {
                          navigation.navigate("ResturantDetails");
                        }}
                        style={{
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: colors.primary,
                        }}
                        source={item.image}
                      >
                        <View style={styles.discountContainer}>
                          <Text style={styles.discountText}>
                            {item.discount}% OFF
                          </Text>
                        </View>
                      </Card.Image>
                      {/* <Card.Divider /> */}
                      <Card.Title style={styles.catSubText}>
                        {item.title}
                      </Card.Title>
                      <View style={styles.catMetaView}>
                        <View style={styles.statsView}>
                          <Icon
                            name="star"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.rating}
                          </Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="motorcycle"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="clock-time-eight"
                            type="material-community"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryTime}</Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.CatTitleView}>
              <View>
                <Text style={styles.rightCatText}>
                  Discounts On Entire Menu
                </Text>
              </View>
              <View>
                <Text style={styles.CatText}>All</Text>
              </View>
            </View>
            <View style={styles.AllCat}>
              <View style={styles.card}></View>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{ width: width - 60, marginRight: 0 }}
                  >
                    <Card
                      containerStyle={{
                        borderRadius: 25,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Card.Image
                        style={{
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: colors.primary,
                        }}
                        source={item.image}
                      >
                        <View style={styles.discountContainer}>
                          <Text style={styles.discountText}>
                            {item.discount}% OFF
                          </Text>
                        </View>
                      </Card.Image>
                      {/* <Card.Divider /> */}
                      <Card.Title style={styles.catSubText}>
                        {item.title}
                      </Card.Title>
                      <View style={styles.catMetaView}>
                        <View style={styles.statsView}>
                          <Icon
                            name="star"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.rating}
                          </Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="motorcycle"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="clock-time-eight"
                            type="material-community"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryTime}</Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.CatTitleView}>
              <View>
                <Text style={styles.rightCatText}>Save On Delivery</Text>
              </View>
              <View>
                <Text style={styles.CatText}>All</Text>
              </View>
            </View>
            <View style={styles.AllCat}>
              <View style={styles.card}></View>
            </View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{ width: width - 60, marginRight: 0 }}
                  >
                    <Card
                      containerStyle={{
                        borderRadius: 25,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Card.Image
                        style={{
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: colors.primary,
                          resizeMode: "cover",
                        }}
                        source={item.image}
                      >
                        <View style={styles.discountContainer}>
                          <Text style={styles.discountText}>
                            {item.discount}% OFF
                          </Text>
                        </View>
                      </Card.Image>

                      {/* <Card.Divider /> */}
                      <Card.Title style={styles.catSubText}>
                        {item.title}
                      </Card.Title>
                      <View style={styles.catMetaView}>
                        <View style={styles.statsView}>
                          <Icon
                            name="star"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.rating}
                          </Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="motorcycle"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="clock-time-eight"
                            type="material-community"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryTime}</Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.CatTitleView}>
              <View>
                <Text style={styles.rightCatText}>All Resturants</Text>
              </View>
              <View>
                <Text style={styles.CatText}>All</Text>
              </View>
            </View>
            <View style={styles.AllCat}>
              <View style={styles.card}></View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{ width: width, marginRight: 0 }}
                  >
                    <Card
                      containerStyle={{
                        borderRadius: 25,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Card.Image
                        style={{
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: colors.primary,
                        }}
                        source={item.image}
                      >
                        <View style={styles.discountContainer}>
                          <Text style={styles.discountText}>
                            {item.discount}% OFF
                          </Text>
                        </View>
                      </Card.Image>
                      {/* <Card.Divider /> */}
                      <Card.Title style={styles.catSubText}>
                        {item.title}
                      </Card.Title>
                      <View style={styles.catMetaView}>
                        <View style={styles.statsView}>
                          <Icon
                            name="star"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.rating}
                          </Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="motorcycle"
                            type="font-awesome"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.statsView}>
                          <Icon
                            name="clock-time-eight"
                            type="material-community"
                            color={colors.primary}
                          />
                          <Text>{item.deliveryTime}</Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerTabsView}>
              <TouchableOpacity>
                <Icon
                  name="silverware-fork-knife"
                  type="material-community"
                  color={activeTab ? colors.primary : colors.background}
                  size={50}
                  onPress={() => {
                    setActiveTab(true);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.footerTabsView}>
              <TouchableOpacity>
                <Icon
                  name="magnify"
                  type="material-community"
                  color={!activeTab ? colors.primary : colors.background}
                  size={50}
                  onPress={() => {
                    setActiveTab(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainWindow: {
    justifyContent: "flex-end",
    padding: "2%",
    backgroundColor: colors.secondary,
  },
  ordersView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  CatText: {
    color: "#AAAAAA",
    padding: "2%",
  },
  AllCat: {},
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  CatTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightCatText: {
    fontWeight: "900",
  },
  catSubText: {
    textAlign: "left",
    marginTop: "2%",
  },
  catMetaView: {
    justifyContent: "",
    // alignContent: "flex-start",
    alignItems: "center",
    // borderWidth: 1,
    flexDirection: "row",
    gap: 10,
  },
  statsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2.5,
  },
  discountContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 20,
  },
  discountText: {
    color: "red",
    fontWeight: "normal",
  },
  footer: {
    backgroundColor: "#f8f9fa",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  footerTabsView: {
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
  },
});
