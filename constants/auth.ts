export enum AUTH_ERROR {

    UNAUTHORIZED = "unauthorized",
    UNAUTHENTICATED = "unauthenticated",
    SUBSCRIBE= "subscribe",
    REPORT = "report",
    INTERACT = "interact",
}

export const auth = {
    unauthorized: {
        title: 'You need to sign in to perform this action',
        description: 'Sign in to perform this action',
        code: 403
    },
    unauthenticated: {
        title: 'Your session has expired',
        description: 'Please login again',
        code: 401
    },
    subscribe: {
        title: 'Want to subscribe to this channel ?',
        description: 'Sign in to subscribe to this channel',
        code: 403
    },
    report: {
        title: 'Need to report this video ?',
        description: 'Sign in to report inappropriate content',
        code: 403
    },
    interact: {
        title: 'Interact with this video ?',
        description: 'Sign in to make your opinion count',
        code: 403
    },
}