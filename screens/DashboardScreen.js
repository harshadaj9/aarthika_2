import React, {
  useEffect,
  useState,
} from "react";
import Header from "../components/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  PieChart,
} from "react-native-chart-kit";

import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  db,
} from "../firebase/firebaseConfig";

import {
  useLanguage,
} from "../context/LanguageContext";

import translations from "../constants/translations";
import {
  getHealthScore,
} from "../api/healthApi";
const screenWidth =
  Dimensions.get("window").width;

export default function DashboardScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const t =
    translations[language];

  const [
    currentUser,
    setCurrentUser,
  ] = useState("");

  const [
    expenses,
    setExpenses,
  ] = useState([]);

  const [
    balance,
    setBalance,
  ] = useState(0);
 const [
  healthScore,
  setHealthScore,
] = useState(0);

const [
  advice,
  setAdvice,
] = useState("");
  const [
    transactions,
    setTransactions,
  ] = useState([]);
const totalExpense =
  expenses.reduce(
    (sum, item) =>
      sum +
      Number(item.amount),
    0
  );
  console.log(
  "TOTAL EXPENSE:",
  totalExpense
);

console.log(
  "EXPENSES ARRAY:",
  expenses
);
  // LOAD USER

useEffect(() => {

  console.log(
    "TOTAL EXPENSE CHANGED:",
    totalExpense
  );

  loadHealthScore();

}, [totalExpense]);
useEffect(() => {

  console.log(
    "DASHBOARD STARTED"
  );

  loadCurrentUser();

}, []);
useEffect(() => {

  console.log(
    "EXPENSES UPDATED:",
    expenses
  );

}, [expenses]);
  // GET CURRENT USER

const loadCurrentUser =
  async () => {

    try {

      const user =
        await AsyncStorage.getItem(
          "currentUser"
        );

      console.log(
        "CURRENT USER:",
        user
      );

      if (!user) {

        console.log(
          "NO USER FOUND"
        );

        return;

      }

      setCurrentUser(user);

      loadExpenses(user);

      loadTransactions(user);

      loadBalance(user);

    } catch (error) {

      console.log(
        "USER ERROR:",
        error
      );

    }

  };
  // LOAD EXPENSES
const loadExpenses =
  (user) => {

    console.log(
      "LOADING EXPENSES FOR:",
      user
    );

    const q = query(
      collection(
        db,
        "expenses"
      ),
      where(
        "userId",
        "==",
        user
      )
    );

    return onSnapshot(
      q,
      (snapshot) => {

        console.log(
          "EXPENSE COUNT:",
          snapshot.docs.length
        );

        const expenseList =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setExpenses(
          expenseList
        );

      },
      (error) => {

        console.log(
          "EXPENSE ERROR:",
          error
        );

      }
    );

  };

  // LOAD TRANSACTIONS

  const loadTransactions =
    (user) => {

      const q = query(

        collection(
          db,
          "transactions"
        ),

        where(
          "userId",
          "==",
          user
        )

      );

      const unsubscribe =
        onSnapshot(

          q,

          (snapshot) => {

            const txnList =
              snapshot.docs.map(
                (doc) => ({

                  id: doc.id,

                  ...doc.data(),

                })
              );

            setTransactions(
              txnList
            );

          }

        );

      return unsubscribe;

    };
// LOAD BALANCE

const loadBalance =
  async (user) => {

    try {

      const bankRef = doc(
        db,
        "banking",
        user
      );

      const bankSnap =
        await getDoc(bankRef);

      console.log(
        "BANK EXISTS:",
        bankSnap.exists()
      );

      if (
        bankSnap.exists()
      ) {

        setBalance(
          Number(
            bankSnap.data()
              .balance || 0
          )
        );

      } else {

        // NEW USER

        await setDoc(
          bankRef,
          {
            balance: 50000,
            userId: user,
          }
        );

        setBalance(50000);

      }

    } catch (error) {

      console.log(
        "BALANCE ERROR:",
        error
      );

      setBalance(0);

    }

  };
  

  // HIGHEST EXPENSE

  const highestExpense =
    expenses.length > 0

      ? Math.max(

          ...expenses.map(
            (item) =>
              Number(
                item.amount
              )
          )

        )

      : 0;

  // CATEGORY TOTALS

  const categoryTotals = {};

  expenses.forEach((item) => {

    const category =
      item.category ||
      "Other";

    if (
      categoryTotals[
        category
      ]
    ) {

      categoryTotals[
        category
      ] += Number(
        item.amount
      );

    } else {

      categoryTotals[
        category
      ] = Number(
        item.amount
      );

    }

  });
