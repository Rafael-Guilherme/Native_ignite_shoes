import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        'user_name': 'Rafael',
        'user_email': 'rafael@email.com'
    })
}