// "use client"

// import type React from "react"

// import { createContext, useContext, useEffect, useState } from "react"
// //import type { Session, User } from "@supabase/supabase-js"
// import { supabase } from "@/lib/supabase/client"
// import { useRouter } from "next/navigation"
// import type { UserType } from "@/lib/types"

// interface AuthContextType {
//   user: User | null
//   session: Session | null
//   userType: UserType | null
//   isLoading: boolean
//   signUp: (email: string, password: string, userType: UserType, metadata?: any) => Promise<any>
//   signIn: (email: string, password: string) => Promise<any>
//   signOut: () => Promise<void>
//   verifyPlayerCode: (code: string) => Promise<any>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [session, setSession] = useState<Session | null>(null)
//   const [userType, setUserType] = useState<UserType | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const setData = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession()

//       if (error) {
//         console.error(error)
//         setIsLoading(false)
//         return
//       }

//       setSession(session)
//       setUser(session?.user ?? null)

//       if (session?.user) {
//         // Fetch user type from profiles table
//         const { data, error } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()

//         if (!error && data) {
//           setUserType(data.user_type as UserType)
//         }
//       }

//       setIsLoading(false)
//     }

//     const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session)
//       setUser(session?.user ?? null)

//       if (session?.user) {
//         // Fetch user type from profiles table
//         const { data, error } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()

//         if (!error && data) {
//           setUserType(data.user_type as UserType)
//         }
//       } else {
//         setUserType(null)
//       }

//       setIsLoading(false)
//     })

//     setData()

//     return () => {
//       authListener.subscription.unsubscribe()
//     }
//   }, [router])

//   const signUp = async (email: string, password: string, userType: UserType, metadata?: any) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           user_type: userType,
//           ...metadata,
//         },
//       },
//     })

//     if (error) {
//       throw error
//     }

//     if (data.user) {
//       // Create profile record
//       const { error: profileError } = await supabase.from("profiles").insert({
//         id: data.user.id,
//         email,
//         user_type: userType,
//       })

//       if (profileError) {
//         throw profileError
//       }

//       // If it's a club, create club profile
//       if (userType === "club" && metadata?.club_name) {
//         const { error: clubError } = await supabase.from("club_profiles").insert({
//           id: data.user.id,
//           club_name: metadata.club_name,
//         })

//         if (clubError) {
//           throw clubError
//         }
//       }
//     }

//     return data
//   }

//   const signIn = async (email: string, password: string) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       throw error
//     }

//     return data
//   }

//   const signOut = async () => {
//     await supabase.auth.signOut()
//     router.push("/")
//   }

//   const verifyPlayerCode = async (code: string) => {
//     // Check if code exists and is not used
//     const { data, error } = await supabase
//       .from("player_codes")
//       .select("*")
//       .eq("code", code)
//       .eq("is_used", false)
//       .single()

//     if (error) {
//       throw error
//     }

//     return data
//   }

//   const value = {
//     user,
//     session,
//     userType,
//     isLoading,
//     signUp,
//     signIn,
//     signOut,
//     verifyPlayerCode,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
