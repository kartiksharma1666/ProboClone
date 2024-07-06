import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Button, Modal, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SwipeButton from 'rn-swipe-button';

const sampleData = [
  { id: '1', title: 'Cricket', navigateTo: 'YesNo', image: require('../assets/cricket.png') },
  { id: '2', title: 'Crypto', navigateTo: 'Question', image: require('../assets/crypto.png') },
  { id: '3', title: 'Football', navigateTo: 'Question', image: require('../assets/football.png') },
  { id: '4', title: 'Stocks', navigateTo: 'Question', image: require('../assets/stocks.png') },
  { id: '5', title: 'Economy', navigateTo: 'Question', image: require('../assets/economy.png') },
];

const Popup = ({ isVisible, onClose }) => {
  const [price, setPrice] = useState(0);

  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onGestureEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      translateY.value = event.nativeEvent.translationY;
    }
    if (event.nativeEvent.state === State.END) {
      translateY.value = withSpring(0);
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Price Range</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={price}
            onValueChange={setPrice}
          />
          <Text style={styles.priceText}>${price}</Text>
          {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[styles.swipeButton, animatedStyle]}>
              <Text style={styles.swipeButtonText}>Swipe to Confirm</Text>
            </Animated.View>
          </PanGestureHandler> */}
          <SwipeButton
          disabled={false}
          swipeSuccessThreshold={70}
          height={55}
          width={220}
          title='Swipe to Submit'
          onSwipeSuccess={() => {
            alert('Submitted Successfully');
          }}
          railBackgroundColor='#05e8ba'></SwipeButton>
        </View>
      </View>
    </Modal>
  );
};

const HomePage = ({ navigation }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(item.navigateTo)}
    >
      <Image source={item.image} style={styles.buttonImage} />
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/toppic.png')} style={styles.topImage} />

      <View style={styles.flatListContainer}>
        <FlatList
          data={sampleData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={styles.trending}>Trending Now</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={sampleData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {[1, 2, 3, 4].map(i => (
        <View key={i} style={styles.yesNoBlock}>
          <Text style={styles.yesNoText}>Kolkata to win the match vs Mumbai</Text>
          <View style={styles.yesNoButtons}>
            <Button title="Yes $5.3" onPress={() => setPopupVisible(true)} />
            <Button title="No $4.7" onPress={() => setPopupVisible(true)} />
          </View>
        </View>
      ))}
      <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  topImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  flatListContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 80,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 12,
    marginTop: 5,
  },
  buttonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  trending: {
    color: 'black',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  yesNoBlock: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  yesNoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  yesNoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    marginVertical: 10,
  },
  swipeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  swipeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomePage;
