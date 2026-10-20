export type SceneId =
  | 'hero_resort_sunset'
  | 'room_deluxe'
  | 'room_ocean_suite'
  | 'room_pool_villa'
  | 'room_family_suite'
  | 'room_penthouse'
  | 'room_cliff_bungalow'
  | 'destination_beach_resort'
  | 'exp_spa_wellness'
  | 'exp_culinary'
  | 'exp_adventure'
  | 'exp_culture'
  | 'advantage_sunset_pool'
  | 'offer_banner_sunset'
  | 'avatar_sarah'
  | 'avatar_marcus'
  | 'avatar_elena';

const imageCache: Partial<Record<SceneId, string>> = {};

function pseudoRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function drawMountainRidge(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  points: [number, number][],
  fillStyle: string | CanvasGradient
) {
  ctx.beginPath();
  ctx.moveTo(points[0][0] * w, points[0][1] * h);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const xc = ((prev[0] + curr[0]) / 2) * w;
    const yc = ((prev[1] + curr[1]) / 2) * h;
    ctx.quadraticCurveTo(prev[0] * w, prev[1] * h, xc, yc);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last[0] * w, last[1] * h);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function drawWaterShimmer(
  ctx: CanvasRenderingContext2D,
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
  sunX: number,
  color: string,
  count = 180,
  seed = 42
) {
  const rand = pseudoRandom(seed);
  ctx.save();
  for (let i = 0; i < count; i++) {
    const t = rand();
    const y = yStart + t * (yEnd - yStart);
    const spread = 40 + t * (xEnd - xStart) * 0.45;
    const x = sunX + (rand() - 0.5) * spread;
    const len = 8 + rand() * 38 * (0.4 + t);
    ctx.fillStyle = color;
    ctx.globalAlpha = (1 - t * 0.6) * (0.25 + rand() * 0.45);
    ctx.fillRect(x, y, len, 1.5 + rand() * 1.5);
  }
  ctx.restore();
}

