export interface PathologyTopic {
  id: string;
  title: string;
  description: string;
  videoCount: number;
  estimatedDuration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoPath: string;
}

export const pathologyTopics: PathologyTopic[] = [
  {
    id: '1',
    title: 'Growth Adaptations & Cellular Injury and Cell Death',
    description: 'Foundation concepts of cellular adaptation, injury mechanisms, and cell death pathways',
    videoCount: 5,
    estimatedDuration: '2h 15m',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    videoPath: '/videos/01 - Growth Adaptations & Cellular Injury and Cell Death/1.1 Growth Adaptations.mp4'

  },
  {
    id: '2',
    title: 'Inflammation & Inflammatory Disorders and Healing',
    description: 'Acute and chronic inflammatory processes, wound healing, and tissue repair mechanisms',
    videoCount: 8,
    estimatedDuration: '3h 20m',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    videoPath: '/videos/02 - Inflammation & Inflammatory Disorders and Healing/2.1a Acute Inflammation.mp4'
  },
  {
    id: '3',
    title: 'Principles of Neoplasia',
    description: 'Benign and malignant tumors, cancer biology, oncogenes, and tumor suppressor genes',
    videoCount: 6,
    estimatedDuration: '4h 10m',
    category: 'Fundamentals',
    difficulty: 'Intermediate',
    videoPath: '/videos/03 - Principles of Neoplasia/3.1 Neoplasia.mp4'
  },
  {
    id: '4',
    title: 'Hemostasis and Related Disorders',
    description: 'Coagulation cascade, platelet function, bleeding disorders, and thrombotic diseases',
    videoCount: 5,
    estimatedDuration: '2h 45m',
    category: 'Hematology',
    difficulty: 'Intermediate',
    videoPath: '/videos/04 - Hemostasis and Related Disorders/4.1 Primary Hemostasis.mp4'
  },
  {
    id: '5',
    title: 'Red Blood Cell Disorders',
    description: 'Anemia classification, hemoglobinopathies, and red blood cell pathology',
    videoCount: 8,
    estimatedDuration: '4h 30m',
    category: 'Hematology',
    difficulty: 'Intermediate',
    videoPath: '/videos/05 - Red Blood Cell Disorders/5.1 Anemia.mp4'
  },
  {
    id: '6',
    title: 'White Blood Cell Disorders',
    description: 'Leukemias, lymphomas, and white blood cell neoplasms and reactive disorders',
    videoCount: 6,
    estimatedDuration: '6h 15m',
    category: 'Hematology',
    difficulty: 'Advanced',
    videoPath: '/videos/06 - White Blood Cell Disorders/6.1 Leukopenia and Leukocytosis.mp4'
  },
  {
    id: '7',
    title: 'Vascular Pathology',
    description: 'Atherosclerosis, hypertension, vasculitis, and peripheral vascular diseases',
    videoCount: 5,
    estimatedDuration: '4h 0m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/07 - Vascular Pathology/7.1 Vasculitis.mp4'
  },
  {
    id: '8',
    title: 'Cardiac Pathology',
    description: 'Congenital heart disease, ischemic heart disease, cardiomyopathies, and valvular disease',
    videoCount: 6,
    estimatedDuration: '5h 30m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/08 - Cardiac Pathology/8.1 Ischemic Heart Disease.mp4'
  },
  {
    id: '9',
    title: 'Respiratory Tract Pathology',
    description: 'Pulmonary infections, COPD, asthma, interstitial lung disease, and lung cancers',
    videoCount: 7,
    estimatedDuration: '6h 45m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/09 - Respiratory Tract Pathology/9.1 _ 9.2 Nasopharynx _ Larynx.mp4'
  },
  {
    id: '10',
    title: 'Gastrointestinal Pathology',
    description: 'GI tract disorders, inflammatory bowel disease, and gastrointestinal neoplasms',
    videoCount: 8,
    estimatedDuration: '6h 0m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/10 -Gastrointestinal Pathology/10.1 Oral Cavity.mp4'
  },
  {
    id: '11',
    title: 'Exocrine Pancreas, Gallbladder, and Liver Pathology',
    description: 'Hepatitis, cirrhosis, pancreatic disorders, and biliary tract pathology',
    videoCount: 5,
    estimatedDuration: '5h 20m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/11 - Exocrine Pancreas, Gallbladder, and Liver Pathology/11.1 Exocrine Pancreas.mp4'
  },
  {
    id: '12',
    title: 'Kidney and Urinary Tract Pathology',
    description: 'Glomerular diseases, tubular disorders, kidney stones, and urinary tract pathology',
    videoCount: 7,
    estimatedDuration: '5h 45m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/12 - Kidney and Urinary Tract Pathology/12.1 Congenital.mp4'
  },
  {
    id: '13',
    title: 'Female Genital System and Gestational Pathology',
    description: 'Gynecologic disorders, cervical pathology, pregnancy-related conditions, and complications',
    videoCount: 7,
    estimatedDuration: '5h 10m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/13 - Female Genital System and Gestational Pathology/13.1 Vulva.mp4'
  },
  {
    id: '14',
    title: 'Male Genital System Pathology',
    description: 'Prostate disorders, testicular pathology, and male reproductive system diseases',
    videoCount: 4,
    estimatedDuration: '3h 30m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/14 - Male Genital System Pathology/14.1 Penis.mp4'
  },
  {
    id: '15',
    title: 'Endocrine Pathology',
    description: 'Diabetes, thyroid disorders, adrenal pathology, and pituitary diseases',
    videoCount: 5,
    estimatedDuration: '5h 0m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/15 - Endocrine Pathology/15.1 _ 15.2 Anterior Pituitary Gland _ Posterior Pituitary Gland.mp4'
  },
  {
    id: '16',
    title: 'Breast Pathology',
    description: 'Breast cancer, benign breast disease, and inflammatory breast conditions',
    videoCount: 4,
    estimatedDuration: '3h 45m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/16 - Breast Pathology/16.1 Breast Pathology Introduction.mp4'
  },
  {
    id: '17',
    title: 'Central Nervous System Pathology',
    description: 'CNS infections, brain tumors, degenerative diseases, stroke, and demyelinating disorders',
    videoCount: 7,
    estimatedDuration: '7h 15m',
    category: 'Systems',
    difficulty: 'Advanced',
    videoPath: '/videos/17 - Central Nervous System Pathology/17.1 Developmental Anomalies.mp4'
  },
  {
    id: '18',
    title: 'Musculoskeletal Pathology',
    description: 'Bone disorders, arthritis, soft tissue tumors, and musculoskeletal infections',
    videoCount: 4,
    estimatedDuration: '3h 45m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/18 - Musculoskeletal Pathology/18.1 Skeletal System.mp4'
  },
  {
    id: '19',
    title: 'Skin Pathology',
    description: 'Dermatologic conditions, skin cancers, inflammatory skin disorders, and infections',
    videoCount: 5,
    estimatedDuration: '4h 25m',
    category: 'Systems',
    difficulty: 'Intermediate',
    videoPath: '/videos/19 - Skin Pathology/19.1 Inflammatory Dermatoses.mp4'
  }
];

export const featuredTopics = pathologyTopics.slice(0, 6);