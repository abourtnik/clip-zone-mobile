import {FlatList, StyleSheet, View} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {useQuery} from "@tanstack/react-query";
import {search} from "@/api/clipzone";
import {useState} from "react";
import {SafeAreaView} from 'react-native-safe-area-context'
import {ListVideo} from "@/components/Videos";

type Props = {

}

export default function Search() {

    const [query, setQuery] = useState<string>('');

    const {data: results, isFetching, refetch} = useQuery({
        queryKey: ['search', query],
        queryFn: () => search(query),
        enabled: query.trim().length > 0
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginHorizontal: 15}}>
                <Searchbar
                    mode={'view'}
                    placeholder="Search"
                    onChangeText={(query) => setQuery(query)}
                    value={query}
                    loading={isFetching}
                    showDivider={false}
                    inputStyle={{minHeight: 0 }}
                    style={{height: 40}}
                />
            </View>
            {
                results &&
                <View style={styles.results}>
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
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    results: {
        flex: 1,
        marginTop: 10
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