function drawPalmFronds(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  const angles = [-2.4, -1.9, -1.4, -0.8, -0.3, 0.2];
  for (const angle of angles) {
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(45, -18, 95, 10);
    ctx.lineWidth = 2.5;
    ctx.stroke();
    for (let d = 10; d < 90; d += 5) {
      const leafLen = Math.sin((d / 90) * Math.PI) * 18;
      ctx.beginPath();
      ctx.moveTo(d, -d * 0.08);
      ctx.lineTo(d + 4, -d * 0.08 - leafLen);
      ctx.lineTo(d + 7, -d * 0.08);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(d, -d * 0.08);
      ctx.lineTo(d + 3, -d * 0.08 + leafLen * 0.8);
      ctx.lineTo(d + 6, -d * 0.08);
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();
}

function renderHeroSunset(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Sky gradient matching reference golden sunset & twilight blue
  const sky = ctx.createLinearGradient(0, 0, w * 0.65, h * 0.58);
  sky.addColorStop(0, '#163D5C');
  sky.addColorStop(0.38, '#3B698C');
  sky.addColorStop(0.68, '#8BA4BA');
  sky.addColorStop(0.86, '#F2C08B');
  sky.addColorStop(1, '#FCE3B4');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.6);

  // Warm sun glow near cliff shoulder
  const sunX = w * 0.64;
  const sunY = h * 0.42;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, w * 0.35);
  sunGlow.addColorStop(0, 'rgba(255, 246, 214, 0.98)');
  sunGlow.addColorStop(0.25, 'rgba(255, 198, 125, 0.72)');
  sunGlow.addColorStop(0.6, 'rgba(235, 145, 95, 0.25)');
  sunGlow.addColorStop(1, 'rgba(22, 61, 92, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, w, h * 0.65);

  // Soft clouds in upper sky
  const rand = pseudoRandom(101);
  for (let i = 0; i < 18; i++) {
    const cx = rand() * w * 0.85;
    const cy = h * (0.08 + rand() * 0.28);
    const rw = 90 + rand() * 220;
    const rh = 14 + rand() * 28;
    const cg = ctx.createRadialGradient(cx, cy, 4, cx, cy, rw);
    cg.addColorStop(0, 'rgba(255, 225, 195, 0.18)');
    cg.addColorStop(1, 'rgba(255, 225, 195, 0)');
    ctx.fillStyle = cg;
    ctx.fillRect(cx - rw, cy - rh, rw * 2, rh * 2);
  }

  // Distant coastal mountains
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0.35, 0.53],
      [0.42, 0.46],
      [0.49, 0.44],
      [0.57, 0.39],
      [0.66, 0.34],
      [0.76, 0.27],
      [0.9, 0.23],
      [1.0, 0.25],
    ],
    '#334E63'
  );

  // Midground lush cliffside
  const cliffGrad = ctx.createLinearGradient(w * 0.45, h * 0.3, w, h * 0.62);
  cliffGrad.addColorStop(0, '#3D5258');
  cliffGrad.addColorStop(0.5, '#253942');
  cliffGrad.addColorStop(1, '#14262E');
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0.44, 0.56],
      [0.48, 0.49],
      [0.54, 0.47],
      [0.61, 0.41],
      [0.7, 0.31],
      [0.82, 0.21],
      [1.0, 0.18],
    ],
    cliffGrad
  );

  // Deep blue ocean bay on the left/center
  const oceanY = h * 0.52;
  const oceanGrad = ctx.createLinearGradient(0, oceanY, w * 0.75, h);
  oceanGrad.addColorStop(0, '#0B3551');
  oceanGrad.addColorStop(0.45, '#154B6B');
  oceanGrad.addColorStop(0.8, '#1B5A7A');
  oceanGrad.addColorStop(1, '#0A293E');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, oceanY, w, h - oceanY);

  // Golden sunset reflection on ocean
  drawWaterShimmer(ctx, w * 0.25, w * 0.68, oceanY + 4, h * 0.78, w * 0.52, '#FAD29B', 220, 77);

  // Rocky cove coastline edge in center
  ctx.fillStyle = '#182C34';
  ctx.beginPath();
  ctx.moveTo(w * 0.39, h * 0.66);
  ctx.quadraticCurveTo(w * 0.48, h * 0.61, w * 0.58, h * 0.56);
  ctx.lineTo(w * 0.78, h * 0.55);
  ctx.lineTo(w * 0.65, h * 0.69);
  ctx.closePath();
  ctx.fill();

  // Infinity pool deck & water in foreground right-to-center
  const poolTop = h * 0.58;
  const poolLeft = w * 0.48;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(poolLeft, poolTop);
  ctx.lineTo(w * 0.96, poolTop - 12);
  ctx.lineTo(w, h * 0.92);
  ctx.lineTo(w * 0.22, h);
  ctx.closePath();
  const poolWater = ctx.createLinearGradient(poolLeft, poolTop, w, h);
  poolWater.addColorStop(0, '#2C728E');
  poolWater.addColorStop(0.4, '#1D5E7A');
  poolWater.addColorStop(0.75, '#194E68');
  poolWater.addColorStop(1, '#0F364C');
  ctx.fillStyle = poolWater;
  ctx.fill();

  // Warm villa light reflection inside infinity pool
  const villaReflect = ctx.createLinearGradient(w * 0.72, poolTop, w * 0.92, h * 0.9);
  villaReflect.addColorStop(0, 'rgba(255, 195, 110, 0.55)');
  villaReflect.addColorStop(0.6, 'rgba(255, 170, 85, 0.22)');
  villaReflect.addColorStop(1, 'rgba(255, 170, 85, 0)');
  ctx.fillStyle = villaReflect;
  ctx.fillRect(w * 0.68, poolTop, w * 0.26, h * 0.35);
  ctx.restore();

  // Modern Luxury Cliffside Villa on the right (matching reference image)
  const vx = w * 0.71;
  const vy = h * 0.26;
  const vw = w * 0.29;
  const vh = h * 0.31;

  // Overhanging cantilevers roof
  ctx.fillStyle = '#2B2927';
  ctx.beginPath();
  ctx.moveTo(vx - 28, vy);
  ctx.lineTo(w, vy - 18);
  ctx.lineTo(w, vy + 14);
  ctx.lineTo(vx - 16, vy + 20);
  ctx.closePath();
  ctx.fill();

  // Warm illuminated ceiling soffit
  const soffit = ctx.createLinearGradient(vx, vy + 12, w, vy + 32);
  soffit.addColorStop(0, '#D9A066');
  soffit.addColorStop(0.5, '#F5C78E');
  soffit.addColorStop(1, '#B87D48');
  ctx.fillStyle = soffit;
  ctx.fillRect(vx - 12, vy + 14, vw + 12, 16);

  // Interior glowing room
  const roomGlow = ctx.createLinearGradient(vx + 20, vy + 30, vx + vw, vy + vh);
  roomGlow.addColorStop(0, '#FCE0B0');
  roomGlow.addColorStop(0.5, '#E8AD66');
  roomGlow.addColorStop(1, '#B57438');
  ctx.fillStyle = roomGlow;
  ctx.fillRect(vx + 18, vy + 30, vw - 18, vh - 38);

  // Villa interior bed & artwork details
  ctx.fillStyle = '#754A28';
  ctx.fillRect(vx + 85, vy + 68, 95, 55);
  ctx.fillStyle = '#FFF7EA';
  ctx.fillRect(vx + 92, vy + 92, 82, 34);
  ctx.strokeStyle = '#3D2718';
  ctx.lineWidth = 3;
  ctx.strokeRect(vx + 120, vy + 46, 36, 26);

  // Structural columns & glass mullions
  ctx.fillStyle = '#262320';
  ctx.fillRect(vx + 14, vy + 24, 12, vh - 28);
  ctx.fillRect(vx + 145, vy + 22, 10, vh - 26);
  ctx.fillRect(vx + 260, vy + 20, 12, vh - 24);

  // Villa patio deck & lounge chairs
  ctx.fillStyle = '#8C7055';
  ctx.fillRect(vx - 35, vy + vh - 12, vw + 35, 22);
  // Outdoor lounge sofas
  for (let i = 0; i < 3; i++) {
    const lx = vx + 10 + i * 74;
    const ly = vy + vh - 34;
    ctx.fillStyle = '#4A3B2F';
    ctx.fillRect(lx, ly + 12, 58, 12);
    ctx.fillStyle = '#E6D7C3';
    ctx.fillRect(lx + 4, ly + 2, 50, 12);
  }

  // Stone planter & lush tropical bushes in bottom right corner
  ctx.fillStyle = '#8B7969';
  ctx.beginPath();
  ctx.moveTo(w * 0.74, h * 0.85);
  ctx.lineTo(w * 0.96, h * 0.72);
  ctx.lineTo(w, h * 0.76);
  ctx.lineTo(w, h);
  ctx.lineTo(w * 0.69, h);
  ctx.closePath();
  ctx.fill();

  // Tropical foliage in the right planter & behind villa
  drawPalmFronds(ctx, w * 0.83, h * 0.22, 1.3, '#1E3124');
  drawPalmFronds(ctx, w * 0.92, h * 0.2, 1.5, '#16261B');
  drawPalmFronds(ctx, w * 0.86, h * 0.86, 1.2, '#1D3522');
  drawPalmFronds(ctx, w * 0.94, h * 0.82, 1.35, '#29472B');
}

