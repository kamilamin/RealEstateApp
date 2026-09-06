import { categories } from '@/constants/data';
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        if (selectedCategory === category) {
            setSelectedCategory('All');
            router.setParams({ filter: 'All' });
            return;
        }
        setSelectedCategory(category);
        router.setParams({ filter: category }); 
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-5'>
            {categories.map((item, i) => (
                <View key={i} className='mr-3'>
                    <TouchableOpacity
                        onPress={() => handleCategorySelect(item.category)}
                        className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`}
                    >
                    <Text className={`text-sm ${selectedCategory === item.category ? 'text-white font-rubik-bold mt-0.5' : 'text-primary-300 font-rubik'}`}   >
                        {item.category}
                    </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}

export default Filters
