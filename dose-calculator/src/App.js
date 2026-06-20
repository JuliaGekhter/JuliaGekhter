import { useState, useMemo } from 'react';
import './App.css';

const DEFAULT_INPUTS = {
  targetMargin: 0.60,
  minLtvCac: 3.00,
  growthMode: 'SCALE',
  monthlyGrowthRate: 0.10,
  arpu: 150,
  churnRate: 0.05,
  startingCash: 50000,
  maxCac: 80,
};

const DEFAULT_SERVICES = [
  // Visits (2025 Rounded Self Pay prices)
  { name: 'New Patient Consultation', category: 'Visits', cost: 50, price: 311, priceInsurance: null, priceBcbs: null },
  { name: '1 Visit Per Month', category: 'Visits', cost: 40, price: 186, priceInsurance: null, priceBcbs: null },
  { name: 'Telehealth Visit', category: 'Visits', cost: 15, price: 99, priceInsurance: null, priceBcbs: null },
  { name: 'Additional Visit (same month)', category: 'Visits', cost: 30, price: 124, priceInsurance: null, priceBcbs: null },
  { name: '1 Visit Every 2 Months', category: 'Visits', cost: 40, price: 186, priceInsurance: null, priceBcbs: null },
  { name: '1 Visit Every 3-11 Months', category: 'Visits', cost: 40, price: 249, priceInsurance: null, priceBcbs: null },
  { name: 'Annual Wellness Visit', category: 'Visits', cost: 50, price: 311, priceInsurance: null, priceBcbs: null },
  // Bloodwork
  { name: 'Full Blood Panel', category: 'Bloodwork', cost: 130, price: 374, priceInsurance: null, priceBcbs: null },
  { name: 'Single Blood Test', category: 'Bloodwork', cost: 30, price: 81, priceInsurance: null, priceBcbs: null },
  { name: 'Additional Test (after single)', category: 'Bloodwork', cost: 20, price: 56, priceInsurance: null, priceBcbs: null },
  // Weight Loss (2025 Self Pay)
  { name: 'WL Level 1 - Maintenance (4 boxes)', category: 'Weight Loss', cost: 25, price: 186, priceInsurance: 129, priceBcbs: 99 },
  { name: 'WL Level 2 - Phentermine Only', category: 'Weight Loss', cost: 15, price: 275, priceInsurance: null, priceBcbs: null },
  { name: 'WL Level 3 - 8 boxes + phent', category: 'Weight Loss', cost: 47, price: 624, priceInsurance: 349, priceBcbs: 299 },
  { name: 'WL Level 4 - 16 boxes + phent', category: 'Weight Loss', cost: 92, price: 749, priceInsurance: 449, priceBcbs: 399 },
  { name: 'WL Level 5 - 24 boxes + 2 inj + phent', category: 'Weight Loss', cost: 146, price: 874, priceInsurance: 549, priceBcbs: 499 },
  { name: 'WL Level 6 - 32 boxes + 2 inj + phent', category: 'Weight Loss', cost: 191, price: 999, priceInsurance: 649, priceBcbs: 599 },
  // Semaglutide
  { name: 'Semaglutide - First 3 Months', category: 'Weight Loss', cost: 100, price: 374, priceInsurance: 299, priceBcbs: 299 },
  { name: 'Semaglutide - 3 Mo Upfront', category: 'Weight Loss', cost: 100, price: 299, priceInsurance: 299, priceBcbs: 299 },
  { name: 'Semaglutide - After 3 Months', category: 'Weight Loss', cost: 200, price: 686, priceInsurance: 299, priceBcbs: 299 },
  // Tirzepatide
  { name: 'Tirzepatide 2.5 mg', category: 'Weight Loss', cost: 150, price: 499, priceInsurance: 399, priceBcbs: 399 },
  { name: 'Tirzepatide 5 mg', category: 'Weight Loss', cost: 150, price: 499, priceInsurance: 399, priceBcbs: 399 },
  { name: 'Tirzepatide 7.5 mg', category: 'Weight Loss', cost: 180, price: 625, priceInsurance: 499, priceBcbs: 499 },
  { name: 'Tirzepatide 10-15 mg', category: 'Weight Loss', cost: 200, price: 960, priceInsurance: null, priceBcbs: 549 },
  // TRT
  { name: 'TRT - Every 2 Weeks', category: 'Hormones', cost: 11, price: 374, priceInsurance: 249, priceBcbs: 199 },
  { name: 'TRT - Every 10 Days', category: 'Hormones', cost: 11, price: 499, priceInsurance: 349, priceBcbs: 299 },
  { name: 'TRT - Weekly In Office', category: 'Hormones', cost: 14, price: 624, priceInsurance: 425, priceBcbs: 399 },
  { name: 'TRT - Weekly Take Home', category: 'Hormones', cost: 14, price: 499, priceInsurance: 399, priceBcbs: 399 },
  { name: 'HCG Vial - At Home Injections', category: 'Hormones', cost: 100, price: 825, priceInsurance: null, priceBcbs: null },
  { name: 'Clomid - Oral Medication', category: 'Hormones', cost: 47, price: 249, priceInsurance: 199, priceBcbs: 199 },
  // Sermorelin
  { name: 'Sermorelin - Up to 15mg', category: 'Hormones', cost: 115, price: 436, priceInsurance: null, priceBcbs: null },
  { name: 'Sermorelin - 21mg', category: 'Hormones', cost: 170, price: 685, priceInsurance: null, priceBcbs: null },
  { name: 'Sermorelin - 30mg', category: 'Hormones', cost: 229, price: 781, priceInsurance: null, priceBcbs: null },
  // Other Medications
  { name: 'Anastrozole', category: 'Hormones', cost: 10, price: 44, priceInsurance: null, priceBcbs: null },
  { name: 'Naltrexone (all doses)', category: 'Medications', cost: 25, price: 181, priceInsurance: null, priceBcbs: null },
  // BHRT Creams
  { name: 'Estradiol / Progesterone Cream', category: 'Hormones', cost: 78, price: 249, priceInsurance: 199, priceBcbs: 199 },
  { name: 'DHEA / Pregnenolone Cream', category: 'Hormones', cost: 78, price: 249, priceInsurance: 199, priceBcbs: 199 },
  { name: 'Testosterone Cream', category: 'Hormones', cost: 55, price: 249, priceInsurance: 199, priceBcbs: 199 },
  // Sexual Health
  { name: 'Sildenafil 20mg (90ct)', category: 'Sexual Health', cost: 20, price: 86, priceInsurance: 76, priceBcbs: 66 },
  { name: 'Sildenafil 50mg (30ct)', category: 'Sexual Health', cost: 20, price: 86, priceInsurance: 76, priceBcbs: 66 },
  { name: 'Sildenafil 100mg (30ct)', category: 'Sexual Health', cost: 33, price: 144, priceInsurance: 134, priceBcbs: 124 },
  { name: 'Tadalafil 5mg (30ct)', category: 'Sexual Health', cost: 9, price: 86, priceInsurance: 76, priceBcbs: 66 },
  { name: 'Tadalafil 6-19mg (30ct)', category: 'Sexual Health', cost: 35, price: 124, priceInsurance: 114, priceBcbs: 104 },
  { name: 'Tadalafil 20mg Fast Acting (30ct)', category: 'Sexual Health', cost: 21, price: 161, priceInsurance: 151, priceBcbs: 141 },
  { name: 'Tadalafil 25mg Time Released (30ct)', category: 'Sexual Health', cost: 50, price: 406, priceInsurance: 396, priceBcbs: 386 },
  { name: 'Arousal Cream M/F (30ml)', category: 'Sexual Health', cost: 55, price: 161, priceInsurance: null, priceBcbs: null },
  // Other Products
  { name: 'Finasteride 1.25mg (30ct)', category: 'Products', cost: 12, price: 74, priceInsurance: null, priceBcbs: null },
  { name: 'Hair Restore Cream', category: 'Products', cost: 50, price: 211, priceInsurance: null, priceBcbs: null },
  { name: 'Anti-Aging Gel Pump', category: 'Products', cost: 39, price: 174, priceInsurance: null, priceBcbs: null },
  { name: 'Ultra Anti-Aging Gel Cream', category: 'Products', cost: 56, price: 211, priceInsurance: null, priceBcbs: null },
  { name: 'Tretinoin Acne Cream', category: 'Products', cost: 30, price: 138, priceInsurance: null, priceBcbs: null },
];