function renderHotelRoom(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  variant: 'deluxe' | 'ocean_suite' | 'pool_villa' | 'family_suite' | 'penthouse' | 'cliff_bungalow'
) {
  if (variant === 'pool_villa') {
    // Tropical outdoor Private Pool Villa scene
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.48);
    sky.addColorStop(0, '#3A7BD5');
    sky.addColorStop(0.6, '#7EB6E6');
    sky.addColorStop(1, '#C9E4F7');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Tropical greenery backdrop
    ctx.fillStyle = '#254C2E';
    ctx.fillRect(0, h * 0.34, w, h * 0.25);
    drawPalmFronds(ctx, w * 0.14, h * 0.22, 1.6, '#1E4627');
    drawPalmFronds(ctx, w * 0.85, h * 0.24, 1.5, '#275731');

    // Balinese timber roof pavilion
    ctx.fillStyle = '#4A3628';
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.36);
    ctx.lineTo(w * 0.48, h * 0.16);
    ctx.lineTo(w * 0.82, h * 0.36);
    ctx.closePath();
    ctx.fill();

    // Glowing villa interior
    const glow = ctx.createLinearGradient(w * 0.22, h * 0.36, w * 0.75, h * 0.58);
    glow.addColorStop(0, '#FBE2B4');
    glow.addColorStop(1, '#D99B52');
    ctx.fillStyle = glow;
    ctx.fillRect(w * 0.22, h * 0.36, w * 0.54, h * 0.21);

    // Wooden columns
    ctx.fillStyle = '#3B281B';
    for (const cx of [0.23, 0.39, 0.56, 0.74]) {
      ctx.fillRect(w * cx, h * 0.36, 8, h * 0.21);
    }

    // Timber pool deck
    ctx.fillStyle = '#B89672';
    ctx.fillRect(0, h * 0.56, w, h * 0.12);

    // Sparkling turquoise swimming pool in foreground
    const pool = ctx.createLinearGradient(0, h * 0.62, w, h);
    pool.addColorStop(0, '#1CA3C4');
    pool.addColorStop(0.5, '#1588A8');
    pool.addColorStop(1, '#0D637D');
    ctx.fillStyle = pool;
    ctx.beginPath();
    ctx.moveTo(w * 0.08, h * 0.63);
    ctx.lineTo(w * 0.92, h * 0.6);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    drawWaterShimmer(ctx, w * 0.15, w * 0.85, h * 0.64, h * 0.96, w * 0.5, '#BFF3FF', 120, 99);
    return;
  }

  // Warm luxury interior room base (walls, ceiling, hardwood floor)
  ctx.fillStyle = '#F2ECE1';
  ctx.fillRect(0, 0, w, h * 0.16); // Ceiling

  ctx.fillStyle = '#E6DEC8';
  ctx.fillRect(0, h * 0.14, w, h * 0.58); // Back wall

  // Warm hardwood/travertine floor
  const floor = ctx.createLinearGradient(0, h * 0.68, 0, h);
  floor.addColorStop(0, '#B58E65');
  floor.addColorStop(0.5, '#9A724B');
  floor.addColorStop(1, '#7A5636');
  ctx.fillStyle = floor;
  ctx.fillRect(0, h * 0.68, w, h * 0.32);

  // Soft area rug
  ctx.fillStyle = '#DFD5C5';
  ctx.beginPath();
  ctx.moveTo(w * 0.15, h * 0.74);
  ctx.lineTo(w * 0.88, h * 0.74);
  ctx.lineTo(w * 0.96, h * 0.98);
  ctx.lineTo(w * 0.05, h * 0.98);
  ctx.closePath();
  ctx.fill();

  // Panoramic Ocean View Window
  const winX = variant === 'family_suite' ? w * 0.52 : w * 0.08;
  const winW = variant === 'ocean_suite' ? w * 0.68 : w * 0.46;
  const winY = h * 0.16;
  const winH = h * 0.54;

  // Sky & ocean inside window
  const winSky = ctx.createLinearGradient(winX, winY, winX, winY + winH * 0.55);
  winSky.addColorStop(0, '#4F93CE');
  winSky.addColorStop(0.6, '#90C2E7');
  winSky.addColorStop(1, '#D8ECF8');
  ctx.fillStyle = winSky;
  ctx.fillRect(winX, winY, winW, winH * 0.55);

  // Distant island silhouette in window
  ctx.fillStyle = '#4A6E8A';
  ctx.beginPath();
  ctx.moveTo(winX + winW * 0.1, winY + winH * 0.55);
  ctx.quadraticCurveTo(winX + winW * 0.38, winY + winH * 0.4, winX + winW * 0.72, winY + winH * 0.55);
  ctx.fill();

  // Turquoise ocean water in window
  const winSea = ctx.createLinearGradient(winX, winY + winH * 0.55, winX, winY + winH);
  winSea.addColorStop(0, '#12769E');
  winSea.addColorStop(0.5, '#1E96B8');
  winSea.addColorStop(1, '#3DB5CD');
  ctx.fillStyle = winSea;
  ctx.fillRect(winX, winY + winH * 0.55, winW, winH * 0.45);

  // Balcony glass railing & mullions
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(winX + 4, winY + winH * 0.72, winW - 8, winH * 0.26);
  ctx.strokeStyle = '#382B22';
  ctx.lineWidth = 5;
  ctx.strokeRect(winX, winY, winW, winH);
  ctx.beginPath();
  ctx.moveTo(winX + winW * 0.5, winY);
  ctx.lineTo(winX + winW * 0.5, winY + winH);
  ctx.stroke();

  // Sheer linen curtains flanking window
  ctx.fillStyle = 'rgba(255, 252, 245, 0.78)';
  ctx.fillRect(winX - 14, winY - 6, 28, winH + 12);
  ctx.fillRect(winX + winW - 14, winY - 6, 28, winH + 12);

  if (variant === 'deluxe' || variant === 'penthouse' || variant === 'cliff_bungalow') {
    // Luxury King Bed on the right
    const bx = w * 0.52;
    const by = h * 0.42;
    // Wood headboard
    ctx.fillStyle = '#6E4C30';
    ctx.fillRect(bx + 18, by - 24, w * 0.42, 55);
    // Framed coastal art above headboard
    ctx.fillStyle = '#D9E4EC';
    ctx.fillRect(bx + 65, by - 95, 110, 56);
    ctx.strokeStyle = '#5C4028';
    ctx.lineWidth = 3;
    ctx.strokeRect(bx + 65, by - 95, 110, 56);
    // Mattress & crisp white duvet
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(bx, by + 22, w * 0.44, h * 0.34, 8);
    ctx.fill();
    // Warm gold throw blanket & pillows
    ctx.fillStyle = '#C9934B';
    ctx.fillRect(bx + 6, by + 76, w * 0.42, 36);
    ctx.fillStyle = '#F7F3EB';
    ctx.fillRect(bx + 30, by + 8, 70, 22);
    ctx.fillRect(bx + 115, by + 8, 70, 22);
    // Cozy armchair in left foreground
    ctx.fillStyle = '#D6C6B2';
    ctx.beginPath();
    ctx.roundRect(w * 0.08, h * 0.58, 95, 85, 10);
    ctx.fill();
  } else {
    // Plush sectional living room sofa for Ocean View Suite & Family Suite
    const sx = variant === 'family_suite' ? w * 0.08 : w * 0.52;
    const sy = h * 0.52;
    ctx.fillStyle = '#DDD1C0';
    ctx.beginPath();
    ctx.roundRect(sx, sy, w * 0.42, h * 0.28, 10);
    ctx.fill();
    // Throw cushions
    ctx.fillStyle = '#B87A3D';
    ctx.fillRect(sx + 18, sy + 12, 34, 28);
    ctx.fillStyle = '#2B5B78';
    ctx.fillRect(sx + 65, sy + 12, 34, 28);
    // Wooden coffee table
    ctx.fillStyle = '#593A22';
    ctx.fillRect(w * 0.34, h * 0.72, 120, 42);
    // Framed botanical art on left wall for Family Suite
    if (variant === 'family_suite') {
      for (let i = 0; i < 2; i++) {
        const ax = w * 0.1 + i * 95;
        ctx.fillStyle = '#F5EFE6';
        ctx.fillRect(ax, h * 0.22, 74, 92);
        ctx.strokeStyle = '#6B4C32';
        ctx.lineWidth = 3;
        ctx.strokeRect(ax, h * 0.22, 74, 92);
      }
    }
  }
}

