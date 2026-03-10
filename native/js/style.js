document.addEventListener("DOMContentLoaded", function(){

const translations = {

en:{
home:"Home",
about:"About",
companies:"Companies",
team:"Team",
contact:"Contact",
cta:"Get in Touch",

heroBadge:"Official Gyeonggi Province Representative",
heroTitle:"Bridging Korean Excellence to Indonesia",
heroDesc:"We connect innovative Korean SMEs from Gyeonggi Province with Indonesian market opportunities through strategic partnerships and business facilitation.",
directConnections:"Direct Connection to Korean Companies",
indonesiaReady:"Indonesia Ready",
explore:"Explore Companies",
learn:"Learn More",

aboutLabel:"About Us",
aboutTitle:"Your Gateway to Korean Innovation",

contactLabel:"Contact Us",
contactTitle:"Let's Build Partnership Together",

sendMessage:"Send us a Message",
sendBtn:"Send Message",

partnerCompanies:"Partner Companies",
industrySectors:"Industry Sectors",
businessMatches:"Business Matches",
established:"Established",

aboutDescription:"GBC Jakarta (Gyeonggi Business Center Jakarta) is a non-profit organization established under the Gyeonggi Provincial Government of the Republic of Korea.",
aboutDescription2:"We function as a business support platform to help companies based in Gyeonggi expand their market presence in Indonesia through business matching, market entry support, trade promotion, and partnership development.",
marketResearch:"Market Research",
businessMatching:"Business Matching",
legalSupport:"Legal Support",
tradePromotion:"Promotion",
IndepthIndonesianmarketanalysis:"In-depth Indonesian market analysis",
connectWithLocalDistributors:"Connect with local distributors",
businessRegistrationGuidance:"Business registration guidance",
tradeShowsExhibitions:"Trade shows & exhibitions",

featured:"Featured Korean Companies",
discover:"Discover innovative products and services from Gyeonggi Province's leading SMEs",
all:"All",
industrial:"Industrial",
safetyEnvironment:"Safety & Environment",
beautyLifestyle:"Beauty & Lifestyle",
agriculture:"Agriculture",
fb:"F&B",
industrialEquipment:"Industrial Equipment",
leading:"Leading Korean manufacturer of high-quality fans, blowers, and motors with 20+ years of export experience.",
viewDetails:"View Details",
safetyEnvironment:"Safety & Environment",
safetyDescription:"Gas detectors designed for safety in hazardous environments with real-time monitoring capabilities.",
ecoDescription:"Innovation in eco-friendly dining solutions with recyclable and biodegradable collagen trays.",
lifestyle:"Lifestyle",
lifestyleDescription:"Premium silicone products from kitchenware to kidsware with award-winning design.",
industrialDescription:"Eco-friendly waterproofing solution with excellent adhesion, flexibility, and crack-bridging.",
viewAllCompanies:"View All 40+ Companies",

ourTeam:"Our Team",
teamTitle:"Meet the People Behind GBC Jakarta",


contactDescription:"Ready to explore the Indonesian market? Get in touch with our team and discover how we can help your business grow.",
officeAddress:"Office Address",


formName:"Your Name",
formEmail:"Email Address",
formCompany:"Company",
formMessage:"Message",

gyeonggi:"Gyeonggi Business Center Jakarta - Your trusted partner for Korean-Indonesian business collaboration.",



},

id:{

//navbar
home:"Beranda",
about:"Tentang",
companies:"Perusahaan",
team:"Tim",
contact:"Kontak",
cta:"Hubungi Kami",

//hero
heroBadge:"Perwakilan Resmi Provinsi Gyeonggi",
heroTitle:"Menjembatani Keunggulan Korea ke Indonesia",
heroDesc:"Kami menghubungkan UKM inovatif Korea dari Provinsi Gyeonggi dengan peluang pasar Indonesia melalui kemitraan strategis.",
explore:"Lihat Perusahaan",
learn:"Pelajari Lebih Lanjut",
directConnections:"Koneksi Langsung dengan Perusahaan Korea",
indonesiaReady:"Siap untuk Indonesia",

//about
aboutLabel:"Tentang Kami",
aboutTitle:"Gerbang Anda Menuju Inovasi Korea",
aboutDescription:"GBC Jakarta (Gyeonggi Business Center Jakarta) adalah organisasi nirlaba yang didirikan di bawah Pemerintah Provinsi Gyeonggi Republik Korea.",
aboutDescription2:"Kami berfungsi sebagai platform pendukung bisnis untuk membantu perusahaan-perusahaan yang berbasis di Gyeonggi dalam memperluas kehadiran pasar mereka di Indonesia melalui pencocokan bisnis, dukungan masuk pasar, promosi perdagangan, dan pengembangan kemitraan.",
marketResearch:"Riset Pasar",
businessMatching:"Pencocokan Bisnis",
tradePromotion:"Promosi Perdagangan",
partnerships:"Kemitraan",
IndepthIndonesianmarketanalysis:"Analisis Pasar Indonesia Mendalam",
connectWithLocalDistributors:"Terhubung dengan distributor lokal",
businessRegistrationGuidance:"Panduan Pendaftaran Bisnis",
tradeShowsExhibitions:"Pameran dan Pameran Perdagangan",

featured:"Perusahaan Korea Unggulan",
discover:"Temukan produk dan layanan inovatif dari UKM terkemuka Provinsi Gyeonggi",
all:"Semua",
industrial:"Industri",
safetyEnvironment:"Keselamatan & Lingkungan",
beautyLifestyle:"Kecantikan & Gaya Hidup",
agriculture:"Pertanian",
fb:"Makanan & Minuman",
industrialEquipment:"Peralatan Industri",
leading:"Produsen Korea terkemuka untuk kipas, blower, dan motor berkualitas tinggi dengan pengalaman ekspor lebih dari 20 tahun.",
viewDetails:"Lihat Detail",
safetyEnvironment:"Keselamatan & Lingkungan",
safetyDescription:"Detektor gas dirancang untuk keselamatan di lingkungan berbahaya dengan kemampuan pemantauan waktu nyata.",
ecoDescription:"Inovasi dalam solusi makan ramah lingkungan dengan baki kolagen yang dapat didaur ulang dan terbiodegradasi.",
lifestyle:"Gaya Hidup",
lifestyleDescription:"Produk silikon premium dari peralatan dapur hingga perlengkapan anak dengan desain pemenang penghargaan.",
industrialDescription:"Solusi tahan air ramah lingkungan dengan daya rekat, fleksibilitas, dan jembatan retak yang sangat baik.",
viewAllCompanies:"Lihat Semua 40+ Perusahaan",

ourTeam:"Tim Kami",
teamTitle:"Tim di Balik GBC Jakarta",

contactLabel:"Kontak Kami",
contactTitle:"Mari Bangun Kemitraan Bersama",
contactDescription:"Siap menjelajahi pasar Indonesia? Hubungi tim kami dan temukan bagaimana kami dapat membantu bisnis Anda tumbuh.",
officeAddress:"Alamat Kantor",
sendMessage:"Kirim Pesan",


sendMessage:"Kirim Pesan",
sendBtn:"Kirim Pesan",

partnerCompanies:"Perusahaan Mitra",
industrySectors:"Sektor Industri",
businessMatches:"Kerja Sama Bisnis",
established:"Didirikan",

formName:"Nama Anda",
formEmail:"Alamat Email",
formCompany:"Perusahaan",
formMessage:"Pesan",

gyeonggi:"Gyeonggi Business Center Jakarta - Mitra terpercaya Anda untuk kolaborasi bisnis Korea-Indonesia."
}

};

const buttons=document.querySelectorAll(".lang-btn");

buttons.forEach(btn=>{
btn.addEventListener("click",()=>{

let lang=btn.dataset.lang;

buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

document.querySelectorAll("[data-i18n]").forEach(el=>{

let key=el.getAttribute("data-i18n");

if(translations[lang][key]){
el.textContent=translations[lang][key];
}

});

});
});

});