import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '@/hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader.jsx'
import { styles } from '@/assets/styles/home.styles.js'
import Ionicons from '@expo/vector-icons/Ionicons'
import {BalanceCard} from '@/components/BalanceCard'
import TransactionsItem from '@/components/TransactionsItem.jsx'

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user?.id);
  useEffect(() => {
    loadData();
  }, [loadData]);

  if(isLoading) return <PageLoader />

  const handleDelete = (id: string | number) => {
    Alert.alert("Delete transactions","Are you sure want to delete?",
      [
        {text:"Cancel", style:"cancel"},
        {text:"Delete",style:"destructive",onPress:()=>deleteTransaction(id)},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* trai */}
          <View style={styles.headerLeft}>
            <Image source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode='contain'
            ></Image>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Xin Chao </Text>
              <Text style={styles.usernameText}> {user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>

          {/* phai */}

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("./create")}>
              <Ionicons name="add" size={20} color={"#fff"}></Ionicons>
              <Text style={styles.addButtonText}>Them</Text>
            </TouchableOpacity>
            <SignOutButton></SignOutButton>
          </View>
        </View>

        <BalanceCard summary={summary} />
      </View>

      <FlatList
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      renderItem={({item})=> (
        <TransactionsItem item={item} onDelete={handleDelete} />
      )}
      ></FlatList>
      
    </View>
  )
}