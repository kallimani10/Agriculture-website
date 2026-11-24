import {
  Tractor, Cog, Droplets, Sprout, Shovel, PackageCheck, Wrench, LayoutGrid,
} from 'lucide-react'

/** Map of icon names used in data files → Lucide components. */
export const iconMap = { Tractor, Cog, Droplets, Sprout, Shovel, PackageCheck, Wrench, LayoutGrid }
export const getIcon = (name) => iconMap[name] || LayoutGrid
