import {Button, Text} from "react-native-paper";
import {View} from "react-native";

type Props = {
    refetch: Function
}

export function NetworkError ({refetch}: Props) {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}} variant="bodyLarge">Oups! Something went wrong!</Text>
            <Text style={{marginTop: 10}}>We are working on fixing the problem. Please try again.</Text>
            <Button icon="reload" mode="contained" onPress={() => refetch}>
                Try again
            </Button>
        </View>
    )
}