function renderDestinationBali(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Sunset sky over Bali limestone cliffs
  const sky = ctx.createLinearGradient(0, 0, w, h * 0.45);
  sky.addColorStop(0, '#0D2A42');
  sky.addColorStop(0.45, '#2E5B7D');
  sky.addColorStop(0.75, '#C88E68');
  sky.addColorStop(1, '#FBE0A8');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.48);

  // Radiant golden sun on right horizon
  const sunX = w * 0.82;
  const sunY = h * 0.35;
  const sun = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, w * 0.36);
  sun.addColorStop(0, 'rgba(255, 250, 220, 1)');
  sun.addColorStop(0.3, 'rgba(255, 198, 120, 0.75)');
  sun.addColorStop(0.7, 'rgba(215, 130, 85, 0.2)');
  sun.addColorStop(1, 'rgba(13, 42, 66, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h * 0.65);

  // Turquoise ocean & lagoon cove
  const sea = ctx.createLinearGradient(0, h * 0.42, w, h);
  sea.addColorStop(0, '#0A3B59');
  sea.addColorStop(0.4, '#116B8A');
  sea.addColorStop(0.75, '#22A2B8');
  sea.addColorStop(1, '#0E485E');
  ctx.fillStyle = sea;
  ctx.fillRect(0, h * 0.42, w, h * 0.58);

  // White sandy beach cove curve & foam
  ctx.fillStyle = '#E8D5B7';
  ctx.beginPath();
  ctx.moveTo(w * 0.28, h * 0.72);
  ctx.quadraticCurveTo(w * 0.52, h * 0.68, w * 0.66, h * 0.85);
  ctx.lineTo(w * 0.45, h * 0.92);
  ctx.closePath();
  ctx.fill();

  // Towering Bali limestone cliff arch on left/center
  const cliff = ctx.createLinearGradient(0, h * 0.15, w * 0.65, h);
  cliff.addColorStop(0, '#2F4649');
  cliff.addColorStop(0.45, '#4A5D52');
  cliff.addColorStop(0.8, '#2A3F36');
  cliff.addColorStop(1, '#142421');
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0, 0.28],
      [0.18, 0.22],
      [0.36, 0.19],
      [0.5, 0.25],
      [0.64, 0.52],
      [0.78, 0.58],
      [0.85, 0.95],
      [0, 1.0],
    ],
    cliff
  );

  drawWaterShimmer(ctx, w * 0.55, w * 0.95, h * 0.44, h * 0.85, sunX, '#FDE1A8', 160, 55);
}

