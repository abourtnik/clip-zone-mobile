import {RefObject} from 'react'
import {StyleSheet, View, Linking} from 'react-native';
import {IconButton, Text, } from 'react-native-paper';
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import moment from "moment";
import {UserType} from "@/types";

type Props = {
    user: UserType,
    bottomSheetRef: RefObject<BottomSheet>
}

export function About ({user, bottomSheetRef}: Props) {
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enableDynamicSizing={false}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                />
            )}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text variant={'titleMedium'}>About</Text>
                    <IconButton
                        icon="close"
                        iconColor={'black'}
                        size={20}
                        onPress={() => bottomSheetRef.current?.close()}
                    />
                </View>
                <View style={styles.separator}></View>
                <BottomSheetScrollView contentContainerStyle={styles.content_container}>
                    <View style={styles.content}>
                        {
                            user.description &&
                            <View style={styles.section}>
                                <Text variant={'titleMedium'} style={styles.title}>Description</Text>
                                <Text style={styles.description} variant={"bodyMedium"}>{user.description}</Text>
                            </View>
                        }
                        {
                            user.website &&
                            <View style={styles.section}>
                                <Text variant={'titleMedium'} style={styles.title}>Links</Text>
                                <Text style={styles.link} onPress={() => Linking.openURL(user.website as string)} variant={"bodyMedium"}>{user.website}</Text>
                            </View>

                        }
                        <View style={styles.section}>
                            <Text variant={'titleMedium'} style={styles.title}>Infos</Text>
                            <View style={styles.info}>
                                <MaterialCommunityIcons name="web" size={18} color={'black'}/>
                                <Text style={styles.link} onPress={() => Linking.openURL(`www.clip-zone.com/@${user.slug}`)} variant={"bodyMedium"}>www.clip-zone.com/@{user.slug}</Text>
                            </View>
                            {
                                user.country &&
                                <View style={styles.info}>
                                    <MaterialCommunityIcons name="earth" size={18} color={'black'}/>
                                    <Text variant={"bodyMedium"}>{user.country}</Text>
                                </View>
                            }
                            <View style={styles.info}>
                                <MaterialCommunityIcons name="information-outline" size={18} color={'black'}/>
                                <Text  variant={"bodyMedium"}>Joined {moment(user.created_at).format('DD MMMM YYYY')}</Text>
                            </View>
                            <View style={styles.info}>
                                <MaterialCommunityIcons name="chart-line-variant" size={18} color={'black'}/>
                                <Text variant={"bodyMedium"}>{user.views} views</Text>
                            </View>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingBottom: 60
    },
    header: {
        justifyContent: 'space-between',
        alignItems : 'center',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginTop: 3
    },
    content_container: {
        paddingVertical: 10,
    },
    content : {
        paddingHorizontal: 15,
    },
    title : {
        textAlign : 'left',
        fontWeight: 'bold',
        paddingBottom: 10
    },
    section : {
        marginVertical: 10
    },
    description : {

    },
    info: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 8,
        alignItems: 'center'
    },
    link: {
        color : 'blue'
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
});