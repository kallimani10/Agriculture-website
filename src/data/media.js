/**
 * All imagery and video are royalty-free from Pexels (https://www.pexels.com/license/).
 * Each entry keeps its Pexels ID so the original page can be traced:
 *   https://www.pexels.com/photo/<id>/
 */
const PX = 'https://images.pexels.com/photos'

export const px = (id, w = 1200, h) =>
  `${PX}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${h ? `&h=${h}&fit=crop` : ''}`

export const pxSrcSet = (id, widths = [480, 800, 1200, 1800]) =>
  widths.map((w) => `${px(id, w)} ${w}w`).join(', ')

export const img = {
  tractorPlough: 18135422, // Tractor ploughing a field (India)
  tractorEgrets: 41098874, // Farmer on tractor ploughing with egrets
  tractorSunlit: 37766384, // Tractor in a sunlit field
  redTractor: 20327958, // Farmers on a red tractor, India
  womenTractor: 20445171, // Women farmers beside a tractor, India
  farmerIndia: 20445169, // Farmer in India
  paddyFarmer: 29039798, // Indian farmer working in paddy field
  ricePlanting: 38117330, // Rice planting, Maharajganj
  fertilizer: 20238488, // Farmer distributing fertiliser, India
  spraying: 14944259, // Farmer spraying crop
  harvestSmile: 30260658, // Smiling farmer harvesting rice
  fieldWorkers: 36042030, // Farmers working in agricultural field
  dieselPump: 28240873, // Diesel water pump on a farm
  irrigationPump: 36834230, // Rural irrigation pump in green fields
  pumpHose: 32489252, // Pump and hose equipment
  sprinklerClose: 17765487, // Sprinkler on field
  sprinklersField: 18699404, // Sprinklers watering the field
  sprinklersFarm: 12532707, // Agricultural sprinklers on a farm
  irrigationSystem: 33881124, // Farm irrigation system at work
  irrigationField: 34182297, // Irrigation system on a farm field
  dripIrrigation: 29396001, // Drip irrigation lines
  paddyIrrigation: 35702549, // Paddy field with irrigation
  shovelTrench: 32938383, // Shovel in a trench, green field
  hoeShovel: 30790235, // Shovel and hoe
  hoe: 38050997, // Rustic hoe
  ploughEquipment: 40647858, // Close-up of ploughing equipment
  blueMachinery: 40647857, // Close-up of blue agricultural machinery
  machineryExpo: 19192256, // Farming machinery display
  tractorFarm: 19192242, // Tractor on a farm
  combineDrone: 18431220, // Drone shot of a combine harvester
  combineSun: 27037415, // Combine in sunlight
  tractorCultivating: 24260689, // Tractor cultivating the field
  tractorGreen: 6020273, // Tractor ploughing a green field
  keralaPaddy: 34961113, // Kerala paddy fields
  palakkad: 33013654, // Palakkad paddy fields, Kerala
  paddyPalms: 29988892, // Rice fields under palm leaves, India
  harvestSunset: 41177878, // Harvest in paddy field at sunset
  machinerySales: 5622362, // Customer looking at agricultural machinery
  tractorDetail: 5623214, // Close-up of a tractor
  harrowing: 19137268, // Harrowing a field
}

/** Hero video — Pexels #4404131 (aerial: tractor working farmland). Native 3840×2160. */
export const heroVideo = {
  pexelsPage: 'https://www.pexels.com/video/a-tractor-on-the-farm-4404131/',
  uhd: 'https://videos.pexels.com/video-files/4404131/4404131-uhd_3840_2160_24fps.mp4', // 4K (~35 MB)
  hd: 'https://videos.pexels.com/video-files/4404131/4404131-hd_1920_1080_24fps.mp4', // 1080p (~8 MB)
  sd: 'https://videos.pexels.com/video-files/4404131/4404131-sd_960_540_24fps.mp4', // 540p (~1 MB)
  poster: px(img.tractorPlough, 1600),
}

/** Services hero video — Pexels #4380227 (aerial: farm tractor working the field). Native 3840×2160.
 *  The 1080p rendition is streamed on tablets/desktops only; phones get the poster image. */
export const servicesVideo = {
  pexelsPage: 'https://www.pexels.com/video/a-farm-tractor-working-in-the-field-4380227/',
  uhd: 'https://videos.pexels.com/video-files/4380227/4380227-uhd_3840_2160_24fps.mp4', // 4K (~109 MB)
  hd: 'https://videos.pexels.com/video-files/4380227/4380227-hd_1920_1080_24fps.mp4', // 1080p (~26 MB)
  poster: px(img.tractorCultivating, 1600),
}
