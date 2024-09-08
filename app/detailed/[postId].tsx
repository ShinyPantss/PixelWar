import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DetailedSharedPhoto = () => {
  const localParams = useLocalSearchParams()
  console.log(localParams)
  return (
    <View>
      <Text>{localParams.postId}</Text>
    </View>
  )
}

export default DetailedSharedPhoto

const styles = StyleSheet.create({})