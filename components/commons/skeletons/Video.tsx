import {Skeleton} from "moti/skeleton";
import {StyleSheet, View} from "react-native";

export function VideoSkeleton () {
    return (
        <View style={styles.container}>
            <Skeleton.Group show={true} >
                <Skeleton colorMode="light" height={230} width={'100%'} radius="square"></Skeleton>
                <View style={styles.infos}>
                    <Skeleton colorMode="light" height={30} width={30} radius="round"></Skeleton>
                    <View style={styles.info}>
                        <Skeleton colorMode="light" height={15} width={'100%'} radius="square"></Skeleton>
                        <Skeleton colorMode="light" height={15} width={'100%'} radius="square"></Skeleton>
                    </View>
                </View>
            </Skeleton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingBottom: 20,
    },
    infos:{
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        gap: 10
    },
    info:{
        gap: 5,
        flex: 1
    }
});