import {StyleSheet, View, FlatList, SectionList} from 'react-native';
import {Text} from 'react-native-paper';
import {UserType} from "@/types";
import {FullVideo, ListVideo} from "../Videos";
import {Alert} from "@/components/commons";

type Props = {
    user: UserType,
}

export function HomeTab({user} : Props) {

    return (
        <View style={styles.tab}>
            <FlatList
                ListHeaderComponent={
                    <>
                        {user.pinned_video && <FullVideo video={user.pinned_video}></FullVideo>}
                        {
                            user.videos_count > 0 &&
                            <View style={styles.tab}>
                                <Text style={styles.title} variant={'titleMedium'}>Videos</Text>
                            </View>
                        }
                    </>
                }
                data={user.videos}
                renderItem={({item}) => <ListVideo video={item} />}
                keyExtractor={item => item.uuid}
                ListFooterComponent={
                    <SectionList
                        sections={user.playlists.map((playlist) => ({
                            title: playlist.title,
                            data: playlist.videos,
                        }))}
                        keyExtractor={(item, index) => item.uuid}
                        renderItem={({item}) => <ListVideo video={item} />}
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
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        marginTop: 10,
    },
    title : {
        paddingHorizontal: 15,
        marginBottom : 10
    },
    empty: {
        marginHorizontal: 15
    },

});