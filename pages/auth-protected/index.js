import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const AuthProtected = withPageAuthRequired(
    async () => {
        const session = await getSession();
        const user = session?.user;
        return (
            <div className="content-layout px-44">
                {/* <Image src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p> */}
            </div>
        );
    },
    { returnTo: "/auth-protected" }
);

export default AuthProtected;