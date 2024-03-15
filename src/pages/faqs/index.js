import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { IbejuLekkiLogo } from "../../components/Images/Images";
import Nav from "../../components/landing/Nav";

const faqs = [
  {
    question: "What is the New Ibeju Lekki Revenue and e-ticketing App?",
    answer:
      "The New Ibeju-Lekki Revenue and e-ticketing App is an initiative pioneered by the Ibeju-Lekki Local Government, Executive Chairman, Hon. Abdullahi Sesan Olowa led Administration to ease and simplify the revenue collection process in the Local Government. This new collection system will enable all Tax payers in the Local Government to be properly enumerated and also simplify the tax payment process by all Taxpayers in the Local Government Area.",
    yorubaQuestion:
      "Kíni ẹ̀yí ní Ìpò Revenue àti Eticketing Ibeju Lekki tó wọ́n fẹ́?",
    yorubaAnswer:
      "Ìpò Revenue àti Eticketing tó wọ́n fẹ́ ní Ìbèjù-Lẹ́kì jẹ́ ọ̀fẹ́èrànṣé tó wọ́n fẹ́ ní Ìbèjù-Lẹ́kì, Chairman Kọọkan, Hon. Abdullahi Sesan Olowa ní irò ayé kọọkan lati gbogbo èèyàn ní Ìbèjù-Lẹ́kì. Ìwọ̀ yẹ ki gbogbo olúìlú mọ̀kanlá ayé kọọkan lórí ìkànsí àti ó wọ́n fẹ́ pẹ̀lú ìlànà kọọkan ilẹ̀ tó gbogbo ọmọ-ẹ̀yà ni ayé kọọkan ní Ìbèjù-Lẹ́kì.",
  },
  {
    question: "What are the benefits of the New system",
    answer: `Simplified Tax payment,
      Prevent Double Taxation,
      Transparency,
      Ease Development Planning.`,
    yorubaQuestion: "Kíni ọ̀ládírẹ̀ bí Ìtumọ Rẹ̀ nígbà tó gbogbo ní kílọdé?",
    yorubaAnswer: `Ìtumọ Rẹ̀ nígbà tó gbogbo ní kílọdé,
      Máa gbogbo bí itọ̀kà tó gbogbo ní,
      Àgbàlagbàkọ̀ọ̀,
      Ìtọkà ní ìmọ̀ níkàn.`,
  },
  {
    question: "Who Is an Ibeju Lekki Revenue Collection Agent",
    answer: `Ibeju Lekki Revenue Collectio Agents are individuuals that have been vetted and pre-selected by the local government to do: I, Continous enumeration of Tax Payers. II, Issue E-tickets on behalf of the local government.. III, Issue E-receipts to Tax Payers `,
    yorubaQuestion: "Tani wọ́n ní ẹ̀yí ní Ibeju Lekki Revenue Collection Agent?",
    yorubaAnswer:
      "Ibeju Lekki Revenue Collection Agents wọn ni àwọn èdá tó rọ̀ bí wọn wọn fẹ́ tó wọn ní ilẹ̀ kẹrin lati ṣe: I, Ilembẹ̀ àwọn ìtumọ̀ rẹ̀. II, Ṣe e-tikẹ̀tì ní ìrànlọ́wọ́ fun ilẹ̀ kẹrin. III, Ṣe e-rẹsípítì ní ìtumọ̀ rẹ̀.",
  },
  {
    question: "Who is Eligible to apply to be an agent?",
    answer: `To be eligible for selection applicants must be a 
      Resident in Ibeju-Lekki LGA,
      Have a working Android phone,
      Have a registered BVN and NIN,
      Have mobile Internet for their Phones.
      Youths with a good understanding of how to use their mobile phones.`,
    yorubaQuestion: "Tani le gba ìdáhun láti lo dá ilẹ̀wọ̀ ní ìṣòrò Agent?",
    yorubaAnswer: `Pẹ̀lú kí wọ́n le gba ìdáhun, àwọn ìmọ̀ dá ilẹ̀wọ̀ ní:
      Olùbọdé ní Ibeju-Lekki LGA,
      Ní èdá mẹta ní ìwọ̀ràn Android tó bá jẹ́ kọọkan,
      Wọ́n gbogbo ní BVN àti NIN rẹ̀ kọọkan,
      Wọ́n gbogbo ní ẹ̀dá mókìlọlọ́ ní wọ́n,
      Àgbàlagbàkọ̀ọ̀ tó fẹ́ mọ̀ kí wọ́n ṣe ìwàlọ́gbogbo ní ẹ̀dá mókìlọlọ́ wọ́n.`,
  },
  {
    question: "How will I know my application was successful",
    answer: `All successful applicants will be notified via their registered emails and phone numbers`,
    yorubaQuestion: "Bí ẹ̀dá rẹ̀ ti wà láti rí, bí nígbà tó gbogbo ní kílọdé",
    yorubaAnswer: `Gẹ́gẹ́ bí ẹ̀dá rẹ̀ yẹ ki wọ́n mọ̀ pé ẹ̀dá rẹ̀ ti wà, kí wọ́n yọ kọọkan láti wọ̀n ìméèlì àti nọ́mbà fóòn wọ́n tó wọ́n gbogbo ti rẹ̀ gbogbo`,
  },
  {
    question: "How do I know my application is submitted successfully",
    answer: `After applying, the applicant will receive a notification of submission via email and SMS to their registered phone numbers`,
    yorubaQuestion: "Bí nítorí àwọn ẹ̀dá ní ìtúrọ̀ dá ilẹ̀wọ̀ tó gbogbo ní kílọdé",
    yorubaAnswer: `Ní bí bá sì gba ìdáhun, ìṣèlú ìdáhun yẹ ki ẹ̀dá rẹ̀ mọ̀ pé ìtúrọ̀ dá ilẹ̀wọ̀ rẹ̀ tó ti pọ̀ọ̀pọ̀ ní ìméèlì àti SMS ní nọ́mbà fóòn rẹ̀ tó wọ́n gbogbo ti rẹ̀ gbogbo`,
  },
  {
    question: "What am I required to come with when invited for training",
    answer: `When invited to the Local Government for training, please ensure you have a working Android phone, sufficient data for the internet, personal account details, valid BVN, and NIN`,
    yorubaQuestion:
      "Kíni mo wà láti wọ́n ní bí iná ní ìṣòrò láti rí, mo wà láti wọ́n ní bí iná?",
    yorubaAnswer: `Bí wọ́n bá yọ sí ilẹ̀-ìkànsí láti rí, jọ̀wọ rí pé wọ́n kọọkan tó bá jẹ́ kọọkan, kọọkan tó bá jẹ́ ìnítanẹ̀ẹ̀tì fún ní ìntanẹ̀tì, àṣà ní ìméèlì, BVN àti NIN tó tọ̀ ẹ̀`,
  },
  {
    question: "Must I have a valid BVN or NIN",
    answer: `Yes, agents are required to have valid and registered BVNs and NINs`,
    yorubaQuestion: "Kíni mo wà ní BVN àti NIN tó wọ́n tó tọ?",
    yorubaAnswer: `Bẹẹ̀ni, àgentì rẹ̀ yẹ ki wọ́n ní BVN àti NIN tó tọ̀ lórílẹ̀ṣẹ̀`,
  },
  {
    question: "Is it compulsory to have an Android Phone to be eligible",
    answer: `Yes, all applicants must have a working Android phone with internet services to apply and work as an agent`,
    yorubaQuestion:
      "Ṣé irò tí mo wà ní iná ní ìsòrò ni ní Iphone tó bá jẹ́ kọọkan?",
    yorubaAnswer: `Bẹẹ̀ni, gbogbo àwọn wọ́n tó yẹ ki wọ́n dá ilẹ̀wọ̀ ní ìmọ̀ àtúnṣe ìrò ayé kọọkan wọ̀n ní kọọkan ní wọ́n ní iná ní ìsòrò`,
  },

  {
    question: "Must you be a resident In Ibeju-Lekki to apply",
    answer: `Yes, this opportunity is open to residents of Ibeju-Lekki Local Government`,
    yorubaQuestion: "Ṣé irò tí mo wà ní iná ní Iphone tó bá jẹ́ kọọkan?",
    yorubaAnswer: `Bẹẹ̀ni, gbogbo àwọn wọ́n tó yẹ ki wọ́n dá ilẹ̀wọ̀ ní Ìbèjù-Lẹ́kì lórílẹ̀ṣẹ̀`,
  },
  {
    question:
      "How can we apply to become Ibeju-Lekki Revenue Collection Agents?",
    answer: `Interested participants may apply online via the link below: igr.ibejulekki.lg.gov.ng`,
    yorubaQuestion: "Bí wọ́n bá fẹ̀ ṣe ìrò, bí wọ́n bá fẹ̀ ṣe ìrò?",
    yorubaAnswer: `Ẹ máa lo ìntanẹ̀tì bí wọ́n fẹ̀ ṣe ìrò tó wọ̀n fẹ́: igr.ibejulekki.lg.gov.ng`,
  },
  // Repeat the pattern for other objects...
];

// More questions...

export default function Example() {
  return (
    <section>
      <Nav />
      {/* <div className="w-full flex flex-col items-center mt-20">
        <div className="flex space-x-3 items-center">
          <IbejuLekkiLogo />
          <div className="text-justify leading-2">
            <p className="uppercase text-emerald-600 text-4xl font-bold">
              Ibeju Lekki
            </p>
            <p className="uppercase text-emerald-600 text-xl font-bold">
              Local Government
            </p>
            <small className="uppercase text-md text-yellow-400">
              igando-oloja
            </small>
          </div>
        </div>
      </div> */}

      <div className="bg-white">
        <div className="mx-auto w-7xl px-6 py-40 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl md:text-3xl font-bold leading-10 tracking-tight text-emerald-700">
              Frequently asked questions
            </h2>
            <div className="mt-3 md:mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="flex flex-col text-base font-semibold leading-7">
                            <span>{faq.question}</span>
                            {/* <span className="text-emerald-400">{faq.yorubaQuestion}</span>  */}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmallIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="flex flex-col text-base leading-7 text-gray-600">
                          <span>{faq.answer}</span>
                          {/* <span className="text-emerald-400">{faq.yorubaAnswer}</span>  */}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
