<template>
  <main
    class="min-w-full min-h-screen max-h-screen bg-green1000 flex justify-center transition-all ease-in-out duration-300 gap-x-4"
  >
    <nav
      class="flex min-h-full lg:w-60 overflow-y-auto overflow-x-hidden bg-green1100 bg-opacity-50 flex-col items-start justify-between pt-8 pb-4 4xl:gap-20 2xl:gap-16 gap-12"
    >
      <div
        class="flex items-center justify-center w-full flex-col sm:px-4 px-2 gap-4"
      >
        <nuxt-icon
          name="logo"
          filled
          class="lg:text-5xl md:text-3xl text-xl border-2 border-green400 px-2 py-1.5 rounded-full"
        />
        <div
          class="flex-auto lg:flex hidden flex-col items-center justify-center"
        >
          <h2
            class="text-lg font-extrabold text-green100 transition-colors ease-in-out duration-300"
          >
            {{ store.user?.displayName }}
          </h2>
          <p class="font-semibold text-gray">{{ store.user?.email }}</p>
        </div>
      </div>

      <ul
        class="flex-1 flex flex-col lg:gap-6 gap-8 text-gray-500 transition-colors ease-in-out duration-300"
      >
        <h3
          class="lg:px-6 sm:px-3 px-2 font-bold sm:text-base text-sm text-gray"
        >
          Menu
        </h3>

        <NuxtLink
          to="/"
          class="relative w-full sm:px-4 px-2 cursor-pointer flex items-center lg:justify-start justify-center h-[1.7rem] font-semibold text-gray hover:text-green400 transition-all ease-in-out duration-300"
        >
          <RocketLaunchIcon
            class="peer lg:h-5 lg:w-5 lg:mr-2 h-7 w-7 transition-all ease-in-out duration-200"
          />
          <p
            class="fixed left-16 sm:left-20 md:left-24 bg-green400 drop-shadow-lg text-white px-2 py-1 lg:p-0 text-sm scale-0 peer-hover:scale-100 transition-all ease-in-out duration-200 rounded-md z-10 w-fit lg:static lg:text-current lg:scale-100 lg:drop-shadow-none lg:text-base lg:bg-transparent lg:flex"
          >
            My Services
          </p>
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="relative w-full sm:px-4 px-2 cursor-pointer flex items-center lg:justify-start justify-center h-[1.7rem] font-semibold text-gray hover:text-green400 transition-all ease-in-out duration-300"
        >
          <ShoppingBagIcon
            class="peer lg:h-5 lg:w-5 lg:mr-2 h-7 w-7 transition-all ease-in-out duration-200"
          />
          <p
            class="fixed left-16 sm:left-20 md:left-24 bg-green400 drop-shadow-lg text-white px-2 py-1 lg:p-0 text-sm scale-0 peer-hover:scale-100 transition-all ease-in-out duration-200 rounded-md z-10 w-fit lg:static lg:text-current lg:scale-100 lg:drop-shadow-none lg:text-base lg:bg-transparent lg:flex"
          >
            My Products
          </p>
        </NuxtLink>
        <NuxtLink
          to="/next-rel"
          class="relative w-full sm:px-4 px-2 cursor-pointer flex items-center lg:justify-start justify-center h-[1.7rem] font-semibold text-gray hover:text-green400 transition-all ease-in-out duration-300"
        >
          <FireIcon
            class="peer lg:h-5 lg:w-5 lg:mr-2 h-7 w-7 transition-all ease-in-out duration-200"
          />
          <p
            class="fixed left-16 sm:left-20 md:left-24 bg-green400 drop-shadow-lg text-white px-2 py-1 lg:p-0 text-sm scale-0 peer-hover:scale-100 transition-all ease-in-out duration-200 rounded-md z-10 w-fit lg:static lg:text-current lg:scale-100 lg:drop-shadow-none lg:text-base lg:bg-transparent lg:flex"
          >
            Next Release
          </p>
        </NuxtLink>
        <NuxtLink
          to="/order-transaction"
          class="relative w-full sm:px-4 px-2 cursor-pointer flex items-center lg:justify-start justify-center h-[1.7rem] font-semibold text-gray hover:text-green400 transition-all ease-in-out duration-300"
        >
          <QrCodeIcon
            class="peer lg:h-5 lg:w-5 lg:mr-2 h-7 w-7 transition-all ease-in-out duration-200"
          />
          <p
            class="fixed left-16 sm:left-20 md:left-24 bg-green400 drop-shadow-lg text-white px-2 py-1 lg:p-0 text-sm scale-0 peer-hover:scale-100 transition-all ease-in-out duration-200 rounded-md z-10 w-fit lg:static lg:text-current lg:scale-100 lg:drop-shadow-none lg:text-base lg:bg-transparent lg:flex"
          >
            Orders & Transactions
          </p>
        </NuxtLink>
      </ul>

      <div
        class="sflex gap-6 text-gray-500 transition-colors ease-in-out duration-300"
      >
        <NuxtLink
          to="/settings"
          class="relative w-full sm:px-4 px-2 cursor-pointer flex items-center lg:justify-start justify-center h-[1.7rem] font-semibold text-gray hover:text-green400 transition-all ease-in-out duration-300"
        >
          <CogIcon
            class="peer lg:h-5 lg:w-5 lg:mr-2 h-7 w-7 transition-all ease-in-out duration-200"
          />
          <p
            class="fixed left-16 sm:left-20 md:left-24 bg-green400 drop-shadow-lg text-white px-2 py-1 lg:p-0 text-sm scale-0 peer-hover:scale-100 transition-all ease-in-out duration-200 rounded-md z-10 w-fit lg:static lg:text-current lg:scale-100 lg:drop-shadow-none lg:text-base lg:bg-transparent lg:flex"
          >
            Settings
          </p>
        </NuxtLink>
      </div>
    </nav>

    <section
      class="relative flex-1 min-h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden pr-4"
    >
      <nav
        class="w-full h-[3.7rem] sticky top-0 left-0 right-0 bg-green1100 bg-opacity-20 flex items-center justify-between z-30 xl:gap-16 gap-8 backdrop-blur"
      >
        <a href="https://hibirlinks.vercel.app/">
          <nuxt-icon name="logo-text" filled class="text-7xl" />
        </a>
        <div class="flex-1 flex justify-end items-center xl:gap-16 gap-4">
          <ul class="lg:flex hidden items-center xl:gap-16 gap-8">
            <a
              href="https://hibirlinks.vercel.app/services"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
              >Services</a
            >
            <a
              href="https://hibirlinks.vercel.app/products"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
              >Products</a
            >
            <a
              href="https://hibirlinks.vercel.app/next-rel"
              class="relative cursor-pointer flex items-center justify-center w-[6.7rem] h-8 font-semibold before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
              >Next Rel</a
            >
          </ul>
          <ul class="flex items-center xl:gap-10 md:gap-4 gap-6">
            <li
              class="md:block hidden w-[0.15rem] h-5 rounded-full bg-green400 bg-opacity-10"
            ></li>
            <li
              class="font-bold text-sm hover:text-green400 transition-colors duration-300 ease-in-out cursor-pointer flex items-end"
            >
              <LanguageIcon class="w-5 h-5 text-green400" /> Eng
            </li>
            <!-- <li>
              <slot name="cart"> </slot>
            </li> -->
            <NuxtLink
              to="https://hibirlinks.vercel.app/"
              class="bg-gradient-to-r from-green400 to-lemon px-5 py-1 font-semibold hover:shadow-lg rounded-full cursor-pointer ring-2 ring-transparent active:ring-green1100 transition-all ease-in-out duration-300"
            >
              Home
            </NuxtLink>

            <Bars3BottomRightIcon
              @click="
                () => {
                  showMobileDrawer = true;
                }
              "
              class="lg:hidden flex w-8 h-8 text-green100"
            />
          </ul>
        </div>
      </nav>

      <section class="min-h-full">
        <slot />
      </section>
    </section>

    <div
      class="lg:hidden fixed top-0 bottom-0 right-0 left-0 bg-gray z-50 w-full h-screen overflow-hidden flex justify-end transition-all ease-in-out duration-300"
      :class="
        showMobileDrawer ? 'left-0 bg-opacity-5' : 'left-[100%] bg-opacity-0'
      "
    >
      <ul
        ref="mobileNavTarget"
        style="box-shadow: 0 35px -2px rgb(0 0 0 / 20%)"
        class="bg-green1000 bg-opacity-95 z-50 drop-shadow-2xl rounded h-full p-6 flex flex-col gap-6 transition-all ease-in-out duration-300"
        :class="showMobileDrawer ? 'xs:w-[372px] w-4/6' : 'w-0'"
      >
        <div
          class="absolute top-4 right-4"
          @click="
            () => {
              showMobileDrawer = false;
            }
          "
        >
          <XMarkIcon
            class="w-8 h-8 text-green200 hover:text-red transition-colors ease-in-out duration-300"
          />
        </div>
        <a
          href="#"
          @click="
            () => {
              showMobileDrawer = false;
            }
          "
        >
          <div class="w-full flex flex-col gap-4 items-center justify-center">
            <nuxt-icon name="logo-text" filled class="text-8xl -mb-11" />
            <h3 class="font-bold text-gray">We Link Everything.</h3>
          </div>
        </a>
        <a
          href="#"
          @click="
            () => {
              showMobileDrawer = false;
            }
          "
          class="relative h-12 rounded flex items-center justify-start text-lg font-bold px-4 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
          >Services</a
        >
        <a
          href="#"
          @click="
            () => {
              showMobileDrawer = false;
            }
          "
          class="relative h-12 rounded flex items-center justify-start text-lg font-bold px-4 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
          >Products</a
        >
        <a
          href="#"
          @click="
            () => {
              showMobileDrawer = false;
            }
          "
          class="relative h-12 rounded flex items-center justify-start text-lg font-bold px-4 before:contnet-[''] after:contnet-[''] before:absolute after:absolute before:left-0 after:right-0 before:bottom-0 after:top-0 before:w-0 hover:before:w-full after:w-0 hover:after:w-full before:h-0 hover:before:h-full after:h-0 hover:after:h-full before:border-b-2 after:border-t-2 before:border-l-2 after:border-r-2 before:border-transparent hover:before:border-green400 after:border-transparent hover:after:border-green400 before:transition-all after:transition-all before:ease-in-out after:ease-in-out before:duration-500 after:duration-500 before:rounded-sm after:rounded-sm"
          >Next Rel</a
        >
      </ul>
    </div>
  </main>
</template>

<style scoped>
.router-link-active {
  @apply text-green400;
}
.router-link-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #8dcc7b;
  height: 100%;
  width: 4px;
  transition: all 0.5s ease;
}
</style>

<script setup lang="ts">
import {
  RocketLaunchIcon,
  ShoppingBagIcon,
  FireIcon,
  QrCodeIcon,
  CogIcon,
  LanguageIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { getAuth, signOut } from "firebase/auth";
import { useAppStore } from "~/store/store";
const router = useRouter();
const store = useAppStore();
const showMobileDrawer = ref<boolean>(false);
const mobileNavTarget = ref(null);

onClickOutside(mobileNavTarget, (event) => {
  showMobileDrawer.value = false;
});
</script>
