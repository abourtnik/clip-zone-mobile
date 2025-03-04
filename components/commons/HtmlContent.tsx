import {Dimensions, Linking} from "react-native";
import RenderHtml, {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

type Props = {
    html: string
}

export function HtmlContent({html} : Props) {

    return (
        <RenderHtml
            defaultTextProps={{style: {lineHeight: 22}}}
            contentWidth={Dimensions.get('window').width}
            source={{html: html}}
            customHTMLElementModels={{
                'button': HTMLElementModel.fromCustomModel({
                    tagName: 'button',
                    mixedUAStyles: {
                    },
                    contentModel: HTMLContentModel.textual
                })
            }}
            tagsStyles={{
                a : {
                  textDecorationLine: 'none',
                },
                button: {
                    padding: 5,
                    borderRadius: 5,
                    color: 'blue',
                }
            }}
            renderers={{
                button: ({ TDefaultRenderer, ...props } : any) => {

                    const timecode = props.tnode.attributes['data-timecode'] ?? '';

                    return (
                        <TDefaultRenderer {...props} onPress={() => console.log(timecode)} />
                    );
                },
            }}
            renderersProps={{
                a: {
                    onPress: (event, href) => {
                        Linking.openURL(href.replace('about://', 'https://'));
                    }
                },
            }}
        />
    )
}