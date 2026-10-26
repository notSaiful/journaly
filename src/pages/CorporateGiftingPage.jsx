import { NAME_PERSONALISATION } from '../config/business';
import { Breadcrumbs, CtaPair, Eyebrow, WhatsAppNote } from '../components/b2b/Marketing';

const OCCASIONS = [
  {
    id: 'client-gifts',
    title: 'Client and employee gifts',
    text: 'A branded journal is a corporate gift people can use after the season. Tell us who it is for and how you want the logo placed.'
  },
  {
    id: 'welcome-kits',
    title: 'Employee welcome kits and onboarding',
    text: 'Put a welcome note and the first-week pages inside a notebook with your mark on the cover. Useful for HR and people teams.'
  },
  {
    id: 'events',
    title: 'Events and conferences',
    text: 'A notebook for delegates, with the agenda or a short brief in the opening pages. Share the event date when you ask for a quote.'
  },
  {
    id: 'festive',
    title: 'Diwali and New Year corporate diaries',
    text: 'Seasonal gifting for clients and teams. We have not published a cutoff date. Send the date you need them in hand and we will say if we can meet it.'
  },
  {
    id: 'cohorts',
    title: 'Colleges, cohorts, and programmes',
    text: 'A shared journal for an orientation, a course, or a graduating group. The inside pages can follow the programme you send us.'
  },
  {
    id: 'india',
    title: 'Bulk orders across India',
    text: 'Orders can be delivered across India. Include the city, the quantity, and whether the journals ship to one address or need to be packed for handing out.'
  }
];

export default function CorporateGiftingPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'Corporate gifting' }]} />
        <Eyebrow>Occasions</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          Corporate gifting journals for teams, clients, and events.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed">
          Personalised corporate gifts in India, made as journals and notebooks rather than another object that gets set aside. Employee welcome kit notebooks, conference books, and New Year corporate diaries start from the same brief: quantity, deadline, and branding. {NAME_PERSONALISATION}
        </p>
        <CtaPair />
        <div className="mt-4"><WhatsAppNote /></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">
        {OCCASIONS.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDCF]">
            <h2 className="text-2xl font-medium tracking-tight">{item.title}</h2>
            <p className="mt-3 text-sm sm:text-base text-[#6A6054] font-light leading-relaxed">{item.text}</p>
          </article>
        ))}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] border border-[#E5DDCF]">
          <h2 className="text-2xl font-medium tracking-tight">Ask for the quote before you promise a date internally</h2>
          <p className="mt-3 text-sm text-[#6A6054] font-light leading-relaxed">
            The minimum order is 50 journals. We do not publish a lead time. Share the real number and the real date. We will tell you what we can do.
          </p>
          <CtaPair quoteLabel="Get a gifting quote" />
        </div>
      </div>
    </div>
  );
}