function renderExperienceCard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  type: 'spa' | 'culinary' | 'adventure' | 'culture'
) {
  if (type === 'spa') {
    // Warm serene spa & massage scene with plush white towel & candlelight
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#593E2B');
    bg.addColorStop(0.45, '#8A6245');
    bg.addColorStop(1, '#3B2618');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Soft white plush towel & spa pillow
    ctx.fillStyle = '#F7F3EE';
    ctx.beginPath();
    ctx.ellipse(w * 0.38, h * 0.48, w * 0.36, h * 0.22, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Relaxed guest shoulders & head silhouette in warm golden light
    const skin = ctx.createRadialGradient(w * 0.62, h * 0.52, 10, w * 0.55, h * 0.6, w * 0.35);
    skin.addColorStop(0, '#E8B48A');
    skin.addColorStop(0.6, '#C4885E');
    skin.addColorStop(1, '#7D4E32');
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.48, w * 0.18, h * 0.12, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.52, h * 0.68, w * 0.38, h * 0.16, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Crisp white spa sheet at bottom
    ctx.fillStyle = '#EFE9E0';
    ctx.fillRect(0, h * 0.78, w, h * 0.22);
    return;
  }

  if (type === 'culinary') {
    // Candlelit fine dining table
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#1D1410');
    bg.addColorStop(0.55, '#4A2C1D');
    bg.addColorStop(1, '#2B1910');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Warm bokeh lights in restaurant background
    const rand = pseudoRandom(303);
    for (let i = 0; i < 16; i++) {
      const bx = rand() * w;
      const by = rand() * h * 0.55;
      const br = 12 + rand() * 26;
      const g = ctx.createRadialGradient(bx, by, 2, bx, by, br);
      g.addColorStop(0, 'rgba(255, 210, 130, 0.75)');
      g.addColorStop(1, 'rgba(255, 180, 90, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(bx - br, by - br, br * 2, br * 2);
    }

    // Gourmet porcelain plates & crystal glasses on table
    ctx.fillStyle = '#F5EFE8';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.74, w * 0.34, h * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#B85D28';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.73, w * 0.18, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (type === 'adventure') {
    // Hiker overlooking coastal ridge & turquoise ocean
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
    sky.addColorStop(0, '#2B6CB0');
    sky.addColorStop(0.6, '#63B3ED');
    sky.addColorStop(1, '#BEE3F8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.55);

    const sea = ctx.createLinearGradient(0, h * 0.48, w, h);
    sea.addColorStop(0, '#1A6985');
    sea.addColorStop(1, '#2B9CB8');
    ctx.fillStyle = sea;
    ctx.fillRect(0, h * 0.48, w, h * 0.52);

    // Coastal mountain ridge
    drawMountainRidge(
      ctx,
      w,
      h,
      [
        [0, 0.65],
        [0.35, 0.52],
        [0.65, 0.6],
        [1, 0.45],
      ],
      '#2F5E4E'
    );
    drawMountainRidge(
      ctx,
      w,
      h,
      [
        [0, 0.82],
        [0.45, 0.68],
        [0.8, 0.75],
        [1, 0.85],
      ],
      '#1F3D2B'
    );

    // Hiker silhouette in center
    ctx.fillStyle = '#16242E';
    ctx.beginPath();
    ctx.arc(w * 0.54, h * 0.46, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(w * 0.51, h * 0.49, 20, 42);
    ctx.fillRect(w * 0.48, h * 0.5, 12, 28); // Backpack
    return;
  }

  // Local Culture: Traditional Balinese multi-tiered Meru temple at twilight
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#0F2942');
  sky.addColorStop(0.5, '#2C5270');
  sky.addColorStop(0.8, '#D98A54');
  sky.addColorStop(1, '#122638');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Pagoda tiers
  const cx = w * 0.52;
  ctx.fillStyle = '#1B1A20';
  for (let tier = 0; tier < 5; tier++) {
    const ty = h * 0.56 - tier * 34;
    const tw = (120 - tier * 18);
    ctx.beginPath();
    ctx.moveTo(cx - tw, ty);
    ctx.lineTo(cx, ty - 24);
    ctx.lineTo(cx + tw, ty);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(cx - tw * 0.6, ty, tw * 1.2, 16);
  }
  // Golden temple lights & water reflection
  const templeGlow = ctx.createRadialGradient(cx, h * 0.64, 5, cx, h * 0.64, w * 0.4);
  templeGlow.addColorStop(0, 'rgba(255, 200, 100, 0.9)');
  templeGlow.addColorStop(1, 'rgba(255, 160, 60, 0)');
  ctx.fillStyle = templeGlow;
  ctx.fillRect(0, h * 0.48, w, h * 0.4);
}

function renderAdvantageSunsetPool(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Golden hour sunset sky
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.56);
  sky.addColorStop(0, '#1C4668');
  sky.addColorStop(0.45, '#59829E');
  sky.addColorStop(0.8, '#E8A568');
  sky.addColorStop(1, '#FDE1A2');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.56);

  // Setting sun on horizon
  const sunX = w * 0.62;
  const sunY = h * 0.52;
  const sun = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, w * 0.28);
  sun.addColorStop(0, '#FFFBE0');
  sun.addColorStop(0.3, 'rgba(255, 190, 95, 0.85)');
  sun.addColorStop(1, 'rgba(255, 150, 70, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h * 0.7);

  // Coastal cliff silhouette in center-left
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0, 0.32],
      [0.25, 0.28],
      [0.42, 0.3],
      [0.54, 0.54],
      [0, 0.56],
    ],
    '#22343D'
  );

  // Ocean & infinity pool foreground
  const water = ctx.createLinearGradient(0, h * 0.53, 0, h);
  water.addColorStop(0, '#2B627D');
  water.addColorStop(0.4, '#184A63');
  water.addColorStop(1, '#0C2B3D');
  ctx.fillStyle = water;
  ctx.fillRect(0, h * 0.53, w, h * 0.47);

  drawWaterShimmer(ctx, w * 0.38, w * 0.88, h * 0.54, h * 0.95, sunX, '#FCD288', 190, 88);

  // Glowing timber resort cabanas on the left
  ctx.fillStyle = '#241A14';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.25);
  ctx.lineTo(w * 0.32, h * 0.38);
  ctx.lineTo(0, h * 0.42);
  ctx.closePath();
  ctx.fill();

  const cabanaGlow = ctx.createLinearGradient(0, h * 0.4, w * 0.28, h * 0.65);
  cabanaGlow.addColorStop(0, 'rgba(255, 185, 90, 0.85)');
  cabanaGlow.addColorStop(1, 'rgba(255, 150, 60, 0)');
  ctx.fillStyle = cabanaGlow;
  ctx.fillRect(0, h * 0.38, w * 0.28, h * 0.28);

  drawPalmFronds(ctx, w * 0.88, h * 0.62, 1.4, '#11222B');
}

