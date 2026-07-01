// Real YATEX platform photography. Static imports so next/image can auto-derive
// intrinsic width/height and generate blur-up placeholders for these large PNGs.
import type { StaticImageData } from "next/image";

import warehouseBales from "../../public/warehouse-bales.png";
import sortingTeam from "../../public/sorting-team.png";
import baledStock from "../../public/baled-stock.png";
import lingerie from "../../public/lingerie.png";
import blankets from "../../public/blankets.png";
import jeansCart from "../../public/jeans-cart.png";
import tshirtsGraded from "../../public/tshirts-graded.png";
import sortingTables from "../../public/sorting-tables.png";
import bulkArrival from "../../public/bulk-arrival.png";
import trousersStacks from "../../public/trousers-stacks.png";
import flannelCart from "../../public/flannel-cart.png";
import polosSport from "../../public/polos-sport.png";
import mixedFolded from "../../public/mixed-folded.png";
import mensShirts from "../../public/mens-shirts.png";
import shirtsStacks from "../../public/shirts-stacks.png";
import shirtsGrade from "../../public/shirts-grade.png";
import sortingHall from "../../public/sorting-hall.png";
import homeLinen from "../../public/home-linen.png";
import bedLinen from "../../public/bed-linen.png";
import linenCart from "../../public/linen-cart.png";
import winterCoats from "../../public/winter-coats.png";
import winterDenim from "../../public/winter-denim.png";
import outerwearSorting from "../../public/outerwear-sorting.png";
import workwearHivis from "../../public/workwear-hivis.png";

// Highlights placed individually across the page.
export const IMG = {
  warehouseBales, // Hero — mountain of baled stock
  sortingHall, // About — sorting hall, at scale
  bulkArrival, // Process 01 — Collecte
  sortingTeam, // Process 02 — Tri
  baledStock, // Process 03 — Conditionnement
  linenCart, // Process 04 — Expédition
};

// crop drives the tile's aspect in the masonry: undefined = natural portrait,
// "sq" = square, "wide" = landscape. Mixed heights give the wall its rhythm.
export type Shot = {
  src: StaticImageData;
  capKey: string;
  crop?: "sq" | "wide";
};

// Gallery wall — the remaining photography, interleaved by product family so
// similar shots never sit next to each other, with crops alternated so no
// column reads as a uniform stack.
export const GALLERY: Shot[] = [
  { src: mensShirts, capKey: "gal.cap.mens-shirts" },
  { src: jeansCart, capKey: "gal.cap.jeans" },
  { src: winterCoats, capKey: "gal.cap.winter", crop: "sq" },
  { src: lingerie, capKey: "gal.cap.lingerie" },
  { src: homeLinen, capKey: "gal.cap.home-linen", crop: "wide" },
  { src: tshirtsGraded, capKey: "gal.cap.tshirts" },
  { src: outerwearSorting, capKey: "gal.cap.outerwear", crop: "sq" },
  { src: trousersStacks, capKey: "gal.cap.trousers" },
  { src: bedLinen, capKey: "gal.cap.bed-linen" },
  { src: shirtsStacks, capKey: "gal.cap.shirts-stacks", crop: "sq" },
  { src: blankets, capKey: "gal.cap.blankets" },
  { src: polosSport, capKey: "gal.cap.polos", crop: "wide" },
  { src: winterDenim, capKey: "gal.cap.winter-denim" },
  { src: sortingTables, capKey: "gal.cap.sorting-tables", crop: "sq" },
  { src: flannelCart, capKey: "gal.cap.flannel" },
  { src: workwearHivis, capKey: "gal.cap.workwear" },
  { src: shirtsGrade, capKey: "gal.cap.shirts-grade", crop: "sq" },
  { src: mixedFolded, capKey: "gal.cap.mixed" },
];
