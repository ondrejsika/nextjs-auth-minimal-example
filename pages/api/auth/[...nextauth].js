import NextAuth from "next-auth"

export const authOptions = {
  providers: [
       {
        id: "keycloak",
        name: "Keycloak SSO",
        type: "oauth",
        clientId: "example",
        clientSecret: "example",
        wellKnown: "http://127.0.0.1:8080/realms/example/.well-known/openid-configuration",
        authorization: { params: { scope: "openid email profile" } },
        idToken: true,
        checks: ["pkce", "state"],
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
          }
        },
      }
  ],
  theme: {
    colorScheme: "light",
  },
}

export default NextAuth(authOptions)
