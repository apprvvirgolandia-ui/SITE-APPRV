/**
 * Configurações globais do site
 */
export const siteConfig = {
  name: "Associação dos Pequenos Produtores Rurais de Virgolândia",
  shortName: "APPRV",
  cnpj: "21.080.999/0001-04",
  foundationDate: "02/06/1982",
  address: "Avenida Sinfrônio Pedro de Andrade, 180, Centro, Virgolândia - MG, CEP 39715-000",
  phone: "(33) 99927-5984",
  whatsapp: "5533999275984",
  email: "apprvvirgolandia@outlook.com",
  facebook: "https://facebook.com/apprv",
  instagram: "https://instagram.com/apprv",
  googleMapsUrl: "https://maps.google.com/maps?q=Avenida%20Sinfr%C3%B4nio%20Pedro%20de%20Andrade,%20180,%20Centro,%20Virgol%C3%A2ndia%20-%20MG&t=&z=17&ie=UTF8&iwloc=&output=embed",
  
  // Para mudar a logo futuramente, basta adicionar a URL da imagem aqui.
  // Se deixado como null ou undefined, o site usará a logo em SVG (vetorial).
  // Logomarcas
  logoUrl: "https://storage.googleapis.com/birdseye-public/files/c7675b07-b3fe-40e5-b983-a238c8a540dc/0.png", // Logo Principal APPRV
  pulpLogoUrl: "https://storage.googleapis.com/birdseye-public/files/c7675b07-b3fe-40e5-b983-a238c8a540dc/1.png", // Segunda Logo: Virgo Fruit (Polpas)
  pulpLogoSecondaryUrl: "https://storage.googleapis.com/birdseye-public/files/c7675b07-b3fe-40e5-b983-a238c8a540dc/1.png", // Segunda Logo de Polpas (Opcional)
  pulpLogoCircularUrl: "https://storage.googleapis.com/birdseye-public/files/c7675b07-b3fe-40e5-b983-a238c8a540dc/2.png",
  partnerLogoUrl: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&q=80&w=200&h=200", // Terceira Logo: Parceria (Opcional)
  
  // Lista de Produtos (Polpas)
  products: [
    { 
      id: "1",
      name: "Polpa de Acerola", 
      desc: "Rica em vitamina C, produzida com frutas selecionadas.",
      fruitImageUrl: "https://images.unsplash.com/photo-1615485240384-552e4c4f93d4?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1595981267035-7b04ca84a810?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "2",
      name: "Polpa de Maracujá", 
      desc: "Sabor intenso e natural, ideal para sucos e sobremesas.",
      fruitImageUrl: "https://images.unsplash.com/photo-1534324403162-83956691461f?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1589733901241-5e391270dd0d?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "3",
      name: "Polpa de Manga", 
      desc: "Cremosa e doce, feita com as melhores mangas da região.",
      fruitImageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "4",
      name: "Polpa de Goiaba", 
      desc: "Sabor autêntico da fruta, sem conservantes.",
      fruitImageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "5",
      name: "Polpa de Graviola", 
      desc: "Sabor exótico e refrescante, colhida no ponto ideal.",
      fruitImageUrl: "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1543508282-5c1f427f023f?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "6",
      name: "Polpa de Jabuticaba", 
      desc: "O verdadeiro sabor da fruta silvestre, rica em antioxidantes.",
      fruitImageUrl: "https://images.unsplash.com/photo-1591238372731-d7208eb9d2ec?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: "7",
      name: "Polpa de Abacaxi", 
      desc: "O frescor do abacaxi colhido no ponto certo.",
      fruitImageUrl: "https://images.unsplash.com/photo-1550258114-b09a8a36a51e?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1525385133335-842822916523?auto=format&fit=crop&q=80&w=400"
    }
  ],

  // Loja do Associado (Produtos Diversos)
  storeProducts: [
    {
      id: "s1",
      name: "Mel Silvestre",
      desc: "Mel 100% puro, colhido nas matas da região de Virgolândia.",
      fruitImageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "s2",
      name: "Queijo Minas Artesanal",
      desc: "Produzido com leite fresco de vacas criadas a pasto.",
      fruitImageUrl: "https://images.unsplash.com/photo-1485954090184-e2afd6958d4a?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1624806994891-7c20370d3001?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "s3",
      name: "Café Torrado e Moído",
      desc: "Café de altitude, colhido e processado manualmente.",
      fruitImageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400",
      pulpImageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400"
    }
  ],
  
  // Notícias e Eventos
  news: [
    {
      id: "1",
      date: "15 Abr, 2026",
      title: "Assembleia Geral Ordinária",
      category: "Reunião",
      desc: "Convocamos todos os associados para a assembleia de prestação de contas e planejamento para o próximo semestre.",
      location: "Sede da Associação"
    },
    {
      id: "2",
      date: "10 Abr, 2026",
      title: "Treinamento: Manejo Orgânico de Frutas",
      category: "Capacitação",
      desc: "Curso prático sobre técnicas de cultivo sem agrotóxicos para melhorar a qualidade das polpas produzidas.",
      location: "Auditório Municipal"
    },
    {
      id: "3",
      date: "05 Abr, 2026",
      title: "Inauguração do Novo Maquinário da Fábrica",
      category: "Evento",
      desc: "Celebração da chegada das novas despolpadeiras que aumentarão nossa capacidade produtiva em 30%.",
      location: "Fábrica de Polpas"
    }
  ]
};
