import { LocalizedString } from './content';

export interface LegalSection {
  id: number;
  title: LocalizedString;
  content: LocalizedString;
}

export const privacyPolicySections: LegalSection[] = [
  {
    id: 1,
    title: { en: "1. Information We Collect", ar: "1. المعلومات التي نجمعها" },
    content: { 
      en: "The App collects employee-related data, which may include:\n\n• Personal identification details (e.g., name, employee ID)\n• Work-related information (e.g., operating location)\n• App usage data (e.g., login history, activity within the app)",
      ar: "يقوم التطبيق بجمع البيانات المتعلقة بالموظفين، والتي قد تشمل:\n\n• تفاصيل الهوية الشخصية (مثل الاسم ورقم الموظف)\n• المعلومات المتعلقة بالعمل (مثل موقع العمل)\n• بيانات استخدام التطبيق (مثل سجل تسجيل الدخول والنشاط داخل التطبيق)"
    }
  },
  {
    id: 2,
    title: { en: "2. How We Use Your Data", ar: "2. كيف نستخدم بياناتك" },
    content: {
      en: "The information collected is used solely for internal operations of the app, including but not limited to:\n\n• Facilitating operational requirements\n• Enabling specific functionalities of the app\n• Improving user experience and troubleshooting technical issues",
      ar: "تُستخدم المعلومات التي يتم جمعها فقط للعمليات الداخلية للتطبيق، بما في ذلك على سبيل المثال لا الحصر:\n\n• تسهيل المتطلبات التشغيلية\n• تمكين وظائف محددة في التطبيق\n• تحسين تجربة المستخدم واستكشاف المشكلات الفنية وإصلاحها"
    }
  },
  {
    id: 3,
    title: { en: "3. Sharing of Data", ar: "3. مشاركة البيانات" },
    content: {
      en: "We may share your data with authorized third-party service providers and internal stakeholders as necessary to fulfill company-related functions.",
      ar: "قد نشارك بياناتك مع مزودي الخدمة المعتمدين من أطراف ثالثة وأصحاب المصلحة الداخليين حسب الضرورة لأداء وظائف الشركة."
    }
  }
];

export const accountDeletionContent = {
  title: { en: "Account Deletion", ar: "حذف الحساب" },
  desc: { en: "Compliance Request Portal", ar: "بوابة طلبات الامتثال" },
  sections: [
    {
      title: { en: "1. Deletion Overview", ar: "1. نظرة عامة على الحذف" },
      content: { 
        en: "Under local regulations, you possess the right to request the deletion of your account records from Qudrat National Company's databases.",
        ar: "بموجب الأنظمة المحلية، تمتلك الحق في طلب حذف سجلات حسابك من قواعد بيانات شركة قدرات الوطنية."
      }
    },
    {
      title: { en: "2. How to Request Deletion", ar: "2. كيفية طلب الحذف" },
      content: {
        en: "To initiate a deletion request, please email our compliance team at info@QNC.sa.",
        ar: "لبدء طلب الحذف، يرجى مراسلة فريق الامتثال لدينا على البريد الإلكتروني info@QNC.sa."
      }
    }
  ]
};
