import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {search} from "@/api/clipzone";
import {useState} from "react";
import {SafeAreaView} from 'react-native-safe-area-context'
import {ListVideo} from "@/components/Videos";
import {useSearchQuery} from "@/hooks/useSearchQuery";

export default function Search() {

    const [query, setQuery] = useState<string>('');

    const {data: results, isFetching} = useSearchQuery({
        query: query,
        key: 'search',
        searchFn: search
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchbar}>
                <Searchbar
                    autoCapitalize={'none'}
                    mode={'view'}
                    placeholder="Search"
                    onChangeText={(query) => setQuery(query)}
                    value={query}
                    loading={isFetching}
                    showDivider={false}
                    inputStyle={{minHeight: 0 }}
                    style={{height: 40, backgroundColor: 'white'}}
                />
            </View>
            <ScrollView style={styles.results}>
            {
                results &&
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{flex: 1}}
                        ListEmptyComponent={
                            <View style={styles.empty}>
                                <Text style={styles.empty_text}>No results found</Text>
                            </View>
                        }
                        data={results.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <ListVideo video={item} />}
                    />
            }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D556B'
    },
    searchbar: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#3D556B',
        width: '100%'
    },
    results: {
        flex: 1,
        paddingVertical: 20,
        marginBottom: -40,
        backgroundColor: 'white',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_text: {
        fontWeight: 'bold'
    },
});