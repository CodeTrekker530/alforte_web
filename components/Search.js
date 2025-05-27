import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockData = [
  {
    id: '1',
    type: 'Product',
    name: 'Banana',
    location: 'Ground Floor, 3rd Floor',
    price: '₱50 – ₱150',
    image: require('../assets/banana.jpg'),
  },
  {
    id: '2',
    type: 'Store',
    name: 'Buenafe Store',
    location: '3rd Floor',
    price: '',
    image: require('../assets/store.jpg'),
  },
  {
    id: '3',
    type: 'Service',
    name: 'Barber Shop',
    location: 'Ground Floor',
    price: '₱50 – ₱150',
    image: require('../assets/barber.png'),
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Products', 'Stores', 'Services'];

  const filteredData = mockData.filter(item =>
    selectedFilter === 'All' || item.type === selectedFilter.slice(0, -1)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filters}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
            style={styles.itemRow}
            onPress={() => router.push('/map')}
        >
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemLocation}>{item.location}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 10,
    gap: 6,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilter: {
    backgroundColor: '#2c6e49',
    borderColor: '#2c6e49',
  },
  activeFilterText: {
    color: '#fff',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemLocation: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontWeight: '500',
    fontSize: 13,
    color: '#444',
  },
});
