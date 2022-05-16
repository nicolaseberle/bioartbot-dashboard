import Vue from "vue";
import VueTailwind from "vue-tailwind";

import TDialog from "vue-tailwind/dist/t-dialog";
import TDropdown from "vue-tailwind/dist/t-dropdown";
import TAlert from "vue-tailwind/dist/t-alert";

const settings = {
  "t-dialog": {
    component: TDialog,
    props: {
      fixedClasses: {
        overlay:
          "overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed",
        wrapper: "relative mx-auto",
        modal: "overflow-visible relative ",
        close: "flex items-center justify-center",
        dialog: "overflow-visible relative",
        iconWrapper:
          "bg-red-100 flex flex-shrink-0 h-12 items-center justify-center rounded-full w-12 mx-auto",
        icon: "w-6 h-6 text-red-500",
        title: "text-lg font-semibold text-center my-4",
        textWrapper: "text-center w-full mb-2",
        cancelButton:
          "block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",
        okButton:
          "block px-4 py-2 text-white transition duration-100 ease-in-out bg-indigo-600 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",
      },
    },
  },
  "t-dropdown": {
    component: TDropdown,
    props: {
      defaultClasses: {
        button:
          "block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
        wrapper: "inline-flex flex-col",
        dropdownWrapper: "relative z-50",
        dropdown:
          "origin-top-left absolute left-0 rounded shadow bg-white mt-1",
        enterClass: "opacity-0 scale-95",
        enterActiveClass: "transition transform ease-out duration-100",
        enterToClass: "opacity-100 scale-100",
        leaveClass: "opacity-100 scale-100",
        leaveActiveClass: "transition transform ease-in duration-75",
        leaveToClass: "opacity-0 scale-95",
      },
    },
  },
  "t-alert": {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper:
          "absolute transition duration-500 ease-in-out delay-500 flex items-center p-4 border-l-4  rounded shadow-sm",
        body: "flex w-full",
        close:
          "absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        closeIcon: "fill-current h-4 w-4",
      },
      classes: {
        wrapper: "bg-blue-50 border-blue-500",
        body: "text-blue-700",
        close: "text-blue-500 hover:bg-blue-200",
      },
      variants: {
        danger: {
          wrapper: "absolute top-0 right-0  bg-red-100 border-red-600",
          body: "text-red-800",
          close: "text-red-500 hover:bg-red-200",
        },
        success: {
          wrapper: "absolute top-0 right-0  bg-green-100 border-green-600",
          body: "text-green-800",
          close: "text-green-500 hover:bg-green-200",
        },
      },
    },
  },
};

Vue.use(VueTailwind, settings);
