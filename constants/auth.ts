export enum AUTH_ERROR {
    UNAUTHORIZED = "unauthorized",
    SUBSCRIBE= "subscribe",
    REPORT = "report",
    INTERACT = "interact",
}

export const auth = {
    unauthorized: {
        title: 'You need to sign in to perform this action',
        description: 'Sign in to perform this action',
    },
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