import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the search icon
import { useRouter } from 'expo-router';
import MapSvg from '../assets/map.svg'; // adjust path if needed


const window = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top overlay */}
      <View style={styles.topOverlay}>
        <View style={styles.searchBar}>
        <Image
            source={require('../assets/logo.png')} // Update path if needed
            style={styles.logo}
            resizeMode="contain"
        />
        <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#666"
        />
        </View>

        <TouchableOpacity onPress={() => router.push('/Search')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Floating vertical button group */}
        <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.buttonNumber}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.buttonNumber}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.buttonNumber}>3</Text>
        </TouchableOpacity>
        </View>

      {/* Zoomable, scrollable image */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          width: window.width * 2,
          height: window.height,
        }}
        maximumZoomScale={4}
        minimumZoomScale={1}
        bounces={false}
        bouncesZoom={false}
        pinchGestureEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
      >
        <ScrollView
          contentContainerStyle={{
            width: window.width * 4,
            height: window.height,
          }}
          bounces={false}
          bouncesZoom={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <MapSvg width={window.width * 2} height={window.height} />
        </ScrollView>
      </ScrollView>


    <TouchableOpacity style={styles.bookButton} onPress={() => { /* your action here */ }}>
    <Ionicons name="book-outline" size={28} color="white" />
    </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: window.width * 4,
    height: window.height * 1,
  },
  topOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#000',  // black border
  },
  filterButton: {
    paddingHorizontal: 11,
    paddingVertical: 11,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000' ,
    borderRadius: 8,
    marginRight: 5,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    searchBar: {
    flexShrink: 1, // prevent overflowing by allowing shrink
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 5, // adds spacing from the filter button
    },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
    searchInput: {
    flex: 1, // allow to expand inside searchBar
    fontSize: 16,
    color: '#000',
    },
  searchIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  floatingButtons: {
  position: 'absolute',
  top: 90, // just below topOverlay
  right: 10,
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
floatingButton: {
  backgroundColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000',  // black border
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
buttonNumber: {
  color: '#000',
  fontSize: 18,
  fontWeight: 'bold',
},
bookButton: {
  position: 'absolute',
  bottom: 90,
  right: 15,
  width: 60,
  height: 60,
  borderRadius: 30,  // circle
  backgroundColor: 'darkgreen',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 6,  // shadow for Android
  shadowColor: '#000',  // shadow for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},

});
