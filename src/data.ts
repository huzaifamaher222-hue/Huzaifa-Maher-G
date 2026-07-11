import { Benefit, Feature, Review, FAQ } from './types';

export const BENEFITS: Benefit[] = [
  {
    id: 'benefit_1',
    title: '30-Second Rapid Heating',
    description: 'Equipped with PTC heating element that heats up in just 30 seconds. Perfect for quick touch-ups on busy mornings or before unexpected video calls.',
    iconName: 'Zap'
  },
  {
    id: 'benefit_2',
    title: 'Tourmaline Ceramic Glaze Plates',
    description: 'Ultra-smooth ceramic plates release negative ions to seal hair cuticles, eliminate frizz, and protect your precious hair from over-heat damage, leaving it glossy and sleek.',
    iconName: 'Sparkles'
  },
  {
    id: 'benefit_3',
    title: 'Compact & Ultra-Portable',
    description: 'At only 17cm long and weighing under 150g, it easily slips into your handbag, travel pouch, or office drawer. Bring perfect hair styling wherever you go.',
    iconName: 'Smartphone'
  },
  {
    id: 'benefit_4',
    title: 'Perfect for Fringes & Roots',
    description: 'The narrow 2cm plates allow you to get close to the hair roots, style cute bangs, adjust side locks, or create bouncy curls and waves effortlessly.',
    iconName: 'Scissors'
  }
];

export const FEATURES: Feature[] = [
  { id: 'f1', title: 'Plate Material', value: 'Tourmaline Ceramic Glaze' },
  { id: 'f2', title: 'Heating Element', value: 'PTC Fast Heating Element' },
  { id: 'f3', title: 'Temperature Range', value: '160°C - 200°C Intelligent Regulation' },
  { id: 'f4', title: 'Rated Power', value: '20W - 25W (Energy Efficient)' },
  { id: 'f5', title: 'Dimensions', value: 'Length: 17 cm, Plate Width: 2 cm' },
  { id: 'f6', title: 'Power Cord', value: '1.2m Heavy Duty Safety Wire' },
  { id: 'f7', title: 'Voltage Compatibility', value: '220V (Standard Pakistani Socket)' },
  { id: 'f8', title: 'Weight', value: '120g (Ultra Featherweight)' }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev_1',
    author: 'Ayesha Khan',
    rating: 5,
    text: 'A absolute lifesaver! I bought this mini straightener for my office touch-ups and it is perfect. It heats up so fast and makes my hair smooth instantly. The packaging was so premium too. Highly recommend StarShineWorld!',
    date: '3 days ago',
    verified: true,
    location: 'Karachi, Sindh',
    likes: 18,
    avatarColor: 'bg-rose-100 text-rose-700',
    reply: 'Thank you Ayesha! We are thrilled to hear that it is your absolute lifesaver. Keep shining!'
  },
  {
    id: 'rev_2',
    author: 'Zainab Ahmed',
    rating: 5,
    text: 'Perfect for styling my bangs! Normal straighteners are too bulky and always burn my forehead. This mini size is incredibly easy to control. COD was super fast, received in Lahore within 2 days.',
    date: '1 week ago',
    verified: true,
    location: 'Lahore, Punjab',
    likes: 12,
    avatarColor: 'bg-amber-100 text-amber-700',
    reply: 'So glad it helps with your bangs, Zainab! Safety and comfort are our top priorities.'
  },
  {
    id: 'rev_3',
    author: 'Mahnoor Malik',
    rating: 4,
    text: 'Compact, cute, and works amazingly well! I was skeptical because of the low price but the quality is genuinely premium. Smooth plates do not tug or pull hair. Perfect for travel.',
    date: '2 weeks ago',
    verified: true,
    location: 'Islamabad, ICT',
    likes: 9,
    avatarColor: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'rev_4',
    author: 'Sania Yousaf',
    rating: 5,
    text: 'Mera hair straightener kal mila and I tried it today. Heat constant rehti hai and hair shiny hojatay hain instantly. Delivery boy was also very polite. Free delivery and Cash on Delivery option is best.',
    date: '2 weeks ago',
    verified: true,
    location: 'Peshawar, KPK',
    likes: 15,
    avatarColor: 'bg-pink-100 text-pink-700',
    reply: 'Thank you for your lovely feedback, Sania! Enjoy your salon-like styling at home!'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq_1',
    question: 'How long does shipping take and what are the charges?',
    answer: 'We provide FREE Delivery across Pakistan! Orders are processed immediately. Deliveries take 2 to 3 working days in Karachi, Lahore, and Islamabad, and 3 to 5 working days for other cities.',
    category: 'Shipping'
  },
  {
    id: 'faq_2',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes! We offer Cash on Delivery (COD) across Pakistan. You only pay when the product is safely delivered to your doorstep. No advance payment required.',
    category: 'Guarantee'
  },
  {
    id: 'faq_3',
    question: 'Can this straightener curl hair as well?',
    answer: 'Yes, absolutely! The straightener features sleek curved edges and narrow plates, making it exceptionally easy to create gorgeous curls, beach waves, and bouncy fringes in addition to sleek straightening.',
    category: 'Product'
  },
  {
    id: 'faq_4',
    question: 'Is it safe for daily styling?',
    answer: 'Yes, our tourmaline ceramic coating generates natural infrared heat and releases negative ions. This lock in natural moisture, prevents excess dry-out, and ensures hair remains healthy with daily touch-ups.',
    category: 'Product'
  },
  {
    id: 'faq_5',
    question: 'What is your refund/replacement policy?',
    answer: 'We offer a hassle-free 7-day replacement warranty. If your product is damaged or has any manufacturing defect, simply contact us via WhatsApp and we will dispatch a brand-new replacement immediately.',
    category: 'Guarantee'
  }
];

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sahiwal',
  'Gujrat',
  'Okara',
  'Wah Cantt',
  'Mardan',
  'Kasur',
  'Rahim Yar Khan',
  'Dera Ghazi Khan',
  'Sukkur',
  'Larkana',
  'Shekhupura',
  'Jhang',
  'Sheikhupura'
].sort();
