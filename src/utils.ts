export const randomAvatar = (seed: string) =>
  `https://api.dicebear.com/5.x/identicon/svg?seed=${encodeURIComponent(seed)}`;
