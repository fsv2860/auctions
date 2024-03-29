import { DefaultSession } from "next-auth";

declare module 'next-auth'{
    // Expand existing Session interface from 'next-auth' to add a username to the user object.
    interface Session{
        user:{
            // Add id property.
            id:string,
            username: string
        } & DefaultSession['user']
    }

    interface Profile{
        username: string
    }
    // Include username in User interface.
    interface User{
        username:string
    }
}
// Expand existing JWT interface from 'next-auth/jwt' to add a username to the user object.
declare module 'next-auth/jwt'{
    interface JWT{
        username:string,
        access_token?:string
    }
}