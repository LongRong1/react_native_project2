import { View, Text } from 'react-native'
import React from 'react'

const SafeScreen = (children) => {
  return (
    <View>
      <Text>SafeScreen</Text>
      {children}
    </View>
  )
}

export default SafeScreen