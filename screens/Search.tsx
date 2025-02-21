import {FlatList, ScrollView, StyleSheet, View, Keyboard, Platform} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {search} from "@/api/clipzone";
import {useState} from "react";
import {SafeAreaView} from 'react-native-safe-area-context'
import {ListVideo} from "@/components/Videos";
import {useSearchQuery} from "@/hooks/useSearchQuery";
import {useResponsive} from "@/hooks/useResponsive";

export default function Search() {

    const [query, setQuery] = useState<string>('');

    const {data: results, isFetching} = useSearchQuery({
        query: query,
        key: 'search',
        searchFn: search
    });

    const {numColumns, hasMultipleColumns} = useResponsive();

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
            <ScrollView style={styles.results} onScroll={() => Keyboard.dismiss()}>
            {
                results &&
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{flex: 1, paddingBottom: 20}}
                        ListEmptyComponent={
                            <View style={styles.empty}>
                                <Text style={styles.empty_text}>No results found</Text>
                            </View>
                        }
                        data={results.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View style={{flex:1/numColumns}}>
                                <ListVideo video={item} />
                            </View>
                        )}
                        key={numColumns}
                        numColumns={numColumns}
                        columnWrapperStyle={hasMultipleColumns ? {gap: 7} : false}
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
        paddingTop: 5,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                marginBottom: -40,
            }
        })
    },
    empty: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_text: {
        fontWeight: 'bold'
    },
});