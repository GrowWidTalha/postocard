// "use server"


// import { db } from "../../../db"
// import { getUserByEmail } from "../data/user"
// import { getVerificationTokenByToken } from "../data/verification-token"

// export const newVerification = async (token: string) => {
//    try {
//        const existingToken = await getVerificationTokenByToken(token)
//        if(!existingToken) return { error: "Token does not exist."}

//        const hasExpired = new Date(existingToken.expires) < new Date()
//        if(hasExpired) return { error: "Token expired"}

//        const existingUser = await getUserByEmail(existingToken.email)
//        if(!existingUser) return { error: "Email does not exists"}

//        await db.user.update({
//         where: {
//             id: existingUser.id
//         },
//         data: {
//             emailVerified: new Date(),
//             email: existingToken.email,
//         }
//        })
//        await db.verificationToken.delete({
//         where: { id: existingToken.id}
//        })

//        return { success: "Email verified successfully"}
//    } catch (error) {
//        console.log('Error in new verification', error)
//    }
// }

export const newVerification = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/new-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Something went wrong" };
      }

      return { success: data.message || "Email verified successfully" };
    } catch (error) {
      console.error('Error in new verification:', error);
      return { error: "Something went wrong" };
    }
  };
