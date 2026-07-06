export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number; // Para itens em promoção
  stock: number;
  status: 'Disponível' | 'Poucas Unidades' | 'Esgotado';
  description: string;
  usage: string;
  imageUrl: string;
  promotionValidUntil?: string; // Validade da promoção se aplicável
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'Rações', name: 'Rações', iconName: 'Beef', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'Medicamentos', name: 'Medicamentos', iconName: 'Pill', color: 'bg-red-100 text-red-800 border-red-200' },
  { id: 'Sementes', name: 'Sementes', iconName: 'Sprout', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'Fertilizantes', name: 'Fertilizantes', iconName: 'Leaf', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'Ferramentas', name: 'Ferramentas', iconName: 'Wrench', color: 'bg-stone-100 text-stone-800 border-stone-200' },
  { id: 'Pet', name: 'Pet', iconName: 'Dog', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'Irrigação', name: 'Irrigação', iconName: 'Droplet', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { id: 'Jardinagem', name: 'Jardinagem', iconName: 'Flower', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

// Helper para gerar um SVG embutido estético como placeholder premium de imagem do produto
const generateProductSvg = (category: string, bgGradientStart: string, bgGradientEnd: string, label: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <defs>
      <linearGradient id="grad-${label.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgGradientStart};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${bgGradientEnd};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad-${label.replace(/\s+/g, '')})" />
    <circle cx="200" cy="130" r="60" fill="white" fill-opacity="0.15" />
    <text x="200" y="145" font-family="'Outfit', 'Inter', sans-serif" font-size="52" font-weight="bold" fill="white" text-anchor="middle" fill-opacity="0.85">${label.substring(0, 2).toUpperCase()}</text>
    <text x="200" y="240" font-family="'Outfit', 'Inter', sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle" fill-opacity="0.9">${category}</text>
    <rect x="150" y="260" width="100" height="4" rx="2" fill="white" fill-opacity="0.5" />
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const PRODUCTS: Product[] = [
  // Rações
  {
    id: 'rac-01',
    name: 'Ração Bovinos de Corte Cooperativa Agro 40kg',
    category: 'Rações',
    brand: 'ForteCampo',
    price: 98.90,
    stock: 25,
    status: 'Disponível',
    description: 'Ração balanceada para bovinos de corte em fase de engorda e terminação. Formulado com minerais essenciais e alta palatabilidade, garantindo ganho de peso rápido e saudável.',
    usage: 'Fornecer diariamente no cocho, puro ou misturado ao volumoso, preferencialmente 1% a 1.5% do peso vivo do animal.',
    imageUrl: generateProductSvg('Rações', '#1B5E20', '#4CAF50', 'RC')
  },
  {
    id: 'rac-02',
    name: 'Ração Premium Cães Adultos Raças Grandes 15kg',
    category: 'Rações',
    brand: 'NutriPet',
    price: 149.90,
    originalPrice: 179.90,
    stock: 12,
    status: 'Disponível',
    description: 'Alimento completo e nutritivo para cães adultos de médio e grande porte. Auxilia na saúde intestinal, articulações fortes e pelagem brilhante.',
    usage: 'Servir a quantidade recomendada na embalagem dividida em 2 a 3 refeições diárias.',
    imageUrl: generateProductSvg('Rações', '#2E7D32', '#81C784', 'RP'),
    promotionValidUntil: '15/07/2026'
  },
  {
    id: 'rac-03',
    name: 'Ração Postura aves poedeiras Focada 20kg',
    category: 'Rações',
    brand: 'ForteCampo',
    price: 64.00,
    stock: 3,
    status: 'Poucas Unidades',
    description: 'Ração triturada de alta qualidade para galinhas poedeiras. Rica em cálcio e fósforo para cascas de ovos mais fortes e postura constante.',
    usage: 'Fornecer à vontade para aves a partir de 18 semanas de idade.',
    imageUrl: generateProductSvg('Rações', '#1B5E20', '#81C784', 'RV')
  },

  // Medicamentos
  {
    id: 'med-01',
    name: 'Vermífugo Injetável Ivomec Gold 3.15% 50ml',
    category: 'Medicamentos',
    brand: 'Boehringer',
    price: 185.00,
    stock: 8,
    status: 'Disponível',
    description: 'Antiparasitário de amplo espectro para bovinos de ação prolongada. Combate nematódeos gastrointestinais e pulmonares, bernes e carrapatos de forma altamente eficaz.',
    usage: 'Aplicar via subcutânea na dose de 1 mL para cada 50 kg de peso vivo.',
    imageUrl: generateProductSvg('Medicamentos', '#B71C1C', '#EF5350', 'IV')
  },
  {
    id: 'med-02',
    name: 'Suplemento Vitamínico Monovin ADE 100ml',
    category: 'Medicamentos',
    brand: 'Bravet',
    price: 45.00,
    originalPrice: 55.00,
    stock: 15,
    status: 'Disponível',
    description: 'Fonte concentrada de Vitaminas A, D e E. Previne e trata carências vitamínicas que causam raquitismo, cegueira noturna e distúrbios reprodutivos em bovinos, equinos e ovinos.',
    usage: 'Administrar por via intramuscular profunda conforme orientação de peso por espécie na bula.',
    imageUrl: generateProductSvg('Medicamentos', '#C62828', '#E57373', 'AD'),
    promotionValidUntil: '20/07/2026'
  },

  // Sementes
  {
    id: 'sem-01',
    name: 'Sementes de Milho Híbrido DKB 390 PRO3 (60 mil sem)',
    category: 'Sementes',
    brand: 'Dekalb',
    price: 680.00,
    stock: 6,
    status: 'Disponível',
    description: 'Híbrido de altíssima produtividade para produção de grãos e silagem. Tecnologia PRO3 com excelente tolerância à lagarta do cartucho e broca do colmo.',
    usage: 'Recomendado para plantio na safra e safrinha em solos de média a alta fertilidade.',
    imageUrl: generateProductSvg('Sementes', '#E65100', '#FFB74D', 'MH')
  },
  {
    id: 'sem-02',
    name: 'Sementes de Capim Brachiaria Decumbens 20kg VC 50',
    category: 'Sementes',
    brand: 'AgroSemear',
    price: 240.00,
    originalPrice: 280.00,
    stock: 30,
    status: 'Disponível',
    description: 'Sementes de capim Brachiaria Decumbens de alta pureza. Excelente adaptabilidade a solos ácidos e arenosos, muito resistente ao pisoteio e com rápido fechamento.',
    usage: 'Semear a lanço ou em linha em solo bem preparado na profundidade de 2 a 4 cm no início das chuvas.',
    imageUrl: generateProductSvg('Sementes', '#F57C00', '#FFE082', 'BD'),
    promotionValidUntil: '12/07/2026'
  },

  // Fertilizantes
  {
    id: 'fer-01',
    name: 'Adubo NPK 10-10-10 FertiCampo Granulado 50kg',
    category: 'Fertilizantes',
    brand: 'FertiCampo',
    price: 125.00,
    stock: 40,
    status: 'Disponível',
    description: 'Fertilizante mineral misto completo com proporção equilibrada de Nitrogênio, Fósforo e Potássio. Ideal para plantio e manutenção de pastagens, lavouras e pomares.',
    usage: 'Aplicar ao redor da projeção da copa das plantas ou em linha na semeadura de acordo com a análise do solo.',
    imageUrl: generateProductSvg('Fertilizantes', '#004D40', '#4DB6AC', 'NP')
  },
  {
    id: 'fer-02',
    name: 'Calcário Agrícola Dolomítico Moído Sacaria 50kg',
    category: 'Fertilizantes',
    brand: 'CalTerra',
    price: 35.00,
    stock: 0,
    status: 'Esgotado',
    description: 'Corretivo de acidez do solo que fornece Cálcio e Magnésio. Aumenta a eficiência dos adubos e estimula o desenvolvimento radicular das culturas agrícolas.',
    usage: 'Distribuir uniformemente sobre o solo e incorporar na camada de 0 a 20 cm meses antes do plantio.',
    imageUrl: generateProductSvg('Fertilizantes', '#00796B', '#80CBC4', 'CA')
  },

  // Ferramentas
  {
    id: 'tool-01',
    name: 'Enxada Larga Tramontina Forjada sem Cabo 2.5',
    category: 'Ferramentas',
    brand: 'Tramontina',
    price: 54.90,
    stock: 14,
    status: 'Disponível',
    description: 'Enxada em aço carbono forjado de alta resistência. Gume temperado com excelente durabilidade do fio, ideal para capina, abertura de valas e revolvimento de solo.',
    usage: 'Instalar cabo de madeira de qualidade com fixação por cunha metálica bem ajustada.',
    imageUrl: generateProductSvg('Ferramentas', '#3E2723', '#8D6E63', 'EX')
  },
  {
    id: 'tool-02',
    name: 'Tesoura de Poda Bypass Profissional Corneta',
    category: 'Ferramentas',
    brand: 'Corneta',
    price: 79.90,
    originalPrice: 95.00,
    stock: 9,
    status: 'Disponível',
    description: 'Tesoura de poda Bypass com lâminas em aço carbono forjado e cabos emborrachados ergonômicos. Corte limpo e preciso sem danificar os galhos das plantas.',
    usage: 'Uso indicado para galhos verdes de até 20 mm de diâmetro. Limpar e lubrificar após o uso.',
    imageUrl: generateProductSvg('Ferramentas', '#4E342E', '#A1887F', 'TP'),
    promotionValidUntil: '18/07/2026'
  },

  // Pet
  {
    id: 'pet-01',
    name: 'Coleira Antipulgas e Carrapatos Seresto Cães >8kg',
    category: 'Pet',
    brand: 'Elanco',
    price: 229.00,
    stock: 22,
    status: 'Disponível',
    description: 'Coleira antiparasitária com duração de até 8 meses de proteção. Combate pulgas, carrapatos e é repelente contra o mosquito transmissor da Leishmaniose.',
    usage: 'Colocar ao redor do pescoço do cão sem deixar apertado, cortando a sobra de coleira.',
    imageUrl: generateProductSvg('Pet', '#0D47A1', '#42A5F5', 'SR')
  },
  {
    id: 'pet-02',
    name: 'Alimento Úmido Sachê Whiskas Gatos 85g Leve 12',
    category: 'Pet',
    brand: 'Mars',
    price: 36.90,
    stock: 4,
    status: 'Poucas Unidades',
    description: 'Kit com 12 sachês de alimento úmido Whiskas sabor Carne ao Molho. Delicioso e suculento, fornece água adicional na dieta ajudando na saúde renal dos gatos.',
    usage: 'Servir fresco no prato. Gatos adultos consomem cerca de 2 a 3 sachês por dia.',
    imageUrl: generateProductSvg('Pet', '#1565C0', '#90CAF9', 'WH')
  },

  // Irrigação
  {
    id: 'irr-01',
    name: 'Aspersor de Impacto Latão Setorial 1/2 Tigre',
    category: 'Irrigação',
    brand: 'Tigre',
    price: 42.50,
    stock: 18,
    status: 'Disponível',
    description: 'Aspersor rotativo setorial durável in liga de latão. Permite regulagem do ângulo de irrigação (30° a 360°) e distância do jato, cobrindo grandes áreas de plantio.',
    usage: 'Rosquear em haste metálica ou suporte de irrigação conectado à mangueira sob pressão de água recomendada.',
    imageUrl: generateProductSvg('Irrigação', '#01579B', '#4FC3F7', 'AS')
  },
  {
    id: 'irr-02',
    name: 'Mangueira Santeno Gotejamento I 100m com Conectores',
    category: 'Irrigação',
    brand: 'Santeno',
    price: 115.00,
    originalPrice: 135.00,
    stock: 5,
    status: 'Disponível',
    description: 'Mangueira plana de microaspersão/gotejamento de fácil instalação. Projetada para irrigação rente ao solo com raio de alcance uniforme e baixo consumo de energia.',
    usage: 'Esticar sobre a linha de cultivo e conectar à rede de água principal com pressão de serviço de até 0.8 bar.',
    imageUrl: generateProductSvg('Irrigação', '#0288D1', '#81D4FA', 'MS'),
    promotionValidUntil: '22/07/2026'
  },

  // Jardinagem
  {
    id: 'jar-01',
    name: 'Substrato Orgânico Turbinado Premium Horta 20kg',
    category: 'Jardinagem',
    brand: 'VerdeVida',
    price: 29.90,
    stock: 35,
    status: 'Disponível',
    description: 'Substrato orgânico rico em húmus de minhoca, casca de pinus compostada e nutrientes de liberação lenta. Ideal para hortas caseiras, flores e plantas ornamentais.',
    usage: 'Preencher vasos ou canteiros antes do plantio, regando bem logo em seguida.',
    imageUrl: generateProductSvg('Jardinagem', '#4A148C', '#AB47BC', 'SB')
  },
  {
    id: 'jar-02',
    name: 'Regador de Metal Galvanizado Vintage 5 Litros',
    category: 'Jardinagem',
    brand: 'VerdeVida',
    price: 89.00,
    originalPrice: 110.00,
    stock: 7,
    status: 'Disponível',
    description: 'Regador metálico elegante com bico chuveiro removível. Construído em aço galvanizado anticorrosão, muito resistente e com design vintage para decoração e uso diário.',
    usage: 'Abastecer com água e regar suavemente as plantas usando o chuveiro para mudas sensíveis.',
    imageUrl: generateProductSvg('Jardinagem', '#6A1B9A', '#CE93D8', 'RG'),
    promotionValidUntil: '14/07/2026'
  }
];

// Banner promocionais na Home
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  colorClass: string;
  buttonText: string;
  targetCategory?: string;
}

export const HOME_BANNERS: Banner[] = [
  {
    id: 'b-01',
    title: 'Semana da Lavoura',
    subtitle: 'Ofertas em adubos e sementes selecionadas',
    discount: 'Até 25% OFF',
    colorClass: 'from-emerald-800 to-green-700 text-white',
    buttonText: 'Aproveitar',
    targetCategory: 'Sementes'
  },
  {
    id: 'b-02',
    title: 'Saúde Animal Completa',
    subtitle: 'Medicamentos e suplementos para o seu rebanho',
    discount: 'Preços Imperdíveis',
    colorClass: 'from-red-800 to-amber-700 text-white',
    buttonText: 'Ver Linha Vet',
    targetCategory: 'Medicamentos'
  },
  {
    id: 'b-03',
    title: 'Horta e Jardim Lindos',
    subtitle: 'Ferramentas e substratos com descontos especiais',
    discount: '15% de Desconto',
    colorClass: 'from-purple-800 to-rose-700 text-white',
    buttonText: 'Confira',
    targetCategory: 'Jardinagem'
  }
];
