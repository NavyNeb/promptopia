"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();
  const [provider, setProvider] = useState(null);
  const [Toggle, setToggle] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      console.log('response', response)

      setProvider(response);
    };

    setProviders();
  }, []);

console.log('session', session)
  // alert(session)

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        { session?.user  ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Prompt
            </Link>

            <button onClick={signOut} type="button" className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={"/assets/images/logo.svg"}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile img"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image
              src={"/assets/images/logo.svg"}
              alt="Promptopia Logo"
              width={30}
              height={30}
              className="object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />
            {
                Toggle && (
                    <div className="dropdown" > 
                        <Link href={"/profile"} className="dropdown_item" onClick = { ()=> setToggle(false) } >
                            My Profile
                        </Link>

                        <Link href={"/create-prompt"} className="dropdown_item" onClick = { ()=> setToggle(false) } >
                            Create Prompt
                        </Link>

                        <button type="button" onClick={()=>{
                            setToggle(false);
                            signOut()
                        }} className="mt-5 w-full black_btn" >
                            Sign Out
                        </button>
                    </div>
                )
            }
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
 
  );
};

export default Nav;