//load health score
const loadHealthScore = async () => {

  console.log(
    "LOAD HEALTH SCORE CALLED"
  );

  try {

   const result = await getHealthScore(
  50000,
  totalExpense
);

console.log(
  "HEALTH RESPONSE:",
  result
);
setHealthScore(
  Number(result.score || 0)
);
    setAdvice(
      result.advice || ""
    );

  } catch (error) {

    console.log(
      "HEALTH SCORE ERROR:",
      error
    );

  }

};
  // PIE DATA

  const pieData =
    Object.keys(
      categoryTotals
    ).map(
      (key, index) => ({

        name: key,

        amount:
          categoryTotals[
            key
          ],

        color: [

          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#F44336",
          "#9C27B0",

        ][
          index % 5
        ],

        legendFontColor:
          "#FFFFFF",

        legendFontSize:
          13,

      })
    );

  // LOGOUT

  const logout =
    async () => {

      await AsyncStorage.removeItem(
        "isLoggedIn"
      );

      await AsyncStorage.removeItem(
        "currentUser"
      );

      navigation.replace(
        "Home"
      );

    };

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

      <StatusBar
        barStyle="light-content"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={
          false
        }
      >

        <Header
          title={t.welcome}
          subtitle={`${t.subtitle}\n${currentUser}`}
        />

        {/* BALANCE */}

        <View style={styles.balanceCard}>

          <View>

         <Text
  style={styles.balanceText}
>
  {t.availableBalance}
</Text>

            <Text
              style={
                styles.balanceAmount
              }
            >
              ₹{balance}
            </Text>

          </View>

          <Ionicons
            name="wallet"
            size={55}
            color="white"
          />

        </View>
        {/*health*/}
   <View
  style={styles.healthCard}
>

  <Text
    style={styles.healthTitle}
  >
    Financial Health
  </Text>

  <Text
    style={styles.healthScore}
  >
    {healthScore}/100
  </Text>

  <Text
    style={styles.healthAdvice}
  >
    {advice}
  </Text>

</View>
        {/* ANALYTICS */}

        <View
          style={
            styles.analyticsRow
          }
        >

          <View
            style={
              styles.analyticsCard
            }
          >

            <Ionicons
              name="cash"
              size={30}
              color="#4CAF50"
            />

          <Text
  style={styles.analyticsTitle}
>
  {
    language === "Hindi"
      ? "खर्च"
      : language === "Marathi"
      ? "खर्च"
      : "Expenses"
  }
</Text>

            <Text
              style={
                styles.analyticsValue
              }
            >
              ₹{totalExpense}
            </Text>

          </View>

          <View
            style={
              styles.analyticsCard
            }
          >

            <Ionicons
              name="swap-horizontal"
              size={30}
              color="#2196F3"
            />

           <Text
  style={styles.analyticsTitle}
>
  {t.transactions}
</Text>

            <Text
              style={
                styles.analyticsValue
              }
            >
              {transactions.length}
            </Text>

          </View>

        </View>

        {/* HIGHEST */}

        <View style={styles.largeCard}>

          <Ionicons
            name="trending-up"
            size={34}
            color="#FF9800"
          />

          <View
            style={{
              marginLeft: 15,
            }}
          >

       <Text
  style={styles.largeTitle}
>
  {
    language === "Hindi"
      ? "सबसे बड़ा खर्च"
      : language === "Marathi"
      ? "सर्वात मोठा खर्च"
      : "Highest Expense"
  }
