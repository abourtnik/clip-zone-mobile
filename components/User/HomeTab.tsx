import {StyleSheet, View, FlatList, SectionList, useWindowDimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {UserType} from "@/types";
import {FullVideo, ListVideo} from "../Videos";
import {Alert} from "@/components/commons";
import {memo} from "react";
import {useResponsive} from "@/hooks/useResponsive";

type Props = {
    user: UserType,
}

export const HomeTab = memo(({user} : Props) => {

    const {numColumns, hasMultipleColumns} = useResponsive();

    const {height} = useWindowDimensions();

    return (
        <View style={styles.tab}>
            <FlatList
                ListHeaderComponent={
                    <>
                        {
                            user.pinned_video &&
                            <View style={hasMultipleColumns ? {marginHorizontal: 10} : {}}>
                                <FullVideo video={user.pinned_video} height={height / 3}></FullVideo>
                            </View>
                        }
                        {
                            user.videos_count > 0 &&
                            <View style={styles.tab}>
                                <Text style={styles.title} variant={'titleMedium'}>Videos</Text>
                            </View>
                        }
                    </>
                }
                key={numColumns}
                numColumns={numColumns}
                columnWrapperStyle={hasMultipleColumns ? {gap: 7} : false}
                data={user.videos}
                renderItem={({item}) => (
                    <View style={{flex:1/numColumns}}>
                        <ListVideo video={item} />
                    </View>
                )}
                keyExtractor={item => item.uuid}
                ListFooterComponent={
                    <SectionList
                        sections={user.playlists.map((playlist) => ({
                            title: playlist.title,
                            data: playlist.videos,
                        }))}
                        keyExtractor={(item, index) => item.uuid}
                        renderItem={({section, index}) => {
                            if (index !== 0) return null;
                            return (
                                <FlatList
                                    numColumns={numColumns}
                                    columnWrapperStyle={hasMultipleColumns ? {gap: 7} : false}
                                    data={section.data}
                                    renderItem={({item}) => (
                                        <View style={{flex:1/numColumns}}>
                                            <ListVideo video={item} />
                                        </View>
                                    )}
                                    keyExtractor={item => item.uuid}
                                />
                        )}}
                        renderSectionHeader={({section: {title}}) => (
                            <Text style={styles.title} variant={'titleMedium'}>{title}</Text>
                        )}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Alert message={'Channel without content'} />
                    </View>
                }
            />
        </View>
    )
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        marginTop: 10
    },
    title : {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    empty: {
        marginHorizontal: 15
    },

});