const DEFAULT_CPT_CODES = [
  { cpt: '0358T', description: 'Weight Scale and Readings', fee: 30, newFee: 38 },
  { cpt: '11200', description: 'Skin Tag Removal', fee: 188, newFee: 235 },
  { cpt: '20610', description: 'Drain/Inject Joint/Bursa', fee: 154, newFee: 193 },
  { cpt: '36415', description: 'Routine Venipuncture', fee: 15, newFee: 19 },
  { cpt: '69210', description: 'Ear Irrigation', fee: 112, newFee: 140 },
  { cpt: '76536', description: 'Ultrasound of Thyroid', fee: 40, newFee: 50 },
  { cpt: '76700', description: 'Abdominal Ultrasound', fee: 304, newFee: 380 },
  { cpt: '80048', description: 'Basic Metabolic Panel', fee: 20, newFee: 25 },
  { cpt: '80050', description: 'Complete Metabolic Panel', fee: 71, newFee: 89 },
  { cpt: '80061', description: 'Lipid Panel', fee: 50, newFee: 63 },
  { cpt: '81001', description: 'Urinalysis', fee: 20, newFee: 25 },
  { cpt: '81002', description: 'Urinalysis Dip w/o Micro', fee: 15, newFee: 19 },
  { cpt: '81025', description: 'Urine Pregnancy Test', fee: 25, newFee: 31 },
  { cpt: '82306', description: 'Vitamin D', fee: 80, newFee: 100 },
  { cpt: '82533', description: 'Cortisol', fee: 50, newFee: 63 },
  { cpt: '82607', description: 'Vitamin B12', fee: 50, newFee: 63 },
  { cpt: '82627', description: 'DHEA Sulfate', fee: 55, newFee: 69 },
  { cpt: '82670', description: 'Estradiol', fee: 77, newFee: 96 },
  { cpt: '82677', description: 'Estriol Serum', fee: 65, newFee: 81 },
  { cpt: '82679', description: 'Estrone', fee: 65, newFee: 81 },
  { cpt: '82746', description: 'Folate', fee: 20, newFee: 25 },
  { cpt: '83001', description: 'FSH', fee: 52, newFee: 65 },
  { cpt: '83002', description: 'LH', fee: 55, newFee: 69 },
  { cpt: '83036', description: 'Hemoglobin A1C Testing', fee: 40, newFee: 50 },
  { cpt: '83037', description: 'Hemoglobin A1C', fee: 15, newFee: 19 },
  { cpt: '83735', description: 'Magnesium', fee: 25, newFee: 31 },
  { cpt: '84140', description: 'Pregnenolone', fee: 50, newFee: 63 },
  { cpt: '84144', description: 'Progesterone', fee: 60, newFee: 75 },
  { cpt: '84146', description: 'Prolactin', fee: 56, newFee: 70 },
  { cpt: '84153', description: 'PSA', fee: 52, newFee: 65 },
  { cpt: '84270', description: 'Sex Hormone Binding Globulin', fee: 55, newFee: 69 },
  { cpt: '84305', description: 'Somatomedin', fee: 56, newFee: 70 },
  { cpt: '84402', description: 'Testosterone Free', fee: 75, newFee: 94 },
  { cpt: '84403', description: 'Testosterone Total', fee: 75, newFee: 94 },
  { cpt: '84410', description: 'Bioavailable Testosterone', fee: 75, newFee: 94 },
  { cpt: '84436', description: 'T4', fee: 20, newFee: 25 },
  { cpt: '84439', description: 'T4 Free', fee: 36, newFee: 45 },
  { cpt: '84443', description: 'TSH', fee: 50, newFee: 63 },
  { cpt: '84481', description: 'T3 Free', fee: 25, newFee: 31 },
  { cpt: '84550', description: 'Uric Acid', fee: 20, newFee: 25 },
  { cpt: '85025', description: 'CBC w/ Diff', fee: 41, newFee: 51 },
  { cpt: '85652', description: 'Sed. Rate', fee: 25, newFee: 31 },
  { cpt: '90471', description: 'Administration Vaccine', fee: 40, newFee: 50 },
  { cpt: '90472', description: 'Administration 2+ Vaccines', fee: 40, newFee: 50 },
  { cpt: '93000', description: 'Electrocardiogram Complete', fee: 50, newFee: 63 },
  { cpt: '93306', description: 'Echocardiography Transthoracic', fee: 450, newFee: 563 },
  { cpt: '93880', description: 'Duplex Scan Extracranial', fee: 533, newFee: 666 },
  { cpt: '93970', description: 'Extremity Study', fee: 350, newFee: 438 },
  { cpt: '94010', description: 'Spirometry', fee: 80, newFee: 100 },
  { cpt: '94760', description: 'Pulse Oximetry', fee: 25, newFee: 31 },
  { cpt: '96372', description: 'Therapeutic Injection', fee: 51, newFee: 64 },
  { cpt: '97110', description: 'Therapeutic Exercises', fee: 40, newFee: 50 },
  { cpt: '99202', description: 'Office Visit New (Level 2)', fee: 156, newFee: 195 },
  { cpt: '99203', description: 'Office Visit New (Level 3)', fee: 229, newFee: 286 },
  { cpt: '99204', description: 'Office Visit New (Level 4)', fee: 350, newFee: 438 },
  { cpt: '99205', description: 'Office Visit New (Level 5)', fee: 434, newFee: 543 },
  { cpt: '99211', description: 'Office Visit Est. (Level 1)', fee: 42, newFee: 53 },
  { cpt: '99212', description: 'Office Visit Est. (Level 2)', fee: 92, newFee: 115 },
  { cpt: '99213', description: 'Office Visit Est. (Level 3)', fee: 152, newFee: 190 },
  { cpt: '99214', description: 'Office Visit Est. (Level 4)', fee: 224, newFee: 280 },
  { cpt: '99215', description: 'Office Visit Est. (Level 5)', fee: 301, newFee: 376 },
  { cpt: '99385', description: 'Preventive Visit New 18-39', fee: 250, newFee: 313 },
  { cpt: '99386', description: 'Preventive Visit New 40-64', fee: 250, newFee: 313 },
  { cpt: '99395', description: 'Preventive Visit Est. 18-39', fee: 225, newFee: 281 },
  { cpt: '99396', description: 'Preventive Visit Est. 40-64', fee: 225, newFee: 281 },
  { cpt: '99401', description: 'Preventive Counseling 15 min', fee: 100, newFee: 125 },
  { cpt: '99402', description: 'Preventive Counseling 30 min', fee: 200, newFee: 250 },
  { cpt: '99441', description: 'Telephone E/M 5-10 min', fee: 30, newFee: 38 },
  { cpt: '99442', description: 'Telephone E/M 10-20 min', fee: 60, newFee: 75 },
  { cpt: '99443', description: 'Telephone E/M 21-30 min', fee: 83, newFee: 104 },
  { cpt: '99490', description: 'Chronic Care Mgmt 20 min', fee: 100, newFee: 125 },
  { cpt: 'G0439', description: 'Annual Wellness Visit', fee: 225, newFee: 281 },
  { cpt: 'G0447', description: 'Behavioral Counseling Obesity 15 min', fee: 40, newFee: 50 },
  { cpt: 'J1071', description: 'Injection Testosterone Cypionate 1mg', fee: 40, newFee: 50 },
  { cpt: 'J1885', description: 'Injection Ketorolac 15mg', fee: 40, newFee: 50 },
  { cpt: 'J3301', description: 'Injection Triamcinolone 10mg', fee: 40, newFee: 50 },
  { cpt: 'J3420', description: 'Injection Vitamin B12 1000mcg', fee: 40, newFee: 50 },
];