</Text>
            <Text
              style={
                styles.largeValue
              }
            >
              ₹{highestExpense}
            </Text>

          </View>

        </View>

        {/* PIE CHART */}

        {

          pieData.length > 0 && (

            <View
              style={
                styles.chartCard
              }
            >

              <Text
  style={styles.chartTitle}
>
  {
    language === "Hindi"
      ? "खर्च विश्लेषण"
      : language === "Marathi"
      ? "खर्च विश्लेषण"
      : "Expense Analytics"
  }
</Text>

              <PieChart

                data={pieData}

                width={
                  screenWidth -
                  70
                }

                height={230}

                accessor="amount"

                backgroundColor="transparent"

                paddingLeft="15"

                absolute

                chartConfig={{

                  color: (
                    opacity = 1
                  ) =>

                    `rgba(255,255,255,${opacity})`,

                }}

              />

            </View>

          )

        }

        {/* QUICK SERVICES */}

      <Text style={styles.sectionTitle}>
  {
    language === "Hindi"
      ? "त्वरित सेवाएं"
      : language === "Marathi"
      ? "जलद सेवा"
      : "Quick Services"
  }
</Text>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() =>
            navigation.navigate(
              "Budget"
            )
          }
        >

          <Ionicons
            name="pie-chart"
            size={30}
            color="#4CAF50"
          />

          <Text
            style={
              styles.featureTitle
            }
          >
           {t.budgetTracker}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() =>
            navigation.navigate(
              "Banking"
            )
          }
        >

          <Ionicons
            name="card"
            size={30}
            color="#2196F3"
          />

          <Text
            style={
              styles.featureTitle
            }
          >
            {t.banking}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() =>
            navigation.navigate(
              "Assistant"
            )
          }
        >

          <Ionicons
            name="sparkles"
            size={30}
            color="#FF9800"
          />

          <Text
            style={
              styles.featureTitle
            }
          >
{t.aiAssistant}
          </Text>

        </TouchableOpacity>

        {/* LOGOUT */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >

          <Ionicons
            name="log-out"
            size={24}
            color="white"
            style={{
              marginRight: 10,
            }}
          />

          <Text
            style={
              styles.logoutText
            }
          >
{
  language === "Hindi"
    ? "लॉगआउट"
    : language === "Marathi"
    ? "लॉगआउट"
    : "Logout"
}          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    safeContainer: {
      flex: 1,
      backgroundColor:
        "#121212",
    },

    container: {
      flex: 1,
      backgroundColor:
        "#121212",
      padding: 20,
      paddingBottom: 100,
    },

    balanceCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 28,
      padding: 28,
      marginBottom: 25,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    balanceText: {
      color: "#AAAAAA",
      fontSize: 17,
    },

    balanceAmount: {
      color: "white",
      fontSize: 40,
      fontWeight: "bold",
      marginTop: 10,
    },
    healthCard: {

  backgroundColor:
    "#1E1E1E",

  padding: 20,

  borderRadius: 20,

  marginBottom: 20,

},

healthTitle: {

  color: "#4CAF50",

  fontSize: 20,

  fontWeight: "bold",

},

healthScore: {

  color: "white",

  fontSize: 40,

  fontWeight: "bold",

  marginTop: 10,

},

healthAdvice: {

  color: "#AAA",

  marginTop: 10,

  fontSize: 16,

},

    analyticsRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 18,
    },

    analyticsCard: {
      backgroundColor:
        "#1E1E1E",
      width: "48%",
      padding: 20,
      borderRadius: 24,
    },

    analyticsTitle: {
      color: "#AAAAAA",
      marginTop: 14,
      fontSize: 15,
    },

    analyticsValue: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
    },

    largeCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 24,
      padding: 22,
      marginBottom: 25,
      flexDirection: "row",
      alignItems: "center",
    },

    largeTitle: {
      color: "#AAAAAA",
      fontSize: 16,
    },

    largeValue: {
      color: "white",
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 8,
    },

    chartCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 28,
      padding: 20,
      marginBottom: 28,
      alignItems: "center",
    },

    chartTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 18,
    },

    sectionTitle: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 18,
    },

    featureCard: {
      backgroundColor:
        "#1E1E1E",
      padding: 22,
      borderRadius: 22,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    featureTitle: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 18,
    },

    logoutButton: {
      backgroundColor:
        "#D32F2F",
      padding: 18,
      borderRadius: 20,
      marginTop: 20,
      marginBottom: 50,
      flexDirection: "row",
      justifyContent:
        "center",
      alignItems: "center",
    },

    logoutText: {
      color: "white",
      fontSize: 19,
      fontWeight: "bold",
    },

});