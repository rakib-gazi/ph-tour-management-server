import { User } from './../modules/users/users.model';
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVariable } from "./env";
import { Role } from '../modules/users/users.interface';

passport.use(
    new GoogleStrategy(
        {
            clientID:envVariable.GOOGLE_CLIENT_ID,
            clientSecret:envVariable.GOOGLE_CLIENT_SECRET,
            callbackURL:envVariable.GOOGLE_CALLBACK_URL
        }, async(accessToken:string, refreshToken:string, profile:Profile,done:VerifyCallback)=>{
            try {
                const email= profile.emails?.[0]?.value;
                if(!email){
                    return done(null, false,{
                        message:"No email found"
                    })
                }
                let user = await User.findOne({email});
                if(!user){
                    user = await User.create({
                        email,
                        name:profile.displayName,
                        picture:profile.photos?.[0]?.value,
                        role:Role.USER,
                        isVerified:true,
                        auths:[
                            {
                                provider: "google",
                                providerId:profile.id
                            }
                        ]
                    })
                }
                return done(null, user)

            } catch (error) {
                console.log("google strategy error",error);
                return done(error)
            }
        }
    )
)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void)=>{
    done(null, user._id)
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async(id: string, done: any )=>{
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})