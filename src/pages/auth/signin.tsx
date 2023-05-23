import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Signin: React.FC<{ providers: any }> = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) return <Loader />;


  return (
    <div className="bg-[#f7f4f2] h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {Object.values(providers).map((provider: any) => (
        <div className="text-center" key={provider.name}>
          <picture>


          <img src="https://camacol.co/sites/default/files/styles/media_library/public/2022-03/constructora-bolivar.png?itok=h1a9YjsY" alt="constructora" width={300} height={300}/>
          </picture>

          <button
            className="text-white py-4 px-6 rounded-full bg-[#008c44] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            iniciar session con {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
