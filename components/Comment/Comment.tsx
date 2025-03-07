import {Fragment, memo, useState} from 'react'
import {View, StyleSheet, Pressable} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {CommentType} from "@/types";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {useNavigation} from "@react-navigation/native";
import {RouteProps} from "@/navigation/CommentsStack";
import moment from "moment/moment";
import {HtmlContent} from "@/components/commons";


type Props = {
    comment: CommentType
}

export const Comment = memo(({comment} : Props) => {

    const navigation = useNavigation<RouteProps>();

    const [expand, setExpand] = useState<boolean>(false);

    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                styles.main
            ]}
            onPress={() => comment.is_reply ? null : navigation.navigate('Replies', {comment: comment})}
        >
            <Pressable
                onPress={() =>  navigation.getParent('HOME' as any)?.navigate('User', {id: comment.user.id, username: comment.user.username})}
            >
                <Avatar.Image
                    size={25}
                    source={{uri:comment.user.avatar,}}
                />
            </Pressable>
            <View style={styles.container}>
                {
                    comment.is_pinned &&
                    <View style={styles.pinned}>
                        <FontAwesome5 name="thumbtack" size={12} color="white" />
                        <Text style={{color: 'white'}} variant={'bodySmall'}>Pinned by {comment?.video_author?.username}</Text>
                    </View>
                }
                <View style={styles.infos}>
                    <Pressable>
                        <Text style={[styles.info, comment.user.is_video_author && styles.author]} variant={"bodySmall"}>{comment.user.username}</Text>
                    </Pressable>
                    <Text variant={"bodySmall"} style={styles.info}>•</Text>
                    <Text variant={"bodySmall"} style={styles.info}>{moment(comment.created_at).fromNow()}</Text>
                    {
                        comment.is_updated &&
                        <Fragment>
                            <Text variant={"bodySmall"} style={styles.info}>•</Text>
                            <Text style={styles.info} variant={'bodySmall'}>Modified</Text>
                        </Fragment>
                    }
                </View>
                <View>
                    <HtmlContent html={expand ? comment.parsed_content : comment.short_content}/>
                    {
                        comment.is_long &&
                        <Pressable style={{marginTop: 10}} onPress={() => setExpand(!expand)}>
                            <Text variant={"bodyMedium"} style={{color: 'purple'}}>{expand ? 'Show less' : 'Show more'}</Text>
                        </Pressable>
                    }
                </View>
                {
                    comment.has_replies &&
                    <Pressable
                        style={{marginTop: 15}}
                        onPress={() => navigation.navigate('Replies', {comment: comment})}
                    >
                        <Text style={styles.replies}>{comment.replies_count} replies</Text>
                    </Pressable>
                }
            </View>
        </Pressable>
    );
})

const styles = StyleSheet.create({
    main: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    container : {
        flex: 1,
    },
    infos : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginBottom: 4
    },
    info : {
        color: 'grey'
    },
    content : {
        paddingEnd: 40
    },
    pressed : {
        backgroundColor : '#E8E8E8'
    },
    author : {
        backgroundColor :'grey',
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 2,
        overflow: 'hidden',
        borderRadius: 10
    },
    pinned: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6,
        backgroundColor: '#0D6EFD',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 2,
        overflow: 'hidden',
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    replies: {
        color: 'blue',
        fontWeight: 'bold'
    }
});