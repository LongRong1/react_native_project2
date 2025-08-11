import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles.js'
import { COLORS } from '@/constants/colors.js'
import Ionicons from '@expo/vector-icons/Ionicons'

const CATEGORY_ICONS = {
  "Food & Drinks" :"fast-food",
  Shopping:"cart",
  Transporttation:"car",
  Entertaiment:"film",
  Bills:"receipt",
  Icome:"cash",
  Other:"elipsis-horizontal",
}

const TransactionsItem = ({item, onDelete}) => {
  const isIncome = parseFloat(item.amount) >0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense}></Ionicons>
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount,{color:isIncome?COLORS.income: COLORS.expense}]}>
            {isIncome?"+" :"-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={()=>{onDelete(item.id)}}>
        <Ionicons name='trash-outline' size={20} color={COLORS.expense}></Ionicons>
      </TouchableOpacity>
    </View>
  )
}

export default TransactionsItem