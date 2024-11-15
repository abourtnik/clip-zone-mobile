export enum AUTH_ERROR {
    SUBSCRIBE= "subscribe",
    REPORT = "report",
    INTERACT = "interact",
}

export const auth = {
    subscribe: {
        title: 'Want to subscribe to this channel ?',
        description: 'Sign in to subscribe to this channel',
    },
    report: {
        title: 'Need to report this video ?',
        description: 'Sign in to report inappropriate content',
    },
    interact: {
        title: 'Interact with this video ?',
        description: 'Sign in to make your opinion count',
    },
}