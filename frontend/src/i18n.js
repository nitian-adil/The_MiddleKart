import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        products: "Products",
        login: "Login",
        password: "Password",
        signup: "Signup",
        logout: "Logout",
        adminpanel: "Admin Panel",
        brand: "MiddleKart",
        tagline: "Your trusted ecommerce partner.",
        quickLinks: "Quick Links",
        products: "Products",
        orders: "Orders",
        cart: "Cart",
        contact: "Contact",
        rights: "All rights reserved.",
        addtocart:"Add to Cart",
        createaccount:"Create Account",
        name:"name",
        fullname:"Full Name",
        register:"Register",
        email:"Email",
        admindashboard:"Admin Dashboard",
        users:"Users"
      },
    },
    ar: {
      translation: {
        home: "الرئيسية",
        products: "المنتجات",
        login: "تسجيل الدخول",
        password:"كلمة المرور",
        signup: "إنشاء حساب",
        logout: "تسجيل الخروج",
        adminpanel: "لوحة التحكم",
        brand: "MiddleKart",
        tagline: "شريكك الموثوق في التجارة الإلكترونية",
        quickLinks: "روابط سريعة",
        products: "المنتجات",
        orders: "الطلبات",
        cart: "السلة",
        contact: "اتصل بنا",
        rights: "جميع الحقوق محفوظة.",
        addToCart: "أضف إلى السلة",
          createaccount:"إنشاء حساب",
          name:"اسم",
          fullname:"الاسم الكامل",
          register:"يسجل",
          email:"بريد إلكتروني",
          admindashboard:"لوحة تحكم المشرف",
          users:"المستخدمين"
      },
    },
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
