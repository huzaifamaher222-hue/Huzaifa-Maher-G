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
  // --- Punjab ---
  'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Sargodha', 'Bahawalpur', 'Sahiwal', 'Gujrat',
  'Okara', 'Kasur', 'Rahim Yar Khan', 'Dera Ghazi Khan', 'Sheikhupura', 'Jhang', 'Wah Cantt', 'Chiniot', 'Kamoke', 'Hafizabad',
  'Sadiqabad', 'Khanewal', 'Burewala', 'Muzaffargarh', 'Jhelum', 'Murree', 'Taxila', 'Attock', 'Hasan Abdal', 'Mianwali',
  'Bhakkar', 'Layyah', 'Kot Addu', 'Taunsa Sharif', 'Rajanpur', 'Jampur', 'Chishtian', 'Bahawalnagar', 'Hasilpur', 'Haroonabad',
  'Fort Abbas', 'Yazman', 'Lodhran', 'Karor Lal Esan', 'Kahror Pakka', 'Jalalpur Pirwala', 'Shujabad', 'Kabirwala', 'Mian Channu', 'Khanpur',
  'Liaquatpur', 'Ahmedpur East', 'Alipur', 'Jatoi', 'Kot Radha Kishan', 'Chunian', 'Pattoki', 'Bhai Pheru', 'Phool Nagar', 'Ferozewala',
  'Muridke', 'Sharaqpur', 'Kamalia', 'Gojra', 'Toba Tek Singh', 'Pir Mahal', 'Shorkot', 'Lalian', 'Bhalwal', 'Shahpur',
  'Sillanwali', 'Khushab', 'Jauharabad', 'Quaidabad', 'Talagang', 'Pind Dadan Khan', 'Khewra', 'Choa Saidan Shah', 'Chakwal', 'Sohawa',
  'Gujar Khan', 'Kahuta', 'Kotli Sattian', 'Kallar Syedan', 'Hazro', 'Pindi Gheb', 'Jand', 'Fateh Jang', 'Wazirabad', 'Ghakkhar Mandi',
  'Alipur Chatha', 'Sambrial', 'Daska', 'Pasrur', 'Narowal', 'Shakargarh', 'Zafarwal', 'Kharian', 'Lalamusa', 'Dinga',
  'Sarai Alamgir', 'Phalia', 'Mandi Bahauddin', 'Malakwal', 'Sangla Hill', 'Shahkot', 'Nankana Sahib', 'Safdarabad', 'Renala Khurd', 'Depalpur',
  'Hujra Shah Muqeem', 'Haveli Lakha', 'Arifwala', 'Pakpattan', 'Mailsi', 'Dunyapur', 'Jahanian', 'Tulamba', 'Abdul Hakeem', 'Kot Mithan',
  'Rojhan', 'Phularwan', 'Sodha', 'Musa Khel', 'Isa Khel', 'Kundian', 'Kallur Kot', 'Darya Khan', 'Mankera', 'Chowk Azam',
  'Fatehpur', 'Chau Bara', 'Karor Lal Isa', 'Kot Sultan', 'Jamilpur', 'Peer Jaggi', 'Kotla', 'Khankah Sharif', 'Uch Sharif', 'Dera Bakha',
  'Sama Satta', 'Mandi Yazman', 'Donga Bonga', 'Dahranwala', 'Chak Madrasa', 'Chak 319-HR', 'Marot', 'Khadro', 'Minchinabad', 'Mandi Sadiq Ganj',
  'Faizabad', 'Chichawatni', 'Kassowal', 'Harappa', 'Qaboola', 'Tibba Sultanpur', 'Karam Pur', 'Luddan', 'Gaggoo Mandi', 'Sahuka',
  'Makhdoom Aali', 'Duniyapur', 'Jalalpur Bhattian', 'Pindi Bhattian', 'Sukheke Mandi', 'Khangah Dogran', 'Farooqabad', 'Rehanwala', 'Sangatra', 'More Khunda',
  'Manawala', 'Bucheke', 'Kot Abdul Malik', 'Saranan', 'Sharakpur Sharif', 'Kala Shah Kaku', 'Narang Mandi', 'Badomalhi', 'Qila Sobha Singh', 'Kartarpur',
  'Noor Kot', 'Baddomalhi', 'Kotli Loharan', 'Begowala', 'Sodhra', 'Jamke Cheema', 'Mitranwali', 'Kunjah', 'Jalaput Jattan', 'Dinga Shah',
  'Chillianwala', 'Gojra Mandi', 'Saddar Dewat', 'Magra', 'Lilla', 'Jalaput', 'Dina', 'Sohawa Cantt', 'Domeli', 'Mangla Cantt',
  'Choti Zerin', 'Kot Chutta', 'Sakhi Sarwar', 'Shadan Lund', 'Tibbi Qaisarani', 'Vehoa', 'Fazilpur', 'Kotla Nasir', 'Mithankot', 'Rojhan Jamali',

  // --- Sindh ---
  'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpurkhas', 'Jacobabad', 'Shikarpur', 'Khairpur', 'Dadu',
  'Tando Adam', 'Tando Allahyar', 'Kotri', 'Jamshoro', 'Ghotki', 'Daharki', 'Ubauro', 'Mirpur Mathelo', 'Pano Aqil', 'Rohri',
  'Gambat', 'Ranipur', 'Sobhodero', 'Hingorja', 'Setharja', 'Mehrabpur', 'Bhiria City', 'Bhiria Road', 'Moro', 'Naushahro Feroze',
  'Kandiaro', 'Tharushah', 'Padidan', 'Sakrand', 'Kazi Ahmed', 'Sanghar', 'Shahdadpur', 'Sinjhoro', 'Tando Jam', 'Hala',
  'Matiari', 'Bhit Shah', 'Sehwan Sharif', 'Bhan Saeedabad', 'Mehar', 'Khairpur Nathan Shah', 'Johi', 'Wahi Pandhi', 'Thatta', 'Sujawal',
  'Mirpur Bathoro', 'Mirpur Sakro', 'Gharo', 'Jati', 'Chhar', 'Badin', 'Matli', 'Tando Bago', 'Talhar', 'Golarchi',
  'Shaheed Fazil Rahuhu', 'Digri', 'Jhudo', 'Naukot', 'Mithi', 'Islamkot', 'Chachro', 'Diplo', 'Umerkot', 'Pithoro',
  'Kunri', 'Samaro', 'Khipro', 'Shahpur Chakar', 'Kot Diji', 'Thari Mirwah', 'Pacca Chang', 'Faiz Ganj', 'Kingri', 'Pir Jo Goth',
  'Garhi Yasin', 'Madeji', 'Lakhi Ghulam Shah', 'Khanpur (Sindh)', 'Thul', 'Garhi Khairo', 'Kandhkot', 'Kashmore', 'Tangwani', 'Ghouspur',
  'Karampur', 'Badah', 'Dokri', 'Naudero', 'Ratodero', 'Mirokhan', 'Shahdadkot', 'Qubo Saeed Khan', 'Kamber', 'Warah', 'Nasirabad',
  'Sajawal Junejo', 'Garhi Khuda Bakhsh', 'Bhiria', 'Sita Road', 'Phul', 'Tharu Shah', 'Daur', 'Bandhi', 'Bucheri', '60 Mile',
  'Safiabad', 'Matiari Sharif', 'Odero Lal', 'Khyber', 'Tando Soomro', 'Chamber', 'Tando Ghulam Ali', 'Khadro', 'Jhol', 'Sinjhoro Mandi',
  'Jam Nawaz Ali', 'Berani', 'Khipro Sharif', 'Jamilpur', 'Kalu Khuhar', 'Nooriabad', 'Thano Bula Khan', 'Keti Bandar', 'Garo',
  'Jungshahi', 'Mirpur Sakro', 'Var', 'Bano', 'Chuhar Jamali', 'Darro', 'Ladhoo', 'Mughalbin', 'Shah Bandar', 'Kadhan',
  'Nindo Shaheed', 'Pangrio', 'Tando Jan Mohammad', 'Nabisar', 'Dhoronaro', 'Chhor', 'Khangarh', 'Ubauro Sharif', 'Sarhad', 'Adilpur',
  'Chundko', 'Therhi', 'Babarloi', 'Priyaloi', 'Setharja Sharif', 'Kotri Kabir', 'Thari', 'Karampur Sharif', 'Gouspur',

  // --- Khyber Pakhtunkhwa (KPK) ---
  'Peshawar', 'Mardan', 'Mingora', 'Kohat', 'Abbottabad', 'Dera Ismail Khan', 'Bannu', 'Swabi', 'Nowshera', 'Charsadda',
  'Mansehra', 'Khalabat', 'Haripur', 'Havelian', 'Ghazi', 'Timergara', 'Dir', 'Upper Dir', 'Chitral', 'Drosh',
  'Buner', 'Daggar', 'Alpuri', 'Shangla', 'Batagram', 'Balakot', 'Oghi', 'Shinkiari', 'Thakot', 'Besham',
  'Dasu', 'Charsadda', 'Shabqadar', 'Tangi', 'Umarzai', 'Sherpao', 'Risalpur', 'Jehangira', 'Pabbi', 'Akora Khattak',
  'Hoti', 'Takht-i-Bahi', 'Shergarh', 'Katlang', 'Zaida', 'Topi', 'Marghuz', 'Kalu Khan', 'Yar Hussain', 'Lahor (KPK)',
  'Shewa', 'Lachi', 'Shakardara', 'Karak', 'Takht-e-Nusrati', 'Banda Daud Shah', 'Hangu', 'Tall', 'Thall', 'Doaba',
  'Domel', 'Lakki Marwat', 'Naurang', 'Tajori', 'Sarai Naurang', 'Paharpur', 'Paroa', 'Kulachi', 'Daraban', 'Tank',
  'Jandola', 'Wana', 'Miranshah', 'Mir Ali', 'Razmak', 'Parachinar', 'Sadda', 'Ghalanai', 'Khar', 'Landi Kotal',
  'Jamrud', 'Bara', 'Kabal', 'Matta', 'Barikot', 'Khwazakhela', 'Kalam', 'Bahrain', 'Saidu Sharif', 'Batkhela',
  'Dargai', 'Thana', 'Malakand', 'Cherat', 'Khairabad', 'Baka Khel', 'Serai Naurang', 'Pezu', 'Darra Adam Khel', 'Landi Kotal Cantt',
  'Torkham', 'Khyber Pass', 'Wana Sharif', 'Ladha', 'Makin', 'Kaniguram', 'Sararogha', 'Angoor Ada', 'Mirali Sharif', 'Datta Khel',
  'Spinwam', 'Ghulam Khan', 'Maidan', 'Lal Qila', 'Samar Bagh', 'Talash', 'Khal', 'Barawal', 'Sheringal', 'Kumrat',
  'Mastuj', 'Buni', 'Mulkhow', 'Torkhow', 'Lotkoh', 'Ayun', 'Garam Chashma', 'Bumburet', 'Rumbur', 'Birir',
  'Puran', 'Chakesar', 'Martung', 'Besham City', 'Kabigram', 'Bana Batagram', 'Allai', 'Kaghan', 'Naran', 'Garhi Habibullah',
  'Baffa', 'Shinkiari Sharif', 'Oghi Sharif', 'Darband', 'Sherwan', 'Lora', 'Boii', 'Nathiagali', 'Ayubia', 'Khanaspur',

  // --- Balochistan ---
  'Quetta', 'Hub', 'Chaman', 'Turbat', 'Gwadar', 'Sibi', 'Khuzdar', 'Dera Murad Jamali', 'Usta Mohammad', 'Loralai',
  'Pasni', 'Ormara', 'Jiwani', 'Suntsar', 'Pishin', 'Yaroo', 'Saranan', 'Bostan', 'Killa Abdullah', 'Gulistan',
  'Qila Saifullah', 'Muslim Bagh', 'Zhob', 'Sherani', 'Musakhel', 'Barkhan', 'Kohlu', 'Mawand', 'Dera Bugti', 'Sui',
  'Pir Koh', 'Sangsillah', 'Jafarabad', 'Dera Allah Yar', 'Jhatpat', 'Sohbatpur', 'Gandakha', 'Naseerabad', 'Chattar', 'Tamboo',
  'Bhag', 'Lehri', 'Bellpat', 'Harnai', 'Shahrig', 'Ziarat', 'Sinjawi', 'Mastung', 'Pringabad', 'Khad Kocha',
  'Kalat', 'Mangochar', 'Surab', 'Wadh', 'Nal', 'Karakh', 'Zehri', 'Awaran', 'Mashkay', 'Jhal Magsi',
  'Gandawah', 'Kot Magsi', 'Bolan', 'Mach', 'Dhadar', 'Kolpur', 'Kharan', 'Basima', 'Washuk', 'Nag',
  'Nushki', 'Chagai', 'Dalbandin', 'Taftan', 'Nok Kundi', 'Panjgur', 'Tasasp', 'Paroom', 'Kech', 'Buleda',
  'Zamuran', 'Mand', 'Tump', 'Dasht', 'Lasbela', 'Uthal', 'Bela', 'Windar', 'Dureji', 'Kanraj',
  'Gadani', 'Khanozai', 'Saranan Sharif', 'Hindubagh', 'Mina Bazaar', 'Qamar Din Karez', 'Sambaza', 'Fort Sandeman', 'Manikhawa', 'Kingri (Balochistan)',
  'Kohlu Sharif', 'Kahan', 'Mawand Sharif', 'Sangsila', 'Loti', 'Dera Bugti Sharif', 'Rojhan Jamali', 'Sohbatpur Sharif', 'Gandakha Sharif', 'Manjhipur',
  'Dera Allahyar Sharif', 'Nal Sharif', 'Wadh Sharif', 'Gresha', 'Moola', 'Bagbana', 'Ornach', 'Jhal Sharif', 'Magsi Sharif', 'Gandawah Sharif',
  'Mirpur Sharif', 'Mach Cantt', 'Dhadar Sharif', 'Abegum', 'Chaman Cantt', 'Killa Abdullah Sharif', 'Gulistan Sharif', 'Dobandi', 'Kanak', 'Mastung Cantt',
  'Nushki Cantt', 'Kharan Sharif', 'Washuk Sharif', 'Dalbandin Cantt', 'Taftan Border', 'Nok Kundi Border', 'Panjgur Cantt', 'Turbat Cantt', 'Kech Sharif', 'Pasni Port',

  // --- Azad Jammu & Kashmir (AJK) ---
  'Muzaffarabad', 'Mirpur', 'Bhimber', 'Kotli', 'Rawalakot', 'Bagh', 'Pallandri', 'Sudhanoti', 'Hattian Bala', 'Haveli',
  'Kahuta (AJK)', 'Athmuqam', 'Neelum Valley', 'Sharda', 'Kel', 'Garhi Dupatta', 'Patika', 'Chikar', 'Chinari', 'Dhirkot',
  'Hari Ghel', 'Forward Kahuta', 'Hajira', 'Thorar', 'Mong', 'Hujra (AJK)', 'Charhoi', 'Nakyal', 'Sehnsa', 'Kuiratta',
  'Dulail', 'Islamgarh', 'Dadyal', 'Mangla', 'New Mirpur City', 'Afzalpur', 'Jatlan', 'Barnala', 'Samahni', 'Arja',
  'Rehra', 'Rawalakot City', 'Khaigala', 'Tain', 'Singola', 'Chotagala', 'Banjosa', 'Goyain', 'Abbaspur', 'Hajira Sharif',
  'Madarpur', 'Thorar Sharif', 'Palandri City', 'Tarar Khel', 'Ellan', 'Qila Darhal', 'Sarsawa', 'Sehnsa City', 'Nakyal City', 'Charhoi City',
  'Khuiratta City', 'Dulail City', 'Dadyal City', 'Islamgarh City', 'Mangla Hamlet', 'Jatlan City', 'Afzalpur City', 'Samahni Valley', 'Barnala Valley', 'Kadala',
  'Hattian Bala City', 'Chinari City', 'Chikar City', 'Garhi Dupatta City', 'Patika City', 'Athmuqam City', 'Kundal Shahi', 'Kutton', 'Keran', 'Sharda Valley',

  // --- Gilgit-Baltistan (GB) ---
  'Gilgit', 'Skardu', 'Hunza', 'Karimabad', 'Aliabad', 'Gupis', 'Gahkuch', 'Ghizer', 'Singal', 'Phander',
  'Chilas', 'Diamer', 'Tangir', 'Darel', 'Astore', 'Gorikot', 'Bunji', 'Khaplu', 'Ghanche', 'Shigar',
  'Rondu', 'Roundu', 'Nagar', 'Minapin', 'Yal', 'Ishkoman', 'Yasin', 'Sost', 'Passu', 'Gulmit',
  'Shimshal', 'Gojal', 'Naltar', 'Bagrot', 'Danyore', 'Jalalabad (GB)', 'Juglot', 'Chalt', 'Sikandarabad', 'Hoper',
  'Thol', 'Gulmit Gojal', 'Gahkuch Valley', 'Chatorkhand', 'Ishkoman Valley', 'Yasin Valley', 'Gupis Valley', 'Phander Valley', 'Teru', 'Shandur',
  'Chilas City', 'Babusar', 'Babusar Top', 'Tangir Valley', 'Darel Valley', 'Astore Valley', 'Trashing', 'Rupal', 'Gorikot Valley', 'Bunji Valley',
  'Skardu City', 'Shigar Valley', 'Khaplu Valley', 'Machulo', 'Haldi', 'Thalley', 'Hushe', 'Keris', 'Gamba', 'Rondu Valley'
].sort();