function renderOfferBannerSunset(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Deep atmospheric twilight mountain & villa backdrop
  const sky = ctx.createLinearGradient(0, 0, w, h);
  sky.addColorStop(0, '#072235');
  sky.addColorStop(0.5, '#1D465E');
  sky.addColorStop(0.8, '#5A6D7C');
  sky.addColorStop(1, '#2D3A45');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Layered misty mountain peaks across center
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0, 0.48],
      [0.28, 0.35],
      [0.44, 0.18],
      [0.53, 0.08],
      [0.62, 0.24],
      [0.78, 0.32],
      [1, 0.38],
    ],
    '#243D4D'
  );
  drawMountainRidge(
    ctx,
    w,
    h,
    [
      [0, 0.62],
      [0.36, 0.44],
      [0.48, 0.28],
      [0.58, 0.48],
      [0.75, 0.56],
      [1, 0.6],
    ],
    '#152C3B'
  );

  // Glowing luxury timber pavilion on the right
  ctx.fillStyle = '#261B14';
  ctx.beginPath();
  ctx.moveTo(w * 0.68, h * 0.14);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h * 0.28);
  ctx.closePath();
  ctx.fill();

  const villaLight = ctx.createRadialGradient(w * 0.88, h * 0.42, 10, w * 0.88, h * 0.42, w * 0.22);
  villaLight.addColorStop(0, 'rgba(255, 190, 105, 0.85)');
  villaLight.addColorStop(0.5, 'rgba(215, 135, 65, 0.35)');
  villaLight.addColorStop(1, 'rgba(15, 35, 50, 0)');
  ctx.fillStyle = villaLight;
  ctx.fillRect(w * 0.65, h * 0.12, w * 0.35, h * 0.75);
}