const DEFAULT_BUNDLES = [
  // Weight Loss Product Bundles
  {
    name: 'WL Level 1 - Maintenance',
    category: 'Weight Loss',
    cost: 25,
    price: 186,
    items: ['4 boxes shakes'],
  },
  {
    name: 'WL Level 2 - Phentermine',
    category: 'Weight Loss',
    cost: 15,
    price: 275,
    items: ['Phentermine (food sold separately)'],
  },
  {
    name: 'WL Level 3',
    category: 'Weight Loss',
    cost: 47,
    price: 624,
    items: ['8 boxes shakes', 'Phentermine'],
  },
  {
    name: 'WL Level 4',
    category: 'Weight Loss',
    cost: 92,
    price: 749,
    items: ['16 boxes shakes', 'Phentermine'],
  },
  {
    name: 'WL Level 5',
    category: 'Weight Loss',
    cost: 146,
    price: 874,
    items: ['24 boxes shakes', '2 injections', 'Phentermine'],
  },
  {
    name: 'WL Level 6',
    category: 'Weight Loss',
    cost: 191,
    price: 999,
    items: ['32 boxes shakes', '2 injections', 'Phentermine'],
  },
  // Sexual Health Bundles
  {
    name: 'Mens Vitality Bundle',
    category: 'Sexual Health',
    cost: 100,
    price: 449,
    items: ['Sildenafil OR Tadalafil (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  {
    name: 'ED Essentials',
    category: 'Sexual Health',
    cost: 64,
    price: 249,
    items: ['Tadalafil 5mg (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  {
    name: 'ED Performance',
    category: 'Sexual Health',
    cost: 90,
    price: 399,
    items: ['Sildenafil 100mg (30ct)', 'Tadalafil 20mg Fast Acting (30ct)', 'Arousal Cream M/F (30ml)'],
  },
  // Anti-Aging & Skin Bundles
  {
    name: 'Anti-Aging Skin Bundle',
    category: 'Skin & Hair',
    cost: 125,
    price: 449,
    items: ['Anti-Aging Gel Pump', 'Ultra Anti-Aging Gel Cream', 'Tretinoin Acne Cream'],
  },
  {
    name: 'Hair Restoration Bundle',
    category: 'Skin & Hair',
    cost: 62,
    price: 275,
    items: ['Finasteride 1.25mg (30ct)', 'Hair Restore Cream'],
  },
  // Hormone Bundles
  {
    name: 'BHRT Starter (Women)',
    category: 'Hormones',
    cost: 156,
    price: 449,
    items: ['Estradiol/Progesterone Cream', 'DHEA/Pregnenolone Cream'],
  },
  {
    name: 'BHRT Complete (Women)',
    category: 'Hormones',
    cost: 211,
    price: 649,
    items: ['Estradiol/Progesterone Cream', 'DHEA/Pregnenolone Cream', 'Testosterone Cream'],
  },
  {
    name: 'TRT + Support (Men)',
    category: 'Hormones',
    cost: 65,
    price: 299,
    items: ['Testosterone Cream', 'Anastrozole'],
  },
  {
    name: 'Growth Hormone Starter',
    category: 'Hormones',
    cost: 115,
    price: 449,
    items: ['Sermorelin vial up to 15mg'],
  },
  {
    name: 'Growth Hormone Max',
    category: 'Hormones',
    cost: 229,
    price: 799,
    items: ['Sermorelin vial 30mg'],
  },
  { name: 'Couples TRT Bundle', category: 'Hormones', cost: 130, price: 549, items: ['2x Testosterone Cream', '2x Anastrozole'] },
  { name: 'Complete Male Optimization', category: 'Hormones', cost: 163, price: 899, items: ['Testosterone Cream', 'Anastrozole', 'Sildenafil 100mg (30ct)', 'Arousal Cream'] },
  { name: 'Female Wellness Essentials', category: 'Hormones', cost: 195, price: 399, items: ['BHRT Starter (Estradiol/Prog + DHEA/Preg)', 'Anti-Aging Gel Pump'] },
  { name: 'Weight Loss Starter Kit', category: 'Weight Loss', cost: 50, price: 349, items: ['WL Level 1 (4 boxes)', 'Naltrexone'] },
  { name: 'Post-TRT Support', category: 'Hormones', cost: 57, price: 199, items: ['Anastrozole', 'Clomid'] },
  { name: 'Longevity Stack', category: 'Hormones', cost: 240, price: 699, items: ['Sermorelin 15mg', 'Anti-Aging Skin Bundle'] },
];

const DEFAULT_PACKAGES = [
  // Weight Loss Packages (multi-month programs with visits)
  {
    name: 'Semaglutide 3-Month Kickstart',
    category: 'Weight Loss',
    cost: 300,
    price: 899,
    duration: '3 months',
    services: [
      'Semaglutide - 3 months supply ($374/mo value)',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly check-in visits',
    ],
  },
  {
    name: 'Semaglutide 6-Month Commitment',
    category: 'Weight Loss',
    cost: 700,
    price: 3500,
    duration: '6 months',
    services: [
      'Semaglutide - 6 months',
      'New Patient Consultation',
      '2x Full Blood Panels',
      '6x Monthly check-in visits',
      'Dose management throughout',
    ],
  },
  {
    name: 'Tirzepatide 3-Month (2.5-5mg)',
    category: 'Weight Loss',
    cost: 550,
    price: 1599,
    duration: '3 months',
    services: [
      'Tirzepatide 2.5-5mg - 3 months',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly visits + dose escalation',
    ],
  },
  {
    name: 'Tirzepatide 3-Month (7.5mg)',
    category: 'Weight Loss',
    cost: 640,
    price: 2103,
    duration: '3 months',
    services: [
      'Tirzepatide 7.5mg - 3 months',
      'New Patient Consultation',
      'Full Blood Panel',
      '3x Monthly visits + dose management',
    ],
  },
  {
    name: 'WL Level 3 Program - 3 Month',
    category: 'Weight Loss',
    cost: 142,
    price: 1750,
    duration: '3 months',
    services: [
      'WL Level 3 bundle x 3 months',
      '3x Monthly visits',
      '3x Accountability check-ins',
    ],
  },
  {
    name: 'WL Level 4 Program - 6 Month',
    category: 'Weight Loss',
    cost: 552,
    price: 4100,
    duration: '6 months',
    services: [
      'WL Level 4 bundle x 6 months',
      '6x Monthly visits',
      '2x Full Blood Panels',
      '6x Accountability check-ins',
    ],
  },
  {
    name: 'WL Level 5 Program - 6 Month',
    category: 'Weight Loss',
    cost: 878,
    price: 4775,
    duration: '6 months',
    services: [
      'WL Level 5 bundle x 6 months',
      '6x Monthly visits',
      '2x Full Blood Panels',
      '6x Accountability check-ins',
    ],
  },
  // TRT Packages
  {
    name: 'TRT Quarterly (Every 2 Weeks)',
    category: 'TRT',
    cost: 42,
    price: 1275,
    duration: '3 months',
    services: [
      'TRT injection every 2 weeks (6 shots)',
      'Full Blood Panel',
      'Follow-up consultation',
    ],
  },
  {
    name: 'TRT 6-Month (Every 2 Weeks)',
    category: 'TRT',
    cost: 84,
    price: 2550,
    duration: '6 months',
    services: [
      'TRT injection every 2 weeks (12 shots)',
      '2x Full Blood Panels',
      '2x Follow-up consultations',
    ],
  },
  {
    name: 'TRT Weekly In Office - 3 Month',
    category: 'TRT',
    cost: 56,
    price: 1750,
    duration: '3 months',
    services: [
      'Weekly TRT in office (12 shots)',
      'Full Blood Panel',
      'Follow-up consultation',
    ],
  },
  {
    name: 'TRT Take Home Quarterly',
    category: 'TRT',
    cost: 56,
    price: 1497,
    duration: '3 months',
    services: [
      'Weekly take home TRT - 3 months',
      'Monthly office visit for monitoring',
      'Full Blood Panel',
    ],
  },
  // Hormone & Peptide Packages
  {
    name: 'Sermorelin 3-Month (15mg)',
    category: 'Hormones',
    cost: 344,
    price: 1275,
    duration: '3 months',
    services: [
      'Sermorelin vial up to 15mg x 3',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'Sermorelin 6-Month (15mg)',
    category: 'Hormones',
    cost: 688,
    price: 2500,
    duration: '6 months',
    services: [
      'Sermorelin up to 15mg x 6',
      'Initial consultation',
      '2x Follow-ups',
      'Blood panel at start',
    ],
  },
  {
    name: 'Sermorelin 3-Month (30mg)',
    category: 'Hormones',
    cost: 688,
    price: 2228,
    duration: '3 months',
    services: [
      'Sermorelin 30mg vial x 3',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'BHRT Program - 3 Month',
    category: 'Hormones',
    cost: 234,
    price: 795,
    duration: '3 months',
    services: [
      'BHRT Cream (Estradiol/Prog or DHEA/Preg) x 3 months',
      'Initial hormone consultation',
      'Follow-up visit',
    ],
  },
  {
    name: 'BHRT Program - 6 Month',
    category: 'Hormones',
    cost: 468,
    price: 1575,
    duration: '6 months',
    services: [
      'BHRT Cream x 6 months',
      'Initial hormone consultation',
      '2x Follow-up visits',
      'Blood panel at start',
    ],
  },
  {
    name: 'Clomid Program - 3 Month',
    category: 'Hormones',
    cost: 141,
    price: 790,
    duration: '3 months',
    services: [
      'Clomid x 3 months',
      'Initial consultation',
      'Follow-up visit',
      'Blood panel',
    ],
  },
  {
    name: 'Naltrexone 3-Month',
    category: 'Hormones',
    cost: 75,
    price: 460,
    duration: '3 months',
    services: [
      'Naltrexone (all doses) x 3 months',
      'Initial consultation',
      'Follow-up check-in',
    ],
  },
  // Sexual Health Packages
  {
    name: 'ED Complete 3-Month',
    category: 'Sexual Health',
    cost: 120,
    price: 599,
    duration: '3 months',
    services: [
      'Tadalafil 6-19mg x 3 months (90ct total)',
      'Arousal Cream (30ml)',
      'Initial consultation',
      'Follow-up visit',
    ],
  },
  // Wellness Packages
  {
    name: 'Comprehensive Wellness Panel',
    category: 'Wellness',
    cost: 200,
    price: 749,
    duration: 'One-time',
    services: [
      'Full Blood Panel',
      'New Patient Consultation',
      'Follow-up visit to review results',
      'Personalized treatment plan',
    ],
  },
  {
    name: 'Annual Wellness Program',
    category: 'Wellness',
    cost: 400,
    price: 1400,
    duration: '12 months',
    services: [
      '2x Full Blood Panels (start + 6mo)',
      'Annual Wellness Visit',
      '2x Follow-up consultations',
      'Personalized treatment plan',
    ],
  },
  {
    name: 'HCG + TRT Combo 3-Month',
    category: 'TRT',
    cost: 228,
    price: 2499,
    duration: '3 months',
    services: ['HCG vial', 'Weekly TRT in office x 12', 'Full Blood Panel', '3x Consultations'],
  },
  {
    name: 'Full Hormone Reset (Women) 6-Month',
    category: 'Hormones',
    cost: 680,
    price: 3499,
    duration: '6 months',
    services: ['BHRT Complete x 6 months', '2x Full Blood Panels', '6x Consultations', 'Dedicated care coordinator'],
  },
  {
    name: 'Tirzepatide 6-Month Program',
    category: 'Weight Loss',
    cost: 1080,
    price: 4200,
    duration: '6 months',
    services: ['Tirzepatide full dose escalation 6mo', '2x Full Blood Panels', '6x Monthly visits', 'Dose management'],
  },
  {
    name: 'Couples Wellness Annual',
    category: 'Wellness',
    cost: 400,
    price: 2499,
    duration: '12 months',
    services: ['2x Annual wellness visits', '2x Full Blood Panels', '4x Consultations', '2x Personalized treatment plans'],
  },
];

const DEFAULT_MEMBERSHIPS = [
  {
    name: 'Essential',
    tier: 'Starter',
    starterFee: 100,
    totalCost: 20,
    maxCost: 30,
    price: 59,
    credits: 1,
    referralBonus: '$25 credit per referral',
    services: [
      'Telehealth access ($99 visits)',
      'Patient portal access',
      '24/7 messaging with care team',
      'Discounted visit pricing ($124 add-on visits)',
    ],
    products: [
      '10% off all medications',
      '10% off bloodwork',
      '10% off all packages',
    ],
  },
  {
    name: 'Wellness',
    tier: 'Growth',
    starterFee: 149,
    totalCost: 35,
    maxCost: 45,
    price: 99,
    credits: 2,
    referralBonus: '$50 credit per referral',
    services: [
      'Everything in Essential',
      '1 office visit per month included ($186 value)',
      'Annual wellness visit included ($311 value)',
      'Priority scheduling',
    ],
    products: [
      '15% off all medications',
      '15% off bloodwork & labs',
      '15% off all packages',
      'Free shipping on all products',
    ],
  },
  {
    name: 'Vitality',
    tier: 'Scale',
    starterFee: 199,
    totalCost: 65,
    maxCost: 85,
    price: 199,
    credits: 4,
    referralBonus: '$75 credit + free B-12 for referee',
    services: [
      'Everything in Wellness',
      '2 visits per month included',
      'Quarterly full blood panel ($374 value)',
      'Monthly B-12 injection included ($30 value)',
      'Direct physician line',
      'Dedicated care coordinator',
    ],
    products: [
      '20% off all medications & products',
      '20% off all packages',
      '1 free telehealth visit per month',
      'Free Anastrozole if on TRT ($44 value)',
    ],
  },
  {
    name: 'Premium',
    tier: 'Elite',
    starterFee: 249,
    totalCost: 100,
    maxCost: 130,
    price: 299,
    credits: 6,
    referralBonus: '$100 credit + 1 month free for referee',
    services: [
      'Everything in Vitality',
      'Unlimited office visits',
      'Monthly full blood panel included',
      'Monthly IV Vitamin Therapy ($150 value)',
      'Same-day appointment guarantee',
      'After-hours phone access',
    ],
    products: [
      '25% off all medications & products',
      '25% off all packages',
      'Free shipping + priority fulfillment',
      'Annual Anti-Aging Gel Pump included ($174 value)',
      'Birthday month: free product of choice (up to $211)',
    ],
  },
  {
    name: 'Concierge',
    tier: 'VIP',
    starterFee: 349,
    totalCost: 150,
    maxCost: 190,
    price: 499,
    credits: 'Unlimited',
    referralBonus: '$150 credit + 1 month free for referee + starter fee waiver',
    services: [
      'Everything in Premium',
      'Unlimited visits + telehealth',
      'Quarterly in-depth wellness review',
      'Annual comprehensive panel + specialty labs',
      'Direct cell phone access to Dr. Tack',
      'Expedited Rx refills (same day)',
      'Priority referral coordination',
    ],
    products: [
      '30% off all medications & products',
      '30% off all packages',
      'Monthly B-12 + quarterly IV Therapy included',
      'Annual skincare bundle included ($499 value)',
      'Complimentary guest passes (2/month)',
      '1 free package upgrade per year (up to $500 value)',
    ],
  },
];

const DEFAULT_SALES = {
  memberships: [
    { name: 'Essential', unitsSold: 150, price: 59 },
    { name: 'Wellness', unitsSold: 100, price: 99 },
    { name: 'Vitality', unitsSold: 60, price: 199 },
    { name: 'Premium', unitsSold: 30, price: 299 },
    { name: 'Concierge', unitsSold: 10, price: 499 },
  ],
  bundles: [
    { name: 'WL Level 3', unitsSold: 80, price: 624 },
    { name: 'WL Level 5', unitsSold: 40, price: 874 },
    { name: 'Mens Vitality Bundle', unitsSold: 35, price: 449 },
    { name: 'Anti-Aging Skin Bundle', unitsSold: 25, price: 449 },
    { name: 'BHRT Starter (Women)', unitsSold: 30, price: 449 },
    { name: 'TRT + Support (Men)', unitsSold: 45, price: 299 },
    { name: 'Growth Hormone Starter', unitsSold: 20, price: 449 },
    { name: 'Complete Male Optimization', unitsSold: 15, price: 899 },
    { name: 'Longevity Stack', unitsSold: 10, price: 699 },
  ],
  packages: [
    { name: 'Semaglutide 3-Month Kickstart', unitsSold: 35, price: 899 },
    { name: 'Tirzepatide 3-Month (2.5-5mg)', unitsSold: 20, price: 1599 },
    { name: 'WL Level 5 Program - 6 Month', unitsSold: 15, price: 4775 },
    { name: 'TRT Quarterly (Every 2 Weeks)', unitsSold: 25, price: 1275 },
    { name: 'TRT 6-Month (Every 2 Weeks)', unitsSold: 15, price: 2550 },
    { name: 'Semaglutide 6-Month Commitment', unitsSold: 12, price: 3500 },
    { name: 'Sermorelin 3-Month (15mg)', unitsSold: 15, price: 1275 },
    { name: 'BHRT Program - 3 Month', unitsSold: 25, price: 795 },
    { name: 'ED Complete 3-Month', unitsSold: 20, price: 599 },
    { name: 'Comprehensive Wellness Panel', unitsSold: 30, price: 749 },
    { name: 'Tirzepatide 6-Month Program', unitsSold: 8, price: 4200 },
    { name: 'HCG + TRT Combo 3-Month', unitsSold: 12, price: 2499 },
  ],
};

function InputsPanel({ inputs, setInputs, pricingMode, setPricingMode }) {
  const update = (key, raw) => {
    const val = key === 'growthMode' ? raw : Number(raw);
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  return (
    <section className="panel inputs-panel">
      <h2>Inputs</h2>
      <div className="input-grid">
        <label>Target Margin
          <input type="number" step="0.01" value={inputs.targetMargin}
            onChange={e => update('targetMargin', e.target.value)} />
        </label>
        <label>Min LTV:CAC
          <input type="number" step="0.1" value={inputs.minLtvCac}
            onChange={e => update('minLtvCac', e.target.value)} />
        </label>
        <label>Growth Mode
          <select value={inputs.growthMode} onChange={e => update('growthMode', e.target.value)}>
            <option value="SCALE">SCALE</option>
            <option value="HOLD">HOLD</option>
            <option value="CUT">CUT</option>
          </select>
        </label>
        <label>Pricing Mode
          <select value={pricingMode} onChange={e => setPricingMode(e.target.value)}>
            <option value="selfPay">Self Pay</option>
            <option value="insurance">Insurance</option>
            <option value="bcbs">BCBS</option>
          </select>
        </label>
        <label>Monthly Growth Rate
          <input type="number" step="0.01" value={inputs.monthlyGrowthRate}
            onChange={e => update('monthlyGrowthRate', e.target.value)} />
        </label>
        <label>ARPU
          <input type="number" step="1" value={inputs.arpu}
            onChange={e => update('arpu', e.target.value)} />
        </label>
        <label>Churn Rate
          <input type="number" step="0.01" value={inputs.churnRate}
            onChange={e => update('churnRate', e.target.value)} />
        </label>
        <label>Starting Cash
          <input type="number" step="1000" value={inputs.startingCash}
            onChange={e => update('startingCash', e.target.value)} />
        </label>
        <label>Max CAC
          <input type="number" step="1" value={inputs.maxCac}
            onChange={e => update('maxCac', e.target.value)} />
        </label>
      </div>
      <div className={`growth-badge growth-${inputs.growthMode.toLowerCase()}`}>
        {inputs.growthMode}
      </div>
    </section>
  );
}

function ServicesTable({ services, setServices, targetMargin, pricingMode }) {
  const updateService = (idx, key, raw) => {
    setServices(prev => prev.map((s, i) =>
      i === idx ? { ...s, [key]: Number(raw) } : s
    ));
  };

  const getActivePrice = (s) => {
    if (pricingMode === 'insurance' && s.priceInsurance != null) return s.priceInsurance;
    if (pricingMode === 'bcbs' && s.priceBcbs != null) return s.priceBcbs;
    return s.price;
  };

  return (
    <section className="panel">
      <h2>Services</h2>
      <p className="section-desc">Individual a la carte services</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Margin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => {
              const activePrice = getActivePrice(s);
              const margin = activePrice > 0 ? (activePrice - s.cost) / activePrice : 0;
              const ok = margin >= targetMargin;
              return (
                <tr key={s.name}>
                  <td className="cell-name">{s.name}</td>
                  <td><span className={`category-tag cat-${s.category.toLowerCase().replace(/[^a-z]/g, '')}`}>{s.category}</span></td>
                  <td>
                    <input type="number" value={s.cost}
                      onChange={e => updateService(i, 'cost', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={activePrice}
                      onChange={e => updateService(i, 'price', e.target.value)} />
                  </td>
                  <td className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</td>
                  <td className="cell-status">{ok ? '✅' : '⚠️'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BundlesSection({ bundles, setBundles, targetMargin }) {
  const updateBundle = (idx, key, raw) => {
    setBundles(prev => prev.map((b, i) =>
      i === idx ? { ...b, [key]: Number(raw) } : b
    ));
  };

  return (
    <section className="panel">
      <h2>Bundles</h2>
      <p className="section-desc">Product groupings — meds, creams & supplies sold together</p>
      <div className="bundle-cards">
        {bundles.map((b, i) => {
          const margin = b.price > 0 ? (b.price - b.cost) / b.price : 0;
          const ok = margin >= targetMargin;
          return (
            <div key={b.name} className={`bundle-card cat-border-${b.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
              <div className="package-header">
                <h3>{b.name}</h3>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <span className={`category-tag cat-${b.category.toLowerCase().replace(/[^a-z]/g, '')}`}>{b.category}</span>
              <div className="bundle-price">${b.price}</div>
              <ul className="bundle-items">
                {b.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Cost</span>
                  <input type="number" value={b.cost}
                    onChange={e => updateBundle(i, 'cost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Price</span>
                  <input type="number" value={b.price}
                    onChange={e => updateBundle(i, 'price', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Margin</span>
                  <span className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PackagesSection({ packages, setPackages, targetMargin }) {
  const updatePackage = (idx, key, raw) => {
    setPackages(prev => prev.map((p, i) =>
      i === idx ? { ...p, [key]: Number(raw) } : p
    ));
  };

  return (
    <section className="panel">
      <h2>Packages</h2>
      <p className="section-desc">Multi-month service programs — visits + treatments over time</p>
      <div className="package-cards">
        {packages.map((p, i) => {
          const margin = p.price > 0 ? (p.price - p.cost) / p.price : 0;
          const ok = margin >= targetMargin;
          return (
            <div key={p.name} className="package-card">
              <div className="package-header">
                <h3>{p.name}</h3>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <div className="package-price">${p.price.toLocaleString()}</div>
              {p.duration && <span className="duration-badge">{p.duration}</span>}
              <ul className="package-services">
                {p.services.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Cost</span>
                  <input type="number" value={p.cost}
                    onChange={e => updatePackage(i, 'cost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Price</span>
                  <input type="number" value={p.price}
                    onChange={e => updatePackage(i, 'price', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Margin</span>
                  <span className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MembershipsSection({ memberships, setMemberships, targetMargin }) {
  const updateMembership = (idx, key, raw) => {
    setMemberships(prev => prev.map((m, i) =>
      i === idx ? { ...m, [key]: Number(raw) } : m
    ));
  };

  return (
    <section className="panel">
      <h2>Memberships</h2>
      <p className="section-desc">Monthly recurring — includes credits, services, and products</p>
      <div className="membership-cards">
        {memberships.map((m, i) => {
          const margin = (m.price - m.totalCost) / m.price;
          const ok = margin >= targetMargin;
          return (
            <div key={m.name} className={`membership-card tier-${m.tier.toLowerCase()}`}>
              <div className="membership-header">
                <span className={`tier-tag tier-tag-${m.tier.toLowerCase()}`}>{m.tier}</span>
                <span className="cell-status">{ok ? '✅' : '⚠️'}</span>
              </div>
              <h3 className="membership-name">{m.name}</h3>
              <div className="membership-pricing">
                <div className="membership-price">
                  <span className="price-amount">${m.price}</span>
                  <span className="price-period">/mo</span>
                </div>
                <div className="starter-fee">+ ${m.starterFee} starter fee</div>
              </div>
              <div className="credits-badge">{m.credits} credits/mo</div>
              <div className="membership-section">
                <span className="membership-section-label">Services</span>
                <ul className="membership-includes">
                  {m.services.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="membership-section">
                <span className="membership-section-label">Products</span>
                <ul className="membership-products">
                  {m.products.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {m.referralBonus && (
                <div className="membership-section">
                  <span className="membership-section-label">Referral Program</span>
                  <span className="referral-bonus">{m.referralBonus}</span>
                </div>
              )}
              <div className="membership-financials">
                <div className="financial-row">
                  <span>Starter Fee</span>
                  <input type="number" value={m.starterFee}
                    onChange={e => updateMembership(i, 'starterFee', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Monthly Cost</span>
                  <input type="number" value={m.totalCost}
                    onChange={e => updateMembership(i, 'totalCost', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Monthly Price</span>
                  <input type="number" value={m.price}
                    onChange={e => updateMembership(i, 'price', e.target.value)} />
                </div>
                <div className="financial-row">
                  <span>Margin</span>
                  <span className={ok ? 'cell-good' : 'cell-warn'}>{(margin * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SalesTable({ sales, setSales }) {
  const updateSale = (section, idx, key, raw) => {
    setSales(prev => ({
      ...prev,
      [section]: prev[section].map((s, i) =>
        i === idx ? { ...s, [key]: Number(raw) } : s
      ),
    }));
  };

  const renderTable = (title, data, section) => (
    <div className="sales-group">
      <h3 className="sales-group-title">{title}</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Units Sold</th>
              <th>Price</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => {
              const revenue = s.unitsSold * s.price;
              return (
                <tr key={s.name}>
                  <td className="cell-name">{s.name}</td>
                  <td>
                    <input type="number" value={s.unitsSold}
                      onChange={e => updateSale(section, i, 'unitsSold', e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={s.price}
                      onChange={e => updateSale(section, i, 'price', e.target.value)} />
                  </td>
                  <td className="cell-revenue">${revenue.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="panel">
      <h2>Sales</h2>
      {renderTable('Membership Sales', sales.memberships, 'memberships')}
      {renderTable('Bundle Sales', sales.bundles, 'bundles')}
      {renderTable('Package Sales', sales.packages, 'packages')}
    </section>
  );
}

function SummaryPanel({ summary }) {
  const metrics = [
    { label: 'Membership MRR', value: `$${summary.membershipRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
    { label: 'Bundle Revenue', value: `$${summary.bundleRevenue.toLocaleString()}`, color: 'var(--color-teal)' },
    { label: 'Package Revenue', value: `$${summary.packageRevenue.toLocaleString()}`, color: 'var(--color-purple)' },
    { label: 'Starter Fee Revenue', value: `$${summary.starterFeeRevenue.toLocaleString()}`, color: 'var(--color-purple)' },
    { label: 'Total Revenue', value: `$${summary.totalRevenue.toLocaleString()}`, color: 'var(--color-blue)' },
    { label: 'Total Costs', value: `$${summary.totalCosts.toLocaleString()}`, color: 'var(--color-orange)' },
    { label: 'Profit', value: `$${summary.profit.toLocaleString()}`, color: summary.profit >= 0 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Margin', value: `${(summary.margin * 100).toFixed(1)}%`, color: summary.margin >= 0.6 ? 'var(--color-green)' : 'var(--color-orange)' },
    { label: 'LTV', value: `$${summary.ltv.toFixed(2)}`, color: 'var(--color-blue)' },
    { label: 'LTV:CAC', value: summary.ltvCac.toFixed(2), color: summary.ltvCac >= 3 ? 'var(--color-green)' : 'var(--color-red)' },
    { label: 'Runway', value: summary.burnRate >= 0 ? 'Profitable' : `${summary.runway.toFixed(1)} months`, color: summary.burnRate >= 0 ? 'var(--color-green)' : 'var(--color-orange)' },
  ];

  return (
    <section className="panel summary-panel">
      <h2>Summary</h2>
      <div className="metrics-grid">
        {metrics.map(m => (
          <div key={m.label} className="metric-card" style={{ borderLeftColor: m.color }}>
            <span className="metric-label">{m.label}</span>
            <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RevenueChart({ sales }) {
  const all = [
    ...sales.memberships.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'membership' })),
    ...sales.bundles.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'bundle' })),
    ...sales.packages.map(s => ({ name: s.name, revenue: s.unitsSold * s.price, type: 'package' })),
  ];
  const maxRev = Math.max(...all.map(r => r.revenue));

  return (
    <section className="panel">
      <h2>Revenue Breakdown</h2>
      <div className="chart">
        {all.map(r => (
          <div key={r.name} className="chart-row">
            <span className="chart-label">{r.name}</span>
            <div className="chart-bar-wrapper">
              <div
                className={`chart-bar ${r.type === 'package' ? 'chart-bar-package' : r.type === 'bundle' ? 'chart-bar-bundle' : ''}`}
                style={{ width: `${(r.revenue / maxRev) * 100}%` }}
              />
            </div>
            <span className="chart-value">${r.revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [bundles, setBundles] = useState(DEFAULT_BUNDLES);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [memberships, setMemberships] = useState(DEFAULT_MEMBERSHIPS);
  const [sales, setSales] = useState(DEFAULT_SALES);

  const summary = useMemo(() => {
    const membershipRevenue = sales.memberships.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const bundleRevenue = sales.bundles.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const packageRevenue = sales.packages.reduce((sum, s) => sum + s.unitsSold * s.price, 0);
    const starterFeeRevenue = sales.memberships.reduce((sum, s) => {
      const m = memberships.find(mem => mem.name === s.name);
      return sum + (m ? s.unitsSold * m.starterFee : 0);
    }, 0);
    const totalRevenue = membershipRevenue + bundleRevenue + packageRevenue + starterFeeRevenue;
    const totalCosts = memberships.reduce((sum, m) => sum + m.totalCost, 0)
      + bundles.reduce((sum, b) => sum + b.cost, 0)
      + packages.reduce((sum, p) => sum + p.cost, 0);
    const profit = totalRevenue - totalCosts;
    const margin = totalRevenue > 0 ? profit / totalRevenue : 0;
    const ltv = inputs.churnRate > 0 ? inputs.arpu / inputs.churnRate : 0;
    const ltvCac = inputs.maxCac > 0 ? ltv / inputs.maxCac : 0;
    const burnRate = totalCosts - totalRevenue;
    const runway = burnRate > 0 ? inputs.startingCash / burnRate : Infinity;

    return { membershipRevenue, bundleRevenue, packageRevenue, starterFeeRevenue, totalRevenue, totalCosts, profit, margin, ltv, ltvCac, burnRate, runway };
  }, [inputs, memberships, bundles, packages, sales]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand-mark">
          <h1>Shape The Wave Longevity™</h1>
          <span className="tagline">Optimize health. Align habits. Live longer, better.</span>
        </div>
        <div className="brand-hierarchy">
          <span className="brand-pill brand-reel">REEL™ Align Method™</span>
          <span className="brand-arrow">→</span>
          <span className="brand-pill brand-ai">ReelVerse AI™</span>
          <span className="brand-arrow">→</span>
          <span className="brand-pill brand-os">ReelVerse OS™</span>
        </div>
      </header>
      <section className="panel ecosystem-panel">
        <h2>Ecosystem</h2>
        <div className="ecosystem-grid">
          <div className="eco-card">
            <span className="eco-icon">🧭</span>
            <strong>ReelVerse Coach™</strong>
            <span>AI guidance</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🪞</span>
            <strong>ReelVerse Mirror™</strong>
            <span>Reflection & journaling</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🧭</span>
            <strong>ReelVerse Compass™</strong>
            <span>Goals, values & direction</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🚀</span>
            <strong>ReelVerse Momentum™</strong>
            <span>Habits & progress</span>
          </div>
          <div className="eco-card">
            <span className="eco-icon">🎓</span>
            <strong>ReelVerse Academy™</strong>
            <span>Courses & certification</span>
          </div>
          <div className="eco-card eco-card-credential">
            <span className="eco-icon">🏅</span>
            <strong>Certified REEL Method Practitioner™</strong>
            <span>Professional credential</span>
          </div>
        </div>
        <div className="framework-bar">
          <span className="framework-label">REEL™ Framework:</span>
          <span className="framework-step">Reflect</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Envision</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Execute</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Learn</span>
          <span className="framework-dot">·</span>
          <span className="framework-step">Align</span>
        </div>
      </section>
      <div className="dashboard-grid">
        <InputsPanel inputs={inputs} setInputs={setInputs} />
        <SummaryPanel summary={summary} />
        <MembershipsSection memberships={memberships} setMemberships={setMemberships} targetMargin={inputs.targetMargin} />
        <BundlesSection bundles={bundles} setBundles={setBundles} targetMargin={inputs.targetMargin} />
        <PackagesSection packages={packages} setPackages={setPackages} targetMargin={inputs.targetMargin} />
        <ServicesTable services={services} setServices={setServices} targetMargin={inputs.targetMargin} />
        <SalesTable sales={sales} setSales={setSales} />
        <RevenueChart sales={sales} />
      </div>
    </div>
  );
}

export default App;
