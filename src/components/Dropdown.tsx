import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";

export default function Dropdown() {
  const { data: session }: any = useSession();

  return (
    <Menu as="div" className=" h-12  flex items-center">
      <Menu.Button className="flex items-center w-full px-4   py-3 text-sm font-medium text-white bg-[#008c44] rounded-full hover:opacity-80">
        <FaRegUser color="white" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-5 w-56 mt-24 z-10 origin-top-right text-white bg-[#008c44]  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-white/10"
                  } group flex rounded-md items-center w-full px-2 cursor-pointer py-2 text-sm font-semibold tracking-wide text-white `}
                  onClick={() => signOut({ redirect: false })}
                >
                  Cerrar sessión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