function renderAvatar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  person: 'sarah' | 'marcus' | 'elena'
) {
  // Warm sunlit resort bokeh background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#9EC5DC');
  bg.addColorStop(0.5, '#DFD3C3');
  bg.addColorStop(1, '#8BA693');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.42;

  // Hair behind shoulders
  ctx.fillStyle = person === 'sarah' ? '#4A3222' : person === 'marcus' ? '#2C221E' : '#8C6239';
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.24, 0, Math.PI * 2);
  ctx.fill();
  if (person !== 'marcus') {
    ctx.fillRect(cx - w * 0.22, cy, w * 0.44, h * 0.36);
  }

  // Shoulders / linen resort attire
  ctx.fillStyle = person === 'sarah' ? '#F7F4EF' : person === 'marcus' ? '#1B3B52' : '#E5D6C5';
  ctx.beginPath();
  ctx.ellipse(cx, h * 0.92, w * 0.36, h * 0.26, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  // Neck & warm portrait face
  ctx.fillStyle = '#DBA786';
  ctx.fillRect(cx - w * 0.06, cy + h * 0.1, w * 0.12, h * 0.16);
  ctx.fillStyle = '#EBC0A2';
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.16, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair framing face
  ctx.fillStyle = person === 'sarah' ? '#4A3222' : person === 'marcus' ? '#2C221E' : '#8C6239';
  ctx.beginPath();
  ctx.arc(cx, cy - h * 0.05, w * 0.165, Math.PI * 0.95, Math.PI * 2.05);
  ctx.fill();

  // Subtle facial features (eyes & warm smile)
  ctx.fillStyle = '#36261D';
  ctx.beginPath();
  ctx.arc(cx - w * 0.055, cy - h * 0.01, 3.5, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.055, cy - h * 0.01, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#B86B58';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.05, w * 0.055, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}

export function getResortImage(scene: SceneId): string {
  if (imageCache[scene]) {
    return imageCache[scene]!;
  }
  if (typeof document === 'undefined') {
    return '';
  }

  const dimensions: Record<SceneId, [number, number]> = {
    hero_resort_sunset: [1440, 820],
    room_deluxe: [640, 460],
    room_ocean_suite: [640, 460],
    room_pool_villa: [640, 460],
    room_family_suite: [640, 460],
    room_penthouse: [640, 460],
    room_cliff_bungalow: [640, 460],
    destination_beach_resort: [900, 620],
    exp_spa_wellness: [420, 520],
    exp_culinary: [420, 520],
    exp_adventure: [420, 520],
    exp_culture: [420, 520],
    advantage_sunset_pool: [800, 560],
    offer_banner_sunset: [1440, 460],
    avatar_sarah: [240, 240],
    avatar_marcus: [240, 240],
    avatar_elena: [240, 240],
  };

  const [w, h] = dimensions[scene];
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  switch (scene) {
    case 'hero_resort_sunset':
      renderHeroSunset(ctx, w, h);
      break;
    case 'room_deluxe':
      renderHotelRoom(ctx, w, h, 'deluxe');
      break;
    case 'room_ocean_suite':
      renderHotelRoom(ctx, w, h, 'ocean_suite');
      break;
    case 'room_pool_villa':
      renderHotelRoom(ctx, w, h, 'pool_villa');
      break;
    case 'room_family_suite':
      renderHotelRoom(ctx, w, h, 'family_suite');
      break;
    case 'room_penthouse':
      renderHotelRoom(ctx, w, h, 'penthouse');
      break;
    case 'room_cliff_bungalow':
      renderHotelRoom(ctx, w, h, 'cliff_bungalow');
      break;
    case 'destination_beach_resort':
      renderDestinationBali(ctx, w, h);
      break;
    case 'exp_spa_wellness':
      renderExperienceCard(ctx, w, h, 'spa');
      break;
    case 'exp_culinary':
      renderExperienceCard(ctx, w, h, 'culinary');
      break;
    case 'exp_adventure':
      renderExperienceCard(ctx, w, h, 'adventure');
      break;
    case 'exp_culture':
      renderExperienceCard(ctx, w, h, 'culture');
      break;
    case 'advantage_sunset_pool':
      renderAdvantageSunsetPool(ctx, w, h);
      break;
    case 'offer_banner_sunset':
      renderOfferBannerSunset(ctx, w, h);
      break;
    case 'avatar_sarah':
      renderAvatar(ctx, w, h, 'sarah');
      break;
    case 'avatar_marcus':
      renderAvatar(ctx, w, h, 'marcus');
      break;
    case 'avatar_elena':
      renderAvatar(ctx, w, h, 'elena');
      break;
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  imageCache[scene] = dataUrl;
  return dataUrl;
}
