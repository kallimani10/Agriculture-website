import { img } from './media'

/** Inquiry types offered on the contact form. `value` is used in URLs (?type=). */
export const inquiryTypes = [
  { value: 'tractor-rental', label: 'Tractor Rental' },
  { value: 'agricultural-machinery', label: 'Agricultural Machinery' },
  { value: 'water-pumps-motors', label: 'Water Pumps & Motors' },
  { value: 'irrigation-equipment', label: 'Irrigation Equipment' },
  { value: 'farming-tools', label: 'Farming Tools' },
  { value: 'equipment-purchase', label: 'Equipment Purchase' },
  { value: 'other', label: 'Other Agricultural Equipment' },
]

/**
 * Equipment & service categories.
 *  - `id` doubles as the anchor on /services (e.g. /services#tractor-rental)
 *  - `inquiry` pre-selects the inquiry type on /contact
 *  - `anchor` lets a home category point at a related services section
 */
export const services = [
  {
    id: 'tractor-rental',
    number: '01',
    icon: 'Tractor',
    title: 'Tractor Rental',
    fullTitle: 'Tractor Rental Services',
    short: 'Enquire about tractors on rent for ploughing, tilling, haulage and seasonal field work.',
    description:
      'Field preparation and haulage often call for a tractor only part of the year. Share your field size, the work you plan and the dates you have in mind, and our team will discuss suitable tractor rental options with you.',
    features: [
      'Rental enquiries for ploughing, tilling and land preparation',
      'Support for seasonal and short-term requirements',
      'Discussion of compatible implements and attachments',
      'Guidance based on your field size and type of work',
    ],
    image: img.tractorEgrets,
    gallery: [img.tractorPlough, img.redTractor, img.tractorSunlit],
    inquiry: 'tractor-rental',
  },
  {
    id: 'agricultural-machinery',
    number: '02',
    icon: 'Cog',
    title: 'Agricultural Machinery',
    fullTitle: 'Agricultural Machinery',
    short: 'Machinery for land preparation, sowing, crop care and harvest-season operations.',
    description:
      'From tillage to harvest, the right machine saves time and labour. Tell us which stage of the crop cycle you are working on and we will help you explore machinery that fits the job.',
    features: [
      'Land preparation and tillage machinery',
      'Sowing, planting and crop-care equipment',
      'Harvest-season machinery enquiries',
      'Help matching machines to your farming operation',
    ],
    image: img.combineDrone,
    gallery: [img.tractorCultivating, img.machineryExpo, img.combineSun],
    inquiry: 'agricultural-machinery',
  },
  {
    id: 'water-pumps-motors',
    number: '03',
    icon: 'Droplets',
    title: 'Water Pumps & Motors',
    fullTitle: 'Water Pumps & Motors',
    short: 'Pumping equipment and motors for wells, borewells, canals and field water supply.',
    description:
      'Dependable water supply is the backbone of every season. Share your water source, the area you need to cover and your power availability, and we can help you explore suitable pumps and motors.',
    features: [
      'Agricultural water pumps for different water sources',
      'Motors and pumping sets for farm use',
      'Options discussed around your power availability',
      'Support for farm water-management requirements',
    ],
    image: img.dieselPump,
    gallery: [img.irrigationPump, img.pumpHose],
    inquiry: 'water-pumps-motors',
  },
  {
    id: 'irrigation-equipment',
    number: '04',
    icon: 'Sprout',
    title: 'Irrigation Equipment',
    fullTitle: 'Irrigation Equipment',
    short: 'Sprinklers, drip lines, pipes and fittings to move water where your crops need it.',
    description:
      'Efficient irrigation helps every drop count. Whether you are planning sprinklers, drip lines or a simple pipe network, tell us about your crop and field layout so we can discuss suitable equipment.',
    features: [
      'Sprinkler and drip irrigation equipment',
      'Pipes, fittings and water distribution accessories',
      'Equipment discussed for your crop and field layout',
      'Irrigation accessories and replacement parts enquiries',
    ],
    image: img.sprinklersFarm,
    gallery: [img.dripIrrigation, img.irrigationSystem, img.sprinklerClose, img.paddyIrrigation],
    inquiry: 'irrigation-equipment',
  },
  {
    id: 'farming-tools',
    number: '05',
    icon: 'Shovel',
    title: 'Farming Tools & Implements',
    fullTitle: 'Farming Tools & Implements',
    short: 'Hand tools, field implements and attachments for everyday farm work.',
    description:
      'Not every job needs a big machine. Reliable hand tools and tractor-mounted implements keep daily field work moving — tell us what you need and we will help you find the right fit.',
    features: [
      'Hand tools for everyday field work',
      'Tractor-mounted implements and attachments',
      'Field preparation equipment',
      'Essential agricultural instruments',
    ],
    image: img.ploughEquipment,
    gallery: [img.hoeShovel, img.shovelTrench, img.harrowing],
    inquiry: 'farming-tools',
  },
  {
    id: 'equipment-supply',
    number: '06',
    icon: 'PackageCheck',
    title: 'Agricultural Equipment Supply',
    fullTitle: 'Agricultural Equipment Supply',
    short: 'Supply enquiries for essential farm equipment, machinery and accessories.',
    description:
      'Looking to own equipment rather than rent it? Share the equipment category and quantity you are looking for, and our team will follow up on your supply enquiry.',
    features: [
      'Supply enquiries for essential farming equipment',
      'Machinery accessories and spare parts enquiries',
      'Multiple equipment categories under one enquiry',
      'Direct follow-up on your specific requirement',
    ],
    image: img.machinerySales,
    gallery: [img.blueMachinery, img.tractorDetail],
    inquiry: 'equipment-purchase',
  },
  {
    id: 'machinery-accessories',
    number: '07',
    icon: 'Wrench',
    title: 'Farm Machinery Accessories',
    fullTitle: 'Farm Machinery Accessories',
    short: 'Attachments, fittings and accessories that keep your machines working.',
    description:
      'Attachments, fittings and accessories for tractors and farm machinery. Enquire through our equipment supply service.',
    features: [],
    image: img.blueMachinery,
    gallery: [],
    inquiry: 'equipment-purchase',
    anchor: 'equipment-supply',
    homeOnly: true,
  },
  {
    id: 'other-equipment',
    number: '07',
    icon: 'LayoutGrid',
    title: 'Other Farming Equipment',
    fullTitle: 'Other Farming Equipment',
    short: 'Need something not listed? Tell us — we will discuss your requirement.',
    description:
      'Farming needs vary from region to region and crop to crop. If the equipment you need is not listed above, send us the details and our team will discuss your requirement with you.',
    features: [
      'Equipment and machinery not listed above',
      'Region- and crop-specific requirements',
      'Combined requirements across categories',
    ],
    // EDIT: add more equipment types here as your catalogue grows.
    examples: ['Sprayers', 'Threshers', 'Power tillers', 'Trailers', 'Seed drills', 'Chaff cutters'],
    image: img.fieldWorkers,
    gallery: [],
    inquiry: 'other',
  },
]

export const servicePageList = services.filter((s) => !s.homeOnly)
export const getService = (id) => services.find((s) => s.id === id)
