// Film başlığından deterministik olarak canlı bir gradyan üretir.
// Poster görseli olmadığı için her filme kendine özgü bir "sahte poster" rengi verir.

const GRADIENTS = [
  "linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)",
  "linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)",
  "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
  "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
  "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)",
  "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
  "linear-gradient(135deg, #833ab4 0%, #fd1d1d 60%, #fcb045 100%)",
  "linear-gradient(135deg, #16222a 0%, #3a6073 100%)",
  "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
  "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
  "linear-gradient(135deg, #41295a 0%, #2f0743 100%)",
];

export function posterGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}
