import {
  collectionHistory,
  collectionMetrics,
} from "@/mockdata/collectionHistory";
import { earningsHistory } from "@/mockdata/collector";
import { wasteTypes } from "@/mockdata/wasteTypes";
import {
  faArrowDown,
  faArrowUp,
  faCalendarAlt,
  faChartBar,
  faHistory,
  faMoneyBillWave,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EarningsScreen() {
  const [timeFrame, setTimeFrame] = useState("weekly"); // weekly, monthly, yearly
  const [activeTab, setActiveTab] = useState("summary"); // summary, transactions, history

  // Get earnings data based on selected timeframe
  const earningsData =
    timeFrame === "weekly"
      ? earningsHistory.weeklyEarnings
      : earningsHistory.monthlyEarnings;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Render transaction item
  const renderTransaction = ({
    item,
  }: {
    item: (typeof earningsHistory.recentTransactions)[0];
  }) => (
    <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center">
      <View
        className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
          item.type === "deposit" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <FontAwesomeIcon
          icon={item.type === "deposit" ? faArrowDown : faArrowUp}
          size={20}
          color={item.type === "deposit" ? "#28A745" : "#DC3545"}
        />
      </View>
      <View className="flex-1">
        <Text className="text-gray-800 font-semibold">{item.description}</Text>
        <Text className="text-gray-500 text-sm">{formatDate(item.date)}</Text>
      </View>
      <Text
        className={`font-bold ${
          item.type === "deposit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {item.type === "deposit" ? "+" : "-"}
        {item.amount}
      </Text>
    </View>
  );

  // Render collection history item
  const renderCollectionHistoryItem = ({
    item,
  }: {
    item: (typeof collectionHistory)[0];
  }) => {
    const wasteType =
      wasteTypes.find(type => type.name === item.wasteType) || wasteTypes[7]; // Default to Mixed

    return (
      <View className="bg-white rounded-xl p-4 mb-3">
        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: `${wasteType.color}20` }}
            >
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                size={16}
                color={wasteType.color}
              />
            </View>
            <View>
              <Text className="text-gray-800 font-semibold">
                {item.wasteType} Collection
              </Text>
              <Text className="text-gray-500 text-sm">
                {new Date(item.completedTime).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-green-600 font-semibold">
              +{item.points} pts
            </Text>
            <Text className="text-gray-500 text-sm">{item.actualWeight}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-sm flex-1">
            Client: {item.userName}
          </Text>
          <View className="bg-gray-100 rounded-full px-2 py-1">
            <Text className="text-primary-500 text-xs">{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#164C3E]">
      <ScrollView className="flex-1">
        <View className="px-6 pt-14 pb-20">
          <Text className="text-white text-3xl font-bold mb-6">
            My Earnings
          </Text>

          {/* Balance Card */}
          <View className="bg-white rounded-2xl p-5 mb-5">
            <Text className="text-gray-500 mb-2">Current Balance</Text>
            <Text className="text-primary-500 text-3xl font-bold mb-2">
              {earningsHistory.currentBalance}
            </Text>
            <View className="flex-row justify-between items-center mt-2">
              <View>
                <Text className="text-gray-500 text-sm">Pending Payment</Text>
                <Text className="text-primary-500 font-semibold">
                  {earningsHistory.pendingPayment}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Lifetime Earnings</Text>
                <Text className="text-primary-500 font-semibold">
                  {earningsHistory.lifetimeEarnings}
                </Text>
              </View>
            </View>
          </View>

          {/* Timeframe Selection */}
          <View className="flex-row bg-white/20 rounded-full p-1 mb-5">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                timeFrame === "weekly" ? "bg-white" : ""
              }`}
              onPress={() => setTimeFrame("weekly")}
            >
              <Text
                className={`text-center font-semibold ${
                  timeFrame === "weekly" ? "text-primary-500" : "text-white"
                }`}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                timeFrame === "monthly" ? "bg-white" : ""
              }`}
              onPress={() => setTimeFrame("monthly")}
            >
              <Text
                className={`text-center font-semibold ${
                  timeFrame === "monthly" ? "text-primary-500" : "text-white"
                }`}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>

          {/* Earnings Graph (Simplified) */}
          <View className="bg-white rounded-2xl p-5 mb-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-primary-500 text-lg font-bold">
                {timeFrame === "weekly" ? "This Week" : "This Year"}
              </Text>
              <View className="flex-row items-center">
                <FontAwesomeIcon icon={faChartBar} size={16} color="#164C3E" />
                <Text className="text-primary-500 ml-2">
                  {timeFrame === "weekly" ? "Last 7 days" : "Last 12 months"}
                </Text>
              </View>
            </View>

            {/* Simple Bar Graph Visualization */}
            <View className="flex-row justify-between items-end h-40 mb-4">
              {earningsData.map((item, index) => (
                <View key={index} className="items-center">
                  <View
                    className="bg-primary-500 rounded-t-md w-8"
                    style={{
                      height: `${Math.max(
                        10,
                        (item.amount /
                          Math.max(...earningsData.map(d => d.amount))) *
                          100
                      )}%`,
                    }}
                  />
                  <Text className="text-gray-500 text-xs mt-1">
                    {"date" in item ? item.date : item.month}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-500 text-sm">
                  {timeFrame === "weekly" ? "This Week" : "This Month"}
                </Text>
                <Text className="text-primary-500 font-semibold">
                  {earningsHistory.recentTransactions[0].amount}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Average</Text>
                <Text className="text-primary-500 font-semibold">
                  {timeFrame === "weekly" ? "835 EGP/week" : "2,400 EGP/month"}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Collections</Text>
                <Text className="text-primary-500 font-semibold">
                  {collectionMetrics.totalCollections}
                </Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View className="flex-row bg-white/20 rounded-full p-1 mb-5">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                activeTab === "summary" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("summary")}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "summary" ? "text-primary-500" : "text-white"
                }`}
              >
                Summary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                activeTab === "transactions" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("transactions")}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "transactions"
                    ? "text-primary-500"
                    : "text-white"
                }`}
              >
                Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                activeTab === "history" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("history")}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "history" ? "text-primary-500" : "text-white"
                }`}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === "summary" && (
            <View className="bg-white rounded-2xl p-5 mb-8">
              <Text className="text-primary-500 text-lg font-bold mb-4">
                Collection Summary
              </Text>

              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size={20}
                      color="#2196F3"
                    />
                  </View>
                  <Text className="text-gray-800 font-semibold">
                    {collectionMetrics.totalCollections}
                  </Text>
                  <Text className="text-gray-500 text-xs">Collections</Text>
                </View>
                <View className="items-center">
                  <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                    <FontAwesomeIcon
                      icon={faWeight}
                      size={20}
                      color="#9C27B0"
                    />
                  </View>
                  <Text className="text-gray-800 font-semibold">
                    {collectionMetrics.totalWeight}
                  </Text>
                  <Text className="text-gray-500 text-xs">Total Weight</Text>
                </View>
                <View className="items-center">
                  <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      size={20}
                      color="#4CAF50"
                    />
                  </View>
                  <Text className="text-gray-800 font-semibold">
                    {collectionMetrics.totalPoints}
                  </Text>
                  <Text className="text-gray-500 text-xs">Points</Text>
                </View>
              </View>

              <View className="bg-gray-100 rounded-xl p-4 mb-4">
                <Text className="text-primary-500 font-semibold mb-2">
                  This Month Stats
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Collections</Text>
                  <Text className="text-primary-500 font-semibold">
                    {earningsHistory.monthlyEarnings[8].amount / 100} pickups
                  </Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-500">Weight Collected</Text>
                  <Text className="text-primary-500 font-semibold">156kg</Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-500">Average Rating</Text>
                  <Text className="text-primary-500 font-semibold">
                    {collectionMetrics.averageRating} ★
                  </Text>
                </View>
              </View>

              <Text className="text-primary-500 font-semibold mb-2">
                Most Collected Waste Type
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: "#2196F320" }}
                >
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    size={16}
                    color="#2196F3"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">
                    {collectionMetrics.mostCollectedWaste}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Highest revenue generator
                  </Text>
                </View>
                <View className="bg-primary-100 rounded-full px-3 py-1">
                  <Text className="text-primary-500 text-xs">35%</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === "transactions" && (
            <View className="bg-white rounded-2xl p-5 mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-primary-500 text-lg font-bold">
                  Recent Transactions
                </Text>
                <View className="flex-row items-center">
                  <FontAwesomeIcon icon={faHistory} size={16} color="#164C3E" />
                  <Text className="text-primary-500 ml-2">View All</Text>
                </View>
              </View>

              <FlatList
                data={earningsHistory.recentTransactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

          {activeTab === "history" && (
            <View className="bg-white rounded-2xl p-5 mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-primary-500 text-lg font-bold">
                  Collection History
                </Text>
                <View className="flex-row items-center">
                  <FontAwesomeIcon icon={faHistory} size={16} color="#164C3E" />
                  <Text className="text-primary-500 ml-2">View All</Text>
                </View>
              </View>

              <FlatList
                data={collectionHistory.slice(0, 5)}
                renderItem={renderCollectionHistoryItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
