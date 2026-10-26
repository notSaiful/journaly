import { BUSINESS, confirmedLegalEntity, parentBrandLink } from '../config/business';

function whoRunsAnswer() {
  const legal = confirmedLegalEntity();
  const parent = parentBrandLink();
  let answer = 'Journaly is its own brand. It makes custom journals and notebooks for businesses.';
  if (legal) answer += ` The legal entity named on this site is ${legal}.`;
  if (BUSINESS.ownerName) answer += ` ${BUSINESS.ownerName} leads Journaly.`;
  if (parent) answer += ` ${parent.label}.`;
  return answer;
}

export const B2B_FAQS = [
  {
    category: 'Ordering',
    q: 'How do I get a price for custom journals?',
    a: `Tell us the quantity, deadline, branding, and delivery city in India. Use the quote form or WhatsApp ${BUSINESS.whatsappDisplay}. Journaly replies with a quote. A rate card is not published, and nothing is ordered until you agree.`
  },
  {
    category: 'Ordering',
    q: 'Is there a minimum order?',
    a: 'A minimum order quantity is not published. Tell us how many journals you need, including a smaller run, and we will say if we can take it.'
  },
  {
    category: 'Ordering',
    q: 'How long does a custom order take?',
    a: 'A standard lead time is not published. Share the date you need the journals and we will confirm what is possible when we quote.'
  },
  {
    category: 'Ordering',
    q: 'Do you deliver across India?',
    a: 'Yes. Journaly takes bulk journal orders for delivery across India. Include the city and the date you need them.'
  },
  {
    category: 'Customization',
    q: 'Can you put our logo on the journal?',
    a: 'Yes. Ask for foil stamping, blind deboss, UV print, or another branding method, and send the logo with your brief. The quote will say what we can produce.'
  },
  {
    category: 'Customization',
    q: 'Can the inside pages be our own content?',
    a: 'Yes. Inner pages can carry a welcome note, an agenda, prompts, or other copy you supply. Describe the layout you want and we will include it in the quote.'
  },
  {
    category: 'Customization',
    q: 'What packaging can we ask for?',
    a: 'Tell us if the journals should be packed for handing out, presented as gifts, or shipped in bulk cartons. A fixed packaging menu is not published. We confirm the options in the quote.'
  },
  {
    category: 'Customization',
    q: 'Are the journals eco-friendly or certified?',
    a: 'Material claims and certifications are not published. Ask about paper and cover options in your brief and we will describe what we can offer. We will not guess.'
  },
  {
    category: 'Occasions',
    q: 'What do companies order these journals for?',
    a: 'Corporate gifts, employee welcome kits and onboarding, events and conferences, Diwali and New Year gifting, and college or cohort gifts. If the occasion is different, describe it in the quote.'
  },
  {
    category: 'Contact',
    q: 'Who runs Journaly?',
    a: whoRunsAnswer()
  },
  {
    category: 'Contact',
    q: 'How do I contact Journaly?',
    a: `WhatsApp ${BUSINESS.whatsappDisplay}, or email ${BUSINESS.contactEmail}. The quote form opens a WhatsApp message with your details filled in. It is sent only when you press Send.`
  }
];

export const HOME_FAQS = B2B_FAQS.filter((item) =>
  [
    'How do I get a price for custom journals?',
    'Is there a minimum order?',
    'How long does a custom order take?',
    'Can you put our logo on the journal?',
    'Do you deliver across India?',
    'Who runs Journaly?'
  ].includes(item.q)
);
