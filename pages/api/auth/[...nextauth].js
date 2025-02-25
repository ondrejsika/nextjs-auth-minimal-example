import NextAuth from "next-auth"

export const authOptions = {
  providers: [
       {
        id: "keycloak",
        name: "Keycloak SSO",
        type: "oauth",
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        wellKnown: process.env.KEYCLOAK_WELL_KNOWN,
        authorization: { params: { scope: "openid email profile" } },
        idToken: true,
        checks: ["pkce", "state"],
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            groups: profile.groups,
          }
        },
      }
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && profile.groups) {
        token.groups = profile.groups
      }
      if (profile && profile.roles) {
        token.roles = profile.roles
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.groups) {
        session.groups = token.groups
      }
      if (token && token.roles) {
        session.roles = token.roles
      }
      return session
    }
  },
}

export default NextAuth(authOptions)
