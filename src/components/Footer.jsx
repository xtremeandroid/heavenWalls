import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return <HStack shadow={"base"} bgColor={'blackAlpha.900'} p={"6"}>
    <Text color={"white"}>
    All images remain property of their original owners. Site & code © HeavenWalls 2023. Developed By Ayush Singh.
    </Text>
  </HStack>
}

export default